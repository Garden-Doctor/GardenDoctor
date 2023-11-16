import express from "express";
const router = express.Router();
import { askQuestion } from "../controller/CChat.js";

router.post("/askQuestion", askQuestion);

export default router;
