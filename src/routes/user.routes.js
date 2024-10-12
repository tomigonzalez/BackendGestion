import { Router } from "express";
import {
  userPostLogin,
  userPostRegister,
} from "../controllers/user.controller.js";

const router = Router();
router.post("/register", userPostRegister);
router.post("/login", userPostLogin);

export default router;
