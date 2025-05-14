import { body } from "express-validator";

export const registerValidationRules = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
    .withMessage("Password must include uppercase, lowercase, and a number"),
];

export const loginValidationRules = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export const verifyCodeValidationRule = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("code").trim().notEmpty().withMessage("Verification code is required"),
];
