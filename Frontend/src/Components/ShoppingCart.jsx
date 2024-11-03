import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import TableCart from "./TableCartForShoppingCart";
import { useEffect } from "react";
import axiosInstance from "../An/Utils/axiosJS";

import { Container } from "react-bootstrap";
export default function ShoppingCart() {
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/formfillinformation");
  };

  useEffect(() => {
    const clearData = async () => {
      try {
        console.log("hello");
        await axiosInstance.post(
          "/clear-coookies",
          { Credential: true },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    clearData();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Container
        style={{ flex: "1", paddingTop: "130px", textAlign: "center" }}
      >
        <h4 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Giỏ hàng của bạn
        </h4>
        <TableCart />
      </Container>
      <Footer />
    </div>
  );
}
