import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import { Empty } from "antd"; // Import Empty from Ant Design
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/trackingorderpayStyle.css";
import Footer from "./Footer";
import axiosInstance from "../An/Utils/axiosJS";
import { Spin } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
export default function TrackingOrderPage() {
  const location = useLocation();
  const message = location.state?.message; // Safely access the message

  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [id, setID] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/users/me");
        if (response.data) {
          setUserData(response.data.result);
          setID(response.data.result._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData) return;

      const userId = userData._id; // Assuming userData has _id property

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/users/get-orders/${userId}`);

        console.log("API Response:", response); // Log the entire response

        if (response.status === 200) {
          setOrders(response.data.orderDetails || []);
          console.log(response.data.orderDetails);
        } else {
          console.error(
            "Failed to fetch orders, status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Container>
      <Title
        level={4}
        style={{
          textAlign: "left",
          marginBottom: "55px",
          marginLeft: "15px",
          paddingTop: "36px",
        }}
      >
        Đơn mua hàng thành công
      </Title>
      {/* Conditional rendering for orders */}
      {orders.length === 0 ? (
        <Empty
          description="No data"
          style={{ paddingTop: "100px", marginBottom: "200px" }}
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Chi Tiết</th>
              <th>Ngày Đặt</th>
              <th>Tổng Tiền</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {order.Items.map((item, idx) => (
                      <div key={idx}>
                        {item.KoiInfo.KoiName} - Số lượng: {item.Quantity}
                      </div>
                    ))}
                  </td>
                  <td>{new Date(order.OrderDate).toLocaleString()}</td>
                  <td>{order.TotalPrice.toLocaleString()} ₫</td>
                  <td>
                    {order.Status == 1 ? (
                      <span style={{ color: "red" }}>Chưa Thanh Toán</span>
                    ) : (
                      <span style={{ color: "green" }}>Đã Thanh Toán</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div>
                <h1>No consign items available.</h1>
              </div>
            )}
          </tbody>
        </Table>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
