import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../apis/auth";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { toastText } from "../../utils/utils";

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const CustomerRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormProps) => {
    setLoading(true);
    try {
      const response = await registerCustomer(data);

      const { success, message: msg } = response?.data;

      if (success) {
        toastText(
          msg ||
            "Customer registered successfully. Please check your email for the verification code.",
          "success"
        );
        localStorage.setItem("email", data.email);

        navigate("/verify-email");
      }
    } catch (error: any) {
      console.log('error: ', error);
      const message =
        error?.message ||
        "Something went wrong. Please try again.";
      toastText(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      title="Customer Registration"
      isLoader={loading}
      roleType="customer"
    />
  );
};

export default CustomerRegister;
