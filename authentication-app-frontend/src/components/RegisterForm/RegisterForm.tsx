import React from "react";
import { Card, Form, Input, Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  title: string;
  isLoader?: boolean;
  roleType: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  title,
  isLoader,
  roleType,
}) => {
  const onFinish = (values: any) => {
    onSubmit(values);
  };
  const switchRoleText =
    roleType === "admin" ? "Register as Customer" : "Register as Admin";
  const switchRoleLink = roleType === "admin" ? "/customer-register" : "/";

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
        title={<Title level={3}>{title}</Title>}
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ textAlign: "left" }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
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
            <Button type="primary" htmlType="submit" block loading={isLoader} style={{ marginTop: 10 }}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Space style={{ marginTop: 14 }} direction="vertical">
          <Text type="secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: 500 }}>
              Login
            </Link>
          </Text>
          <Text type="secondary">
            {switchRoleText}?{" "}
            <Link to={switchRoleLink} style={{ fontWeight: 500 }}>
              Register here
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default RegisterForm;
