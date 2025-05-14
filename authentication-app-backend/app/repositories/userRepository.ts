import { Role } from "@prisma/client";
import { prisma } from "../client/prisma";
import { RegisterUser } from "../interfaces/authInterface";

export const createUser = async (data: RegisterUser, role: Role) => {
  return await prisma.user.create({
    data: {
      ...data,
      role,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const verifyUser = async (email: string, code: string) => {
  return await prisma.user.updateMany({
    where: { email, verificationCode: code },
    data: { isVerified: true, verificationCode: null },
  });
};
