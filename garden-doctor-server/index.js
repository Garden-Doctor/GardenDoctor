import express from "express";
import cors from "cors";
import db from "./models/index.js";
import multer from "multer";
import path from "path";
import * as dotenv from "dotenv";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS 오류 방지
app.use(cors());

// AWS 설정
aws.config.update({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_ACCESSKEY,
  region: process.env.S3_REGION,
});

// AWS S3 인스턴스 생성
const s3 = new aws.S3();

// Multer 설정 for AWS
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read", // 파일 접근 권한 (public-read로 해야 업로드된 파일이 공개)
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// 정적 파일 세팅 (uncomment this if needed)
// app.use("/uploads", express.static(__dirname + "/uploads"));

// Multer 업로드
app.post("/upload", upload.array("files"), (req, res) => {
  console.log("asdsadasd", req.files);
  res.send(req.files);
});

// Router 분리
import sign from "./routes/sign.js";
app.use("/sign", sign);

// 오류 처리
app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
