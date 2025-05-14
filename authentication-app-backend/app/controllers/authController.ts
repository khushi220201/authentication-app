import { Request, Response } from "express";
import { loginUser, register, verifyCode } from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.isAdmin === "true";
    const role = isAdmin ? "ADMIN" : "CUSTOMER";

    const user = await register(req.body, role);
    const roleLabel = isAdmin ? "Admin" : "Customer";

    res.status(201).json({
      success: true,
      message: `${roleLabel} registered successfully. Please check your email for the verification code.`
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await verifyCode(email, code);
    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
