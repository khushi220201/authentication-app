import { postApi } from "../utils/api";

export const registerAdmin = async (data: any) => {
  try {
    const response = await postApi("/register?isAdmin=true", data);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Registration failed");
  }
};

export const registerCustomer = async (data: any) => {
  try {
    const response = await postApi("/register?isAdmin=false", data);
    return response;
  } catch (error: any) {
    console.log('errorsdfs: ', error);
    throw new Error(error?.response?.data?.error || "Registration failed");
  }
};

export const login = async (data: any) => {
  try {
    const response = await postApi("/login", data);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Login failed");
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const response = await postApi("/verify", data);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Verification failed");
  }
};

