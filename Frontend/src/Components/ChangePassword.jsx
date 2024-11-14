import { Card, Layout, Row, Col, Input, Form, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import axiosInstance from "../An/Utils/axiosJS";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ChangePassword() {
  const [form] = Form.useForm(); // Tạo form instance
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const handleChangePassword = async (values) => {
    try {
      const { old_password, password, confirm_password } = values;

      // Ensure new password and confirm password match
      if (password !== confirm_password) {
        toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
      }

      const dataToSend = {
        old_password,
        password,
        confirm_password,
      };

      const response = await axiosInstance.put(
        "/users/change-password",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check for success response
      if (response.data && response.data.success) {
        toast.success(response.data.message);
        form.resetFields(); // Reset fields after successful update
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      // Handle the error response
      if (error.response) {
        console.error("Error updating password:", error.response.data);
        toast.success(error.response.data.message || "Cập nhật thất bại.");
      } else {
        console.error("Error updating password:", error.message);
        alert("Cập nhật thất bại.");
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("users/me");
        if (response.data) {
          setUserData(response.data.result);
          console.log(userData);
        } else {
          console.error("Dữ liệu không hợp lệ:", response.data);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  const verifyAccount = async () => {
    try {
      const response = await axiosInstance.post("/users/resend-verify-email", {
        email: form.getFieldValue("email"), // Assuming email is a field in the form
      });

      if (response.status !== 200) {
        throw new Error("Account verification failed");
      }

      return response.data;
    } catch (error) {
      console.error("Verification Failed:", error);
      throw error;
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate fields
      if (userData.verify === 0) {
        toast.error(
          "Vui lòng xác thực tài khoản trước khi thay đổi mật khẩu,Chúng tôi đã gửi mã xác nhận qua email của bạn"
        );
        await verifyAccount(); // Verify account
      } else if (userData.verify === 1) {
        await handleChangePassword(values); // Call the handler with validated values
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <>
      {/* Navbar Component */}
      <Layout>
        <div style={{ backgroundColor: "smokegrey" }}>
          <Row>
            <Col>
              <Content>
                <Card
                  title="Thay đổi mật khẩu"
                  bordered={false}
                  style={{ width: 800 }}
                >
                  <Form
                    form={form} // Pass form instance
                    id="change-password-form"
                    onFinish={onSubmit} // Use onSubmit function
                  >
                    <div>
                      <label
                        htmlFor="old_password"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Mật khẩu cũ của bạn
                      </label>{" "}
                      <Form.Item
                        name="old_password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your old password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Mật khẩu mới của bạn
                      </label>{" "}
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm_password"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Xác nhận mạt khẩu mới của bạn
                      </label>{" "}
                      <Form.Item
                        name="confirm_password"
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your new password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </div>
                    <Form.Item style={{ textAlign: "center" }}>
                      <Button type="primary" htmlType="submit">
                        Thay đổi mật khẩu
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Content>
            </Col>
          </Row>
        </div>
        {/* Footer Component */}
      </Layout>
    </>
  );
}
