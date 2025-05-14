import React, { useState } from "react";
import { login } from "../../apis/auth";
import LoginForm from "../../components/LoginForm/LoginForm";
import { toastText } from "../../utils/utils";
// import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(data);
      const message = response?.data?.message;
      const { success } = response?.data;
      if (success) {
        toastText(message || "Login successful!", "success");
        // navigate("/dashboard");
      }
    } catch (error: any) {
      toastText(error.response?.data?.error || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default AdminLogin;
