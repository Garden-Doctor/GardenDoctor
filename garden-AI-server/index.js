import express from "express";
import cors from "cors";
import db from "./models/index.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

dotenv.config();

const app = express();
const PORT = 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

aws.config.update({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_ACCESSKEY,
  region: process.env.S3_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.post("/upload", upload.array("files"), (req, res) => {
  console.log("asdsadasd", req.files[0].location);
  res.send(req.files[0].location);
});

import chat from "./routes/chat.js";
app.use("/chat", chat);

app.use("*", (req, res) => {
  res.status(404).render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
