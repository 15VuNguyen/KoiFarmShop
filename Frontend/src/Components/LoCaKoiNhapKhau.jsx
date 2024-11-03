import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import Layout from "antd/es/layout/layout";
import Navbar from "../components/Navbar/Navbar.jsx";
import CustomFooter from "./Footer.jsx";
import "./Css/locakoiStyle.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../An/Utils/axiosJS.js";
import CustomerChatButton from "./Chat/CustomerChat.jsx";
import Footer from "./Footer.jsx";

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
            acc[group.groupId] = group.result;
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
      <Layout>
        <Navbar />
        <Container>
          <div style={{ paddingTop: "100px" }}>
            <h2>Lô Cá Koi Nhập Khẩu</h2>
            <div style={{ textAlign: "center" }}>
              <Button variant="danger">
                Lô Cá Nhập Khẩu Cuối Năm Vip 2024
              </Button>
            </div>

            {Object.entries(koiData).map(([groupId, kois]) => (
              <div key={groupId} className="listPrBlock active">
                {kois.map((koi) => (
                  <div className="wrapWidth" key={koi._id}>
                    <Card style={{ width: "100%", marginBottom: "20px" }}>
                      <div style={{ marginTop: "0px" }}>
                        <img
                          src={koi.Image}
                          alt={koi.KoiName || "Koi"} // xử lý trường hợp KoiName rỗng
                          className="image"
                          onClick={() =>
                            navigate("/order", { state: { selectedItem: koi } })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="namePr">
                          {koi.KoiName || "Koi không tên"}
                        </Card.Title>
                        <Card.Text>
                          <p className="desText">
                            Giới Tính: {koi.Gender || "Không xác định"}
                          </p>
                          <p className="desText">
                            Kích Thước: {koi.Size || "Không xác định"} cm
                          </p>
                          <p className="desText">
                            Giống: {koi.Breed || "Không xác định"}
                          </p>
                          <p className="desText">
                            Nguồn Gốc: {koi.Origin || "Không xác định"}
                          </p>
                        </Card.Text>
                        <div style={{ textAlign: "center" }}>
                          <Button
                            variant="danger"
                            className="btnType_1"
                            onClick={() =>
                              navigate("/order", {
                                state: { selectedItem: koi },
                              })
                            }
                          >
                            Giá{" "}
                            {new Intl.NumberFormat("vi-VN").format(koi.Price)}{" "}
                            VND
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                <hr />
              </div>
            ))}

            <div style={{ textAlign: "center", paddingTop: "100px" }}>
              <Button
                variant="danger"
                className="btnType_1"
                onClick={() => navigate("/koidangban")}
                style={{ marginBottom: "100px" }}
              >
                Xem thêm
              </Button>
            </div>
          </div>
        </Container>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
