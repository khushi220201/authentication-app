import { Router } from "express";
import {
  loginAdmin,
  registerUser,
  verifyEmailCode,
} from "../controllers/authController";
import {
  loginValidationRules,
  registerValidationRules,
  verifyCodeValidationRule,
} from "../helpers/validators";

const router = Router();

router.post(
  "/register",
  registerValidationRules,
  registerUser
);

router.post("/verify", verifyCodeValidationRule, verifyEmailCode);

router.post("/login", loginValidationRules, loginAdmin);

export default router;
