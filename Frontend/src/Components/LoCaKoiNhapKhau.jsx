import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Css/locakoiStyle.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { Title } = Typography;

export default function Locakoinhapkhau() {
  const [suppliers, setSuppliers] = useState([]);
  const [koidata, setKoiData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersResponse, koiResponse] = await Promise.all([
          axios.get("http://localhost:4000/manager/manage-supplier/get-all"),
          axios.get("http://localhost:4000/getAllKoi"),
        ]);
        setSuppliers(suppliersResponse.data.result);
        setKoiData(koiResponse.data.result);
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
            <div className="listPrBlock active">
              {koidata.map((koi) => (
                <div className="wrapWidth" key={koi._id}>
                  <Card
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ marginTop: "0px" }}>
                      <img
                        src={koi.Image}
                        alt={koi.KoiName}
                        className="image"
                        onClick={() =>
                          navigate("/order", {
                            state: { selectedItem: koi },
                          })
                        }
                        style={{ cursor: "pointer" }} // Optional: change cursor to pointer for better UX
                      />
                    </div>

                    <Card.Body>
                      <Card.Title className="namePr">{koi.KoiName}</Card.Title>
                      <Card.Text>
                        <p className="desText">Giới Tính: {koi.Gender}</p>
                        <p className="desText">Kích Thước: {koi.Zize}</p>
                        <p className="desText">Giống: {koi.Breed}</p>
                        <p className="desText">Nguồn Gốc: {koi.Origin}</p>
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
                          Giá {new Intl.NumberFormat("vi-VN").format(koi.Price)}{" "}
                          VND
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="danger"
              className="btnType_1"
              onClick={() => navigate("/koikygui", {})}
            >
              Xem thêm
            </Button>
          </div>
        </Container>
        <Footer />
      </Layout>
    </>
  );
}