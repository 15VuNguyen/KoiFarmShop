import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import {
  Button,
  Typography,
  Spin,
  Alert,
  Layout,
  Divider,
  Row,
  Col,
  Tooltip,
  message,
  Modal,
} from "antd";
import { HomeOutlined, CopyOutlined } from "@ant-design/icons";
import axiosInstance from "../An/Utils/axiosJS";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

export default function DonKyGui() {
  const [consignList, setConsignList] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsignList = async () => {
      try {
        const response = await axiosInstance.get("/users/tat-ca-don-ki-gui");

        if (response.data.result && response.data.result.data) {
          setConsignList(response.data.result.data);
        } else {
          console.error("No data found in result.");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching consign list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsignList();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("users/me");
      if (response.data) {
        setUserData(response.data.result);
        console.log("Fetched user data:", response.data.result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleOk = () => {
    // Thực hiện hành động xóa
    navigate(`/xoa`, {
      state: { consign },
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    message.success("ID đã được sao chép!");
  };

  if (loading)
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      />
    );
  if (error) return <Alert message="Error" description={error} type="error" />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout style={{ backgroundColor: "whitesmoke" }}>
        <Container style={{ paddingTop: "50px", paddingBottom: "10px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <Title
                level={4}
                style={{
                  textAlign: "left",
                  marginBottom: "5px",
                  marginLeft: "15px",
                  marginTop: "20px",
                }}
              >
                Danh Sách Ký Gửi Của Khách Hàng
              </Title>
            </Col>
          </Row>
          <Divider style={{ margin: "20px 0" }} />
          <Row gutter={16}>
            {consignList.length > 0 ? (
              consignList.map((item) => {
                const { consign, koi } = item;
                return (
                  <Col
                    span={24}
                    key={consign._id}
                    style={{ marginBottom: "20px" }}
                  >
                    <div
                      style={{
                        padding: "20px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Text strong style={{ fontSize: "17px" }}>
                        {koi?.KoiName}
                      </Text>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginTop: "20px" }}>
                          <Text>Age: {koi?.Age ?? "N/A"} years</Text>
                          <div style={{ marginBottom: "8px" }}></div>
                          <Text>Price: {koi?.Price ?? "N/A"}</Text>
                        </div>
                        <div style={{ marginLeft: "300px", marginTop: "22px" }}>
                          <Text>
                            Trình trạng:{" "}
                            {(() => {
                              const statusText = [
                                "Yêu cầu ký gửi",
                                "Đang kiểm tra Koi",
                                "Đang thương thảo hợp đồng",
                                "Đang tìm người mua",
                                "Đã bán",
                              ][consign.State - 1];

                              let color;
                              if (
                                consign.State === 1 ||
                                consign.State === 2 ||
                                consign.State === 3
                              ) {
                                color = "blue";
                              } else if (consign.State === 4) {
                                color = "";
                              } else if (consign.State === 5) {
                                color = "green";
                              }

                              return (
                                <Text style={{ color }}>{statusText}</Text>
                              );
                            })()}
                          </Text>

                          <div style={{ marginTop: "10px" }}>
                            <Text strong style={{ color: "red" }}>
                              Ngày giao hàng:{" "}
                              {consign.ShippedDate
                                ? new Date(
                                    consign.ShippedDate
                                  ).toLocaleDateString()
                                : "Không yêu cầu"}
                            </Text>
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="Đây là ID cho đơn hàng của bạn, xin không cung cấp cho người khác.">
                            <Text
                              strong
                              style={{
                                display: "inline-block",
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Đơn gửi: {consign._id}{" "}
                              <span style={{ color: "#999" }}>?</span>
                            </Text>
                          </Tooltip>
                          <Button
                            type="link"
                            onClick={() => handleCopy(consign._id)}
                            style={{ color: "grey" }}
                          >
                            <CopyOutlined />
                          </Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Text style={{ marginLeft: "10px" }}>
                            TotalPrice:{" "}
                            {consign.TotalPrice || "Chờ bên shop định giá"}
                          </Text>
                          <Button
                            type="primary"
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              navigate(`/`);
                            }}
                          >
                            Chat ngay
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            type="default"
                            onClick={() => {
                              navigate(`/chitiet`, {
                                state: { consign },
                              });
                            }}
                          >
                            Chi tiết
                          </Button>
                          <Button
                            style={{ marginLeft: "10px", color: "red" }}
                            type="danger" // This should apply the red color
                            onClick={showModal}
                          >
                            Xóa đơn ký gửi
                          </Button>
                          <Modal
                            title="Xác nhận xóa"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>
                              Bạn có chắc chắn muốn xóa đơn ký gửi này không?
                            </p>
                          </Modal>
                          {consign.Status === -1 && (
                            <div>
                              <h3>Đơn ký gửi nãy đã hủy</h3>
                            </div>
                          )}
                        </div>
                      </div>

                      <Divider style={{ margin: "20px 0" }} />
                      <Text strong style={{ fontSize: "17px" }}>
                        Thông tin người dùng
                      </Text>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginTop: "20px" }}>
                          <Text>Name: {userData?.name ?? "N/A"}</Text>
                          <div style={{ marginBottom: "8px" }}></div>
                          <Text>Email: {userData?.email ?? "N/A"}</Text>
                        </div>
                        <div style={{ marginLeft: "220px", marginTop: "22px" }}>
                          <Text>
                            Phone Number: {userData?.phone_number ?? "N/A"}
                          </Text>
                          <div style={{ marginTop: "10px" }}>
                            <Text>Address: {userData?.address ?? "N/A"}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col span={24}>
                <Text>No consign items available.</Text>
              </Col>
            )}
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
