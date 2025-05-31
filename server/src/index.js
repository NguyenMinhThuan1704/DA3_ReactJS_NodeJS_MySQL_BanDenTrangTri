require("dotenv").config();
const express = require("express");
const multer = require("multer");
const getColors = require("get-image-colors");
const { OpenAI } = require("openai");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { connect } = require("./config/connection");
const PayOS = require("@payos/node");
const namer = require("color-namer");
const db = require("./models");
const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_SECRET_ID,
  process.env.PAYOS_SECRET_KEY
);

const PORT = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pay.payos.vn"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/payment-link", async (req, res) => {
  try {
    const order = {
      amount: 10000,
      description: "Thanh toán VIP",
      orderCode: 1111111111,
      returnUrl: `${YOUR_DOMAIN}`,
      cancelUrl: `${YOUR_DOMAIN}/cancel`,
    };

    const paymentLink = await payos.createPaymentLink(order);

    // Sử dụng req.user.user_id thay vì req.user.id
    // await db.Payment.create({
    //   user_id: req.user.user_id,
    //   amount: order.amount,
    //   status: "success",
    //   order_code: 1111111111,
    // });

    res.json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error("Error creating payment link:", error);
    res.status(500).json({ message: "Error creating payment link" });
  }
});

app.post("/receive-hook", async (req, res) => {
  try {
    console.log("vao roi");

    console.log("Webhook received:", req.body);
    const { orderCode } = req.body.data;
    console.log("Order code:", orderCode);

    if (!orderCode)
      return res.status(400).json({ message: "Order code is missing" });

    const payment = await db.Payment.findOne({
      where: { order_code: orderCode },
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await payment.update({ status: "success" });
    const user = await db.User.findOne({ where: { user_id: payment.user_id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ is_vip: 1 });
    return res.status(200).json({ message: "User upgraded to VIP" });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/api/images/analyze", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Chưa có file upload" });
    }

    const features = await Promise.all(
      files.map(async (file) => {
        const colors = await getColors(file.buffer, file.mimetype);
        const paletteColors = colors.slice(0, 10).map((c) => c.rgb());

        const rawColorNames = paletteColors.map((rgb) => {
          const hex =
            "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
          const name =
            namer(hex).html[0]?.name ||
            namer(hex).pantone[0]?.name ||
            namer(hex).ntc[0]?.name;
          return name ? name.toLowerCase() : hex;
        });
        const dominantColors = [...new Set(rawColorNames)].slice(0, 5);

        let parsed = { style: null, roomType: null, sizeCategory: null };
        let aiError = null;

        try {
          const base64Image = file.buffer.toString("base64");
          const mimeType = file.mimetype;

          const aiResp = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: 'Phân loại phong cách (Modern/Scandinavian/Industrial/…), loại phòng (living room/bedroom/…), ước tính kích thước (small/medium/large). Chỉ trả về đúng JSON, không giải thích, không thêm ``` hoặc bất cứ ký tự nào khác ngoài JSON: { "style": "...", "roomType": "...", "sizeCategory": "..." }.',
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:${mimeType};base64,${base64Image}`,
                    },
                  },
                ],
              },
            ],
          });

          let aiText = aiResp.choices?.[0]?.message?.content?.trim() || "";

          if (aiText.startsWith("```")) {
            aiText = aiText.replace(/```json|```/g, "").trim();
          }

          try {
            parsed = JSON.parse(aiText);
          } catch {
            const jsonMatch = aiText.match(/{[\s\S]*}/);
            if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
            else
              throw new Error("Không tìm thấy JSON hợp lệ trong phản hồi AI!");
          }
        } catch (err) {
          console.error("OpenAI Vision error:", err);
          if (err.code === "insufficient_quota" || err.status === 429) {
            aiError = "QuotaExceeded";
          } else {
            aiError = "VisionError";
          }
        }

        let matchedProducts = [];
        if (
          !aiError &&
          parsed.style &&
          parsed.roomType &&
          parsed.sizeCategory
        ) {
          let sql = `SELECT * FROM chitietsanphams WHERE Style = ? AND RoomType = ? AND SizeCategory = ?`;
          const params = [parsed.style, parsed.roomType, parsed.sizeCategory];
          if (dominantColors && dominantColors.length) {
            sql +=
              " AND (" +
              dominantColors.map(() => "DominantColors LIKE ?").join(" OR ") +
              ")";
            dominantColors.forEach((color) => params.push(`%${color}%`));
          }
          try {
            const rows = await db.sequelize.query(sql, {
              replacements: params,
              type: db.sequelize.QueryTypes.SELECT,
            });
            matchedProducts = rows;
          } catch (e) {
            console.error("Lỗi truy vấn sản phẩm gợi ý:", e);
          }
        }

        let fullProductInfos = [];
        if (matchedProducts && matchedProducts.length > 0) {
          const productIds = matchedProducts.map((mp) => mp.MaSanPham);
          try {
            const products = await db.sequelize.query(
              `SELECT * FROM sanphams WHERE id IN (${productIds
                .map(() => "?")
                .join(",")})`,
              {
                replacements: productIds,
                type: db.sequelize.QueryTypes.SELECT,
              }
            );
            fullProductInfos = products;
          } catch (e) {
            console.error("Lỗi lấy thông tin chi tiết sản phẩm:", e);
          }

          matchedProducts = matchedProducts.map((mp) => ({
            ...mp,
            productInfo:
              fullProductInfos.find((p) => p.id === mp.MaSanPham) || null,
          }));
        }

        return { ...parsed, dominantColors, aiError, matchedProducts };
      })
    );

    return res.json({ features });
  } catch (err) {
    console.error("Internal server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

routes(app);
connect();

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
