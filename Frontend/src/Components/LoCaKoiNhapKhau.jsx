import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../An/Utils/axiosJS.js";
import CustomerChatButton from "./Chat/CustomerChat.jsx";
import Footer from "./Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import "./Css/locakoiStyle.css";
import Text from "antd/lib/typography/Text";
// Card layout đẹp mắt với grid
export default function Locakoinhapkhau() {
  const [koiData, setKoiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/get-kois-groupKoiID");

        if (response.status === 200) {
          const groupedData = response.data.reduce((acc, group) => {
            const firstKoi = group.result[0];
            const koiCount = group.result.filter(
              (koi) => koi.Status === 1
            ).length;
            acc[group.groupId] = {
              firstKoi,
              koiCount,
            };
            return acc;
          }, {});
          setKoiData(groupedData);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "100px 20px",
          background: "#f4f4f4",
          textAlign: "center",
        }}
      >
        <h2>Lô Cá Koi Nhập Khẩu</h2>
        <Button
          type="primary"
          danger
          size="large"
          style={{ marginBottom: "50px" }}
        >
          Lô Cá Nhập Khẩu Cuối Năm Vip 2024
        </Button>

        {/* Hiển thị các koi theo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            justifyItems: "center",
            padding: "0 20px",
          }}
        >
          {Object.entries(koiData).map(([groupId, { firstKoi, koiCount }]) => (
            <Card
              key={groupId}
              hoverable
              cover={
                <img
                  alt={firstKoi.KoiName || "Koi"}
                  src={firstKoi.Image}
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                />
              }
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease",
              }}
              onClick={() =>
                navigate("/order", { state: { selectedItem: firstKoi } })
              }
            >
              <Card.Meta
                description={
                  <div style={{ textAlign: "left" }}>
                    <h5 style={{ color: "red" }}>
                      {firstKoi.KoiName || "Koi không tên"}
                    </h5>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Kích thươc
                      </span>{" "}
                      {firstKoi.Size || "Không xác định"} cm
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Giống:
                      </span>{" "}
                      {firstKoi.Breed || "Không xác định"}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Nguồn gốc
                      </span>{" "}
                      {firstKoi.Origin || "Không xác định"}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Số lượng
                      </span>{" "}
                      {koiCount} con
                    </p>
                  </div>
                }
              />
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Button
                  type="primary"
                  danger
                  size="large"
                  style={{ width: "100%" }}
                  onClick={() =>
                    navigate("/order", { state: { selectedItem: firstKoi } })
                  }
                >
                  Giá {new Intl.NumberFormat("vi-VN").format(firstKoi.Price)}{" "}
                  VND
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {Object.keys(koiData).length <= 0 && (
            <div>
              {" "}
              <h2 style={{ color: "red" }}>Hết hàng</h2>
            </div>
          )}
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => navigate("/koidangban")}
          >
            Xem thêm
          </Button>
        </div>
      </div>

      <CustomerChatButton />
      <Footer />
    </>
  );
}
