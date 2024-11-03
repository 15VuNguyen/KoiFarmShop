import React from "react";
import { Layout, Menu, Typography } from "antd";
import { FaPhone } from "react-icons/fa"; // Separate import for FaPhone
import { FaLocationDot } from "react-icons/fa6"; // Separate import for FaLocationDot
import { SiGmail } from "react-icons/si";
import "./Css/footerStyle.css";
const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 200px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <Title level={4} style={{ color: "white" }}>
            Liên hệ
          </Title>
          <Paragraph style={{ color: "white" }}>
            <FaLocationDot />: Phường Bến Thành, Quận 1, Hồ Chí Minh
          </Paragraph>
          <Paragraph style={{ color: "white" }}>
            <FaPhone />: 090 456 789
          </Paragraph>
          <Paragraph style={{ color: "white" }}>
            <SiGmail />: IKoi@gmail.com
          </Paragraph>
        </div>

        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <Title level={4} style={{ color: "white" }}>
            Danh Mục
          </Title>
          <Menu
            mode="vertical"
            style={{ background: "transparent", border: "none", padding: 0 }}
          >
            <Menu.Item>
              <a href="/gioithieu" style={{ color: "white" }}>
                Giới thiệu
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/gioithieuvekoinhat" style={{ color: "white" }}>
                Cá Koi Nhật
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/gioithieuvekoif1" style={{ color: "white" }}>
                Cá Koi F1
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/gioithieuvekoiviet" style={{ color: "white" }}>
                Cá Koi Việt
              </a>
            </Menu.Item>
          </Menu>
        </div>

        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <Title level={4} style={{ color: "white" }}>
            Chính Sách
          </Title>
          <Menu
            mode="vertical"
            style={{ background: "transparent", border: "none", padding: 0 }}
          >
            <Menu.Item>
              <a href="/chinhsachmuahang" style={{ color: "white" }}>
                Chính sách mua hàng
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/chinhsachvanchuyen" style={{ color: "white" }}>
                Chính sách vận chuyển
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/chinhsachdoitra" style={{ color: "white" }}>
                Chính sách đổi trả
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/chinhsachbaohanh" style={{ color: "white" }}>
                Chính sách bảo hành
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/chinhsachbaomatthongtin" style={{ color: "white" }}>
                Chính sách bảo mật thông tin
              </a>
            </Menu.Item>
          </Menu>
        </div>
      </div>

      <hr style={{ marginTop: "50px", borderColor: "white" }} />
      <Paragraph
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "14px",
          color: "white",
        }}
      >
        Copyright © 2024. All Rights Reserved. Design Web and SEO by IKoi
      </Paragraph>
    </Footer>
  );
};

export default React.memo(FooterComponent);
