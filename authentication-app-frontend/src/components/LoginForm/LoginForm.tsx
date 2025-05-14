import { Button, Card, Form, Input, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  // useEffect(() => {
  //   localStorage.removeItem("email");
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title={<Title level={3}>Login</Title>}
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Form
          layout="vertical"
          onFinish={onSubmit}
          style={{ textAlign: "left" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message:
                  "Password must be at least 6 characters long and include uppercase, lowercase, and a number",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ marginTop: 10 }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: 14 }}
          align="center"
        >
          <Text type="secondary">
            Don't have an admin account?{" "}
            <Link to="/" style={{ fontWeight: 500 }}>
              Register as Admin
            </Link>
          </Text>
          <Text type="secondary">
            Don't have a customer account?{" "}
            <Link to="/customer-register" style={{ fontWeight: 500 }}>
              Register as Customer
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default LoginForm;
