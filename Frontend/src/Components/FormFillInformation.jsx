import { useEffect, useState } from "react";
import { Form, Button, Input, Spin, message } from "antd";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";
import axios from "axios";
import axiosInstance from "../An/Utils/axiosJS";
import TableCart from "./TableCartForShoppingCart";
import { Spinner, Container } from "react-bootstrap";
import TableCartForm from "./TableCartForm";
export default function FormFillInformation() {
  const orderDetail = useOrder(); // Đảm bảo rằng hàm này trả về giá trị hợp lệ

  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (values) => {
    const dataToSend = {
      ...values,
    };

    console.log(dataToSend); // Kiểm tra dữ liệu

    try {
      const response = await axiosInstance.post(`order/create/`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        message.success(response.data.message);
        alert("Đặt hàng thành công!");
        navigate("/paymentmethod");
      } else {
        message.error(`Có lỗi xảy ra: ${response.data.message}`);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi thông tin.");
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/me");
      if (response.data) {
        setUserData(response.data.result);
      } else {
        console.error("Dữ liệu không hợp lệ:", response.data);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div style={{ display: "flex", padding: "50px", paddingTop: "100px" }}>
          <Container>
            <div style={{ flex: 1, padding: "20px" }}>
              <h4 style={{ textAlign: "center" }}>Đơn hàng của bạn</h4>
              <TableCartForm />
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
              <h4 style={{ textAlign: "center" }}>
                Form điền thông tin người dùng
              </h4>
              {loading ? (
                <Spin size="large" />
              ) : (
                <Form
                  style={{ maxWidth: 600, margin: "auto" }}
                  onFinish={handleSubmit} // Thay đổi ở đây
                  initialValues={{
                    email: userData?.email || "",
                    name: userData?.name || "",
                    address: userData?.address || "",
                    phone_number: userData?.phone_number || "",
                    ShipAddress: userData?.address || "",
                  }}
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Vui lòng nhập email hợp lệ.",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên." },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ." },
                    ]}
                  >
                    <Input placeholder="Nhập địa chỉ" />
                  </Form.Item>

                  <Form.Item
                    name="phone_number"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại.",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>

                  <Form.Item
                    name="ShipAddress"
                    label="Địa chỉ giao hàng"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ giao hàng.",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập địa chỉ giao hàng" />
                  </Form.Item>

                  <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
}
