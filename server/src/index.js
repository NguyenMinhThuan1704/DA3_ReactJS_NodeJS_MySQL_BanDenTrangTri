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
const hoadonbanService = require("./services/hoadonbanService");
const chitiethoadonbanService = require("./services/chitiethoadonbanService");
const cartService = require("./services/cartService");
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
    const randomOrderCode = Math.floor(1000000000 + Math.random() * 9000000000);
    const { MaKH, TenKH, SoDienThoai, DiaChi, Email, TongGia, cartList } =
      req.body;

    const createdOrder = await hoadonbanService.create({
      MaKH: MaKH,
      TenKH: TenKH,
      SoDienThoai: SoDienThoai,
      DiaChi: DiaChi,
      Email: Email,
      TrangThaiDuyet: false,
      Shipped: false,
      TongGia: TongGia,
      TrangThai: "Chưa duyệt",
      HinhThucThanhToan: "QR/Online",
      TrangThaiThanhToan: false,
      order_code: randomOrderCode,
    });

    const maHoaDonBan = createdOrder.data.dataValues.id;

    cartList.forEach(async (item) => {
      const chiTietHoaDonData = {
        MaHoaDonBan: maHoaDonBan,
        MaSanPham: item.MaSanPham,
        SoLuongCTHDB: item.SoLuong,
        GiaCTHDB: item.Gia,
        TongGia: item.Gia * item.SoLuong,
      };
      await chitiethoadonbanService.create(chiTietHoaDonData);
    });

    const order = {
      amount: 10000,
      description: "Thanh toán đơn hàng",
      orderCode: randomOrderCode,
      returnUrl: `${YOUR_DOMAIN}`,
      cancelUrl: `${YOUR_DOMAIN}/user/giohang`,
    };

    const paymentLink = await payos.createPaymentLink(order);

    res.json({
      checkoutUrl: paymentLink.checkoutUrl,
      order_code: randomOrderCode,
      maHoaDonBan: maHoaDonBan,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment link" });
  }
});

// app.post("/cancel-payment-link", async (req, res) => {
//   const { order_code } = req.body;
//   console.log(order_code);
//   try {
//     const hoadonban = await hoadonbanService.find({
//       where: {
//         order_code: order_code,
//       },
//     });
//     console.log(hoadonban);

//     if (!hoadonban) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     const maHoaDonBan = hoadonban.id;

//     await chitiethoadonbanService.destroy({
//       where: {
//         MaHoaDonBan: maHoaDonBan,
//       },
//     });
//     await hoadonbanService.delete({
//       where: {
//         id: maHoaDonBan,
//       },
//     });

//     res.json({ message: "Order cancelled and deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error cancelling order" });
//   }
// });

app.get("/receive-hook", (req, res) => {
  console.log("GET /receive-hook – PayOS đang verify URL");
  return res.sendStatus(200);
});

app.post("/receive-hook", async (req, res) => {
  try {
    if (!req.body.data || !req.body.data.orderCode) {
      return res.sendStatus(200);
    }
    const { orderCode, desc, transactionDateTime } = req.body.data;

    if (desc === "PAID" || desc === "SUCCEEDED" || desc === "success") {
      const hoaDon = await hoadonbanService.find({
        where: {
          order_code: orderCode,
        },
      });

      if (!hoaDon) {
        return res.sendStatus(200);
      }

      await hoadonbanService.update({
        data: {
          TrangThaiThanhToan: true,
          ThoiGianThanhToan: transactionDateTime,
        },
        where: {
          id: hoaDon.data[0].id,
        },
      });

      await cartService.delete({
        where: {
          MaTaiKhoan: hoaDon.data[0].MaKH,
        },
      });

      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(200);
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
