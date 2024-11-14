import React from "react";
import Layout from "antd/es/layout/layout";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
const { Title, Text, Paragraph } = Typography;
import { Typography } from "antd";
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    margin: 0,
    padding: "20px",
  },
  container: {
    maxWidth: "800px",
    margin: "auto",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  title: {
    color: "red",
    borderBottom: "2px solid red",
    paddingBottom: "10px",
  },
  paragraph: {
    lineHeight: 1.6,
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold",
  },
  ul: {
    margin: "10px 0",
    paddingLeft: "20px",
  },
  li: {
    margin: "5px 0",
  },
};
export default function ChinhSach() {
  return (
    <div>
      <Navbar />
      <Container>
        <div style={{ paddingTop: "100px" }}>
          <div>
            <div style={{ textAlign: "center", color: "red" }}>
              <h1>Chính sách mua hàng</h1>
            </div>
            <div style={{ paddingTop: " 50px" }}>
              <div>
                <div>
                  <h2 style={styles.title}>Bước 1: CHỌN SẢN PHẨM</h2>
                  <p style={styles.paragraph}>
                    Quý khách vui lòng chọn sản phẩm trong website của chúng tôi
                    và thêm chúng vào giỏ hàng rồi điền thông tin nơi quý khách
                    muốn chúng tôi ship cá đến.
                  </p>
                </div>
                <div>
                  <h2 style={styles.title}>Bước 2: ĐẶT HÀNG</h2>
                  <p style={styles.paragraph}>
                    Quý khách có thể chọn các hình thức như:
                    <ul style={styles.ul}>
                      <li style={styles.li}>
                        Đặt hàng qua điện thoại: 0787.225.999
                      </li>
                      <li style={styles.li}>
                        Đặt hàng qua website: sieuthicakoi.vn
                      </li>
                    </ul>
                    Sau khi duyệt sản phẩm và báo giá, quý khách vui lòng cung
                    cấp địa chỉ và số điện thoại chính xác để nhân viên của
                    chúng tôi có thể giao hàng đến quý khách.
                  </p>
                </div>
                <div>
                  <h2 style={styles.title}>Bước 3: THANH TOÁN</h2>
                  <p style={styles.paragraph}>
                    Quý khách có thể chọn các hình thức thanh toán sau đây như:
                    <ul style={styles.ul}>
                      <li style={styles.li}>ZaloPay</li>
                      <li style={styles.li}>Momo</li>
                    </ul>
                    Sau khi thanh toán, khách hàng sẽ được nhân viên liên hệ để
                    xác nhận đơn hàng.
                  </p>
                </div>
                <div>
                  <h2 style={styles.title}>Bước 4: NHẬN HÀNG</h2>
                  <p style={styles.paragraph}>
                    Quý khách vui lòng kiểm tra sản phẩm có đúng sản phẩm đã mua
                    hay không sau đó ký tên xác nhận vào phiếu giao nhận.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
