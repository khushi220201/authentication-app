import { body } from "express-validator";

export const registerValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
    .withMessage("Password must include uppercase, lowercase, and a number"),
];

export const loginValidationRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const verifyCodeValidationRule = [
  body("email").isEmail(),
  body("code").notEmpty().withMessage("Verification code is required"),
];