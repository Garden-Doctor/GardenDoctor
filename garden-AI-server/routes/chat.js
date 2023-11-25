import express from "express";
const router = express.Router();
import { askQuestion, loadPrevChats } from "../controller/CChat.js";

router.post("/askQuestion", askQuestion);
router.post("/loadPrevChats", loadPrevChats);

export default router;
