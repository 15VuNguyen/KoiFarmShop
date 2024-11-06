import React from "react";
import { Layout, Menu, Typography } from "antd";
import { FaPhone } from "react-icons/fa"; // Separate import for FaPhone
import { FaLocationDot } from "react-icons/fa6"; // Separate import for FaLocationDot
import { SiGmail } from "react-icons/si";
import "./Css/footerStyle.css";
const { Footer } = Layout;
const { Title, Paragraph } = Typography;
const accessToken = localStorage.getItem("accessToken");
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
            flex: "3 3 200px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <span
              style={{
                borderBottom: "3px solid white",
                fontWeight: "bold",
                fontSize: "15px",
                paddingRight: "45px",
              }}
            >
              Giới thiệu chung
            </span>
          </div>
          <div>
            <img
              src="src/assets/logo.png"
              alt="Logo"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <div>
            <span
              style={{
                borderBottom: "3px solid white",
                fontWeight: "bold",
                fontSize: "15px",
                paddingRight: "45px",
              }}
            >
              Địa chỉ công ty
            </span>
          </div>
          <div
            style={{
              marginBottom: "20px",
              paddingLeft: "290px",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <FaLocationDot style={{ marginRight: "8px" }} />
                <span>Số 10 ngách 54, ngõ 76 Phù Đồng, Q. 11, TP.HCM</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <FaPhone style={{ marginRight: "8px" }} />
                <span>0123-456-789</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <FaPhone style={{ marginRight: "8px" }} />
                <span>Tel:1900-0089</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <FaPhone style={{ marginRight: "8px" }} />
                <span>Zalo:0123-456-789</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <SiGmail style={{ marginRight: "8px" }} />
                <span>Gmail:IKoi@gmail.com</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <SiGmail style={{ marginRight: "8px" }} />
                <span>Email:IKoi123@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <span
            style={{
              borderBottom: "3px solid white",
              fontWeight: "bold",
              fontSize: "15px",
              paddingRight: "45px",
            }}
          >
            Thông tin tài khoản
          </span>
          <div>
            <div>
              {!accessToken && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/Login"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Đăng nhập
                    </a>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/Login"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Đăng Ký
                    </a>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/Login"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Quên mật khẩu
                    </a>
                  </div>
                </div>
              )}

              {accessToken && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/profile"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Tài khoản của bạn
                    </a>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/trackingorderpage"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Đơn hàng của bạn
                    </a>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <a
                      href="/donkyguipage"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Đơn ký gửi của bạn
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <span
            style={{
              borderBottom: "3px solid white",
              fontWeight: "bold",
              fontSize: "15px",
              paddingRight: "45px",
            }}
          >
            Giới thiệu
          </span>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/nguongocIKoi"
              style={{ color: "white", textDecoration: "none" }}
            >
              Nguồn gốc của cá của IKoi
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/gioithieuvekoif1"
              style={{ color: "white", textDecoration: "none" }}
            >
              Giới thiệu về Koi F1
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/gioithieuvekoinhat"
              style={{ color: "white", textDecoration: "none" }}
            >
              Giới thiệu về Koi Nhật
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/gioithieuvekoivietz  "
              style={{ color: "white", textDecoration: "none" }}
            >
              Giới thiệu về Koi Việt
            </a>
          </div>
          <span
            style={{
              borderBottom: "3px solid white",
              fontWeight: "bold",
              fontSize: "15px",
              paddingRight: "45px",
            }}
          >
            <a
              href="/dichvu"
              style={{ fontWeight: "bold", fontSize: "15px", color: "white" }}
            >
              Dịch vụ
            </a>
          </span>
          <div style={{ marginBottom: "8px" }}>
            <a href="/kygui" style={{ color: "white", textDecoration: "none" }}>
              Ký gửi Koi
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/koidangban"
              style={{ color: "white", textDecoration: "none" }}
            >
              Koi đang bán
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/lonhapkhau"
              style={{ color: "white", textDecoration: "none" }}
            >
              Lô Koi mới về
            </a>
          </div>
          <span
            style={{
              borderBottom: "3px solid white",
              fontWeight: "bold",
              fontSize: "15px",
              paddingRight: "45px",
            }}
          >
            Chính sách
          </span>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/chinhsachvanchuyen"
              style={{ color: "white", textDecoration: "none" }}
            >
              Chính sách mua hàng
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/chinhsachvanchuyen"
              style={{ color: "white", textDecoration: "none" }}
            >
              Chính sách bảo mật
            </a>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <a
              href="/chinhsachvanchuyen"
              style={{ color: "white", textDecoration: "none" }}
            >
              Chính sách vận chuyển
            </a>
          </div>
        </div>
        <div
          style={{
            flex: "2 2 200px",
            marginBottom: "20px",
            paddingRight: "100px",
          }}
        >
          <Title level={4} style={{ color: "white" }}>
            Địa chỉ
          </Title>
          <div
            style={{ display: "flex", flexDirection: "column", color: "white" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610098760207!2d106.7855983153347!3d10.84134806089169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527cde5b1b1b1%3A0x2b1b1b1b1b1b1b1b!2sFPT%20University!5e0!3m2!1sen!2s!4v1633072800000!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <hr />
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
