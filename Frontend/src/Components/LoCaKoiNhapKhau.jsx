import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../An/Utils/axiosJS.js";
import CustomerChatButton from "./Chat/CustomerChat.jsx";
import Footer from "./Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import "./Css/locakoiStyle.css";

// Card layout đẹp mắt với grid
export default function Locakoinhapkhau() {
  const [koiData, setKoiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:4000/get-kois-groupKoiID"
        );

        if (response.status === 200) {
          const groupedData = response.data.reduce((acc, group) => {
            const firstKoi = group.result[0];
            const koiCount = group.result.length;

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
          padding: "50px 20px",
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
                <img alt={firstKoi.KoiName || "Koi"} src={firstKoi.Image} />
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
                title={firstKoi.KoiName || "Koi không tên"}
                description={
                  <div>
                    <p>Giới Tính: {firstKoi.Gender || "Không xác định"}</p>
                    <p>Kích Thước: {firstKoi.Size || "Không xác định"} cm</p>
                    <p>Giống: {firstKoi.Breed || "Không xác định"}</p>
                    <p>Nguồn Gốc: {firstKoi.Origin || "Không xác định"}</p>
                    <p>Số Lượng Koi: {koiCount} con</p>
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
