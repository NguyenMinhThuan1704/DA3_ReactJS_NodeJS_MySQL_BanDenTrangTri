require("dotenv").config();
const express = require("express");
const multer = require("multer");
const getColors = require("get-image-colors");
const { OpenAI } = require("openai");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { connect } = require("./config/connection");

const PORT = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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
        const paletteColors = colors.slice(0, 5).map((c) => c.rgb());
        const dominantColors = paletteColors.map(
          (rgb) => `rgb(${rgb.join(",")})`
        );

        let parsed = { style: null, roomType: null, sizeCategory: null };
        let aiError = null;

        try {
          const aiResp = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            modalities: ["text", "image"],
            image: file.buffer,
            messages: [
              {
                role: "user",
                content:
                  'Phân loại phong cách (Modern/Scandinavian/Industrial/…), loại phòng (living room/bedroom/…), ước tính kích thước (small/medium/large). Trả về JSON: { "style": "...", "roomType": "...", "sizeCategory": "..." }.',
              },
            ],
          });
          console.log(choices);

          parsed = JSON.parse(aiResp.choices[0].message.content);
        } catch (err) {
          console.error("OpenAI Vision error:", err);
          if (err.code === "insufficient_quota" || err.status === 429) {
            aiError = "QuotaExceeded";
          } else {
            aiError = "VisionError";
          }
        }

        if (aiError === "QuotaExceeded") {
          try {
            const prompt = `Palette màu chính: ${dominantColors.join(
              ", "
            )}. Từ các màu này, hãy phân loại phong cách nội thất (Modern/Scandinavian/Industrial…), loại phòng (living room/bedroom/kitchen…), và ước tính kích thước (small/medium/large). Trả về JSON: { "style": "...", "roomType": "...", "sizeCategory": "..." }.`;
            const fbResp = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
            });
            parsed = JSON.parse(fbResp.choices[0].message.content);
            aiError = null;
          } catch (err2) {
            console.error("Fallback GPT-3.5 error:", err2);
            aiError = "APIError";
          }
        }

        if (aiError) {
          const avgBrightness =
            paletteColors.reduce(
              (sum, rgb) => sum + (rgb[0] + rgb[1] + rgb[2]) / 3,
              0
            ) / paletteColors.length;
          parsed.style = avgBrightness > 127 ? "Modern" : "Industrial";
          parsed.roomType = "living room";
          parsed.sizeCategory = "medium";
          aiError = "RuleBased";
        }

        return { ...parsed, dominantColors, aiError };
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
