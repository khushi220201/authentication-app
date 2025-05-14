import { Role } from "@prisma/client";
import { emailHelper } from "../helpers/emailHelper";
import { getVerificationCodeEmailTemplate } from "../helpers/getVerificationCodeEmailHelper";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { LoginUser, RegisterUser } from "../interfaces/authInterface";
import {
  createUser,
  findUserByEmail,
  verifyUser,
} from "../repositories/userRepository";
import { generateVerificationCode } from "../utils/generateVerificationCode";

export const register = async (userData: RegisterUser, role: Role) => {
  const existing = await findUserByEmail(userData.email);
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(userData.password);
  const code = generateVerificationCode();

  const data = {
    ...userData,
    password: hashedPassword,
    verificationCode: code,
  };
  const user = await createUser(data, role);

  const fullName =
    user?.firstName || user?.lastName
      ? user?.firstName + " " + user?.lastName
      : "User";

  const emailContent = getVerificationCodeEmailTemplate(
    user.email,
    fullName,
    code
  );

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: user.email,
    subject: "Your verification code",
    html: emailContent,
  };

  emailHelper.sendEmailAsync(mailOptions);
  return user;
};

export const loginUser = async (data: LoginUser) => {
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (user.role !== Role.ADMIN) {
    throw new Error("You are not allowed to login to this portal");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email before login");
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password as string
  );
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const verifyCode = async (email: string, code: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }
  const result = await verifyUser(email, code);
  if (result.count === 0) throw new Error("Invalid verification code");
};
