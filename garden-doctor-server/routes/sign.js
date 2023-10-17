import express from "express";
const router = express.Router();
import {
  getTodo,
  signup,
  login,
  verify,
  patchTodo,
  deleteTodo,
} from "../controller/Csign.js";

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify", verify);

export default router;
