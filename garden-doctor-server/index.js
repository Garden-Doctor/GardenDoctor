const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const PORT = 8000;
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const aws = require("aws-sdk"); //aws 설정을 위한 모듈
const multerS3 = require("multer-s3"); //aws s3에 업로드하기 위한 multer설정
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS오류방지
app.use(cors());

//aws설정
aws.config.update({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_ACCESSKEY,
  region: process.env.S3_REGION,
});
//aws s3 인스턴스 생성
const s3 = new aws.S3();

// multer설정(다중 파일 업로드) - aws
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read", //파일접근권한 (public-read로 해야 업로드된 파일이 공개)
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

//정적파일세팅
// app.use("/uploads", express.static(__dirname + "/uploads"));

//multer업로드
app.post("/upload", upload.array("files"), (req, res) => {
  console.log("asdsadasd", req.files[0].location);
  const fileLocations = req.files.map((file) => file.location);
  console.log("Uploaded file locations:", fileLocations);
  // res.send(req.files[0].location);
  res.send(fileLocations);
});

// Multer 설정 - AWS S3 (단일 파일 업로드)
const uploadSingle = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// Multer 업로드 (단일 파일 업로드)
app.post("/upload/single", uploadSingle.single("file"), (req, res) => {
  console.log("upload single location", req.file.location);
  const fileLocation = req.file.location;
  console.log("Uploaded file location:", fileLocation);
  res.send(fileLocation);
});

//router 분리
const sign = require("./routes/sign.js");
app.use("/sign", sign);

const board = require("./routes/board.js");
app.use("/board", board);

const plantsolution = require("./routes/plantsolution.js");
app.use("/dignosisResult", plantsolution);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
