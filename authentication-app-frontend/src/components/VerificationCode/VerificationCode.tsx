import { Button, Card, Form, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../apis/auth";
import { toastText } from "../../utils/utils";

const { Title, Text } = Typography;

const VerificationCode = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      navigate("/");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleVerify = async (values: { code: string }) => {
    setLoading(true);
    try {
      const response = await verifyEmail({
        email: email,
        code: values.code,
      });
      toastText(
        response?.data?.message ?? "Verification successful!",
        "success"
      );

      navigate("/login");
      localStorage.removeItem("email");
    } catch (error: any) {
      toastText(error.response?.data?.error || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        title={<Title level={3}>Email Verification</Title>}
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          A verification code was sent to: <strong>{email}</strong>
        </Text>

        <Form
          onFinish={handleVerify}
          layout="vertical"
          style={{ textAlign: "left" }}
        >
          <Form.Item
            name="code"
            label="Verification Code"
            rules={[
              { required: true, message: "Verification code is required" },
              {
                pattern: /^[0-9]{6}$/,
                message: "Code must be a 6-digit number",
              },
            ]}
          >
            <Input placeholder="Enter verification code" maxLength={6} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block style={{ marginTop: 10 }}>
            Verify Code
          </Button>
        </Form>

        <Space style={{ marginTop: 16 }} direction="vertical">
          <Text type="secondary">
            Didn't receive the code? <Link to="/">Go to Register</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default VerificationCode;
