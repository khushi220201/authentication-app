import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../apis/auth";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { toastText } from "../../utils/utils";

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AdminRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormProps) => {
    setLoading(true);
    try {
      const response = await registerAdmin(data);

      const { success, message } = response?.data;

      if (success) {
        toastText(
          message ||
            "Admin registered successfully. Please check your email for the verification code.",
          "success"
        );
        localStorage.setItem("email", data.email);
        navigate("/verify-email");
      }
    } catch (error: any) {
      console.log("error: ", error);
      const message =
        error.message || "Something went wrong. Please try again.";
      toastText(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      title="Admin Registration"
      isLoader={loading}
      roleType="admin"
    />
  );
};

export default AdminRegister;
