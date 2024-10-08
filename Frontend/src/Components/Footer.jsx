import React from "react";
import { useState, useEffect } from "react";

export default function Footer() {
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            backgroundImage: `url("src/assets/pexels-quang-nguyen-vinh-222549-2131828.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              margin: "100px",
              color: "white",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                color: "black",
                fontSize: "20px",
                marginTop: "70px",
                marginLeft: "20px",
              }}
            >
              <h1 style={{ color: "white" }}>Điểm nổi bật của KoiStoreVN</h1>

              <ul style={{ fontSize: "16px", color: "white" }}>
                <li style={{ marginTop: "10px" }}>
                  {" "}
                  Cá nhập khẩu chất lượng cao, nhập trực tiếp tại các trang trại
                  Cá Koi Nhật Bản
                </li>
                <li style={{ marginTop: "10px" }}>
                  {" "}
                  Khách hàng yên tâm nuôi cá vì luôn có chuyên gia đồng hành
                </li>
                <li style={{ marginTop: "10px" }}>
                  {" "}
                  Đa dạng sản phẩm, dịch vụ chăm sóc Cá Koi và Hồ Cá Koi
                </li>
                <li style={{ marginTop: "10px" }}>
                  {" "}
                  KoiStoreVN tự hào là đơn vị đầu tiên tại miền bắc được chuyển
                  giao công nghệ mô hình trại SAKAI (Sakai fish farm, Hiroshima,
                  Japan)
                </li>
                <li style={{ marginTop: "10px" }}>
                  Trại gồm 120 hồ lớn chuẩn theo mô hình trại SAKAI
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="footer"
          id="footer"
          style={{ backgroundColor: "black", color: "white", height: "500px" }}
        >
          <div className="footer-content" style={{ display: "flex" }}>
            <div
              className="footer-content-left"
              style={{ width: "100%", marginTop: "50px", marginLeft: "50px" }}
            >
              <h2 style={{ marginLeft: "30px" }}>KoiStoreVN</h2>
              <div>
                <p style={{ marginLeft: "30px" }}>
                  Chuyên cung cấp các dòng Cá Koi Nhật Bản nhập khẩu chất lượng
                  cao có nguồn gốc xuất xứ rõ ràng, giấy tờ đầy đủ
                </p>
                <ul style={{ listStyle: "none" }}>
                  <li style={{ marginBottom: "10px" }}>
                    Địa chỉ: 87 Thịnh Liệt, Hoàng Mai, Hà Nội
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {" "}
                    Phone : 112233445566
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {" "}
                    Phone : 112233445566
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {" "}
                    Phone : 112233445566
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="footer-content-center"
              style={{ width: "100%", marginTop: "50px", marginLeft: "50px" }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <h2 style={{ marginLeft: "30px" }}>Danh Mục</h2>
                  <ul
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      marginTop: "30px",
                    }}
                  >
                    <li style={{ marginBottom: "30px" }}>Giới Thiệu</li>
                    <li style={{ marginBottom: "30px" }}>Cá Koi Nhật</li>
                    <li style={{ marginBottom: "30px" }}>Cá Koi F1</li>
                    <li style={{ marginBottom: "30px" }}>Cá Koi Mini</li>
                    <li style={{ marginBottom: "30px" }}>Giá Cá Koi</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="footer-content-center"
              style={{
                width: "100%",
                marginTop: "50px",
                marginLeft: "50px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <h2 style={{ marginLeft: "30px" }}>Chính Sách</h2>
                  <ul
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      marginTop: "30px",
                    }}
                  >
                    <li style={{ marginBottom: "30px" }}>
                      Chính Sách Mua Hàng
                    </li>
                    <li style={{ marginBottom: "30px" }}>
                      Chính Sách Vận Chuyển
                    </li>
                    <li style={{ marginBottom: "30px" }}>Chính Sách Đổi Trả</li>
                    <li style={{ marginBottom: "30px" }}>
                      Chính Sách Bảo Hành
                    </li>
                    <li style={{ marginBottom: "30px" }}>
                      Chính Sách Bảo Mật Thông Tin
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="footer-content-right"
              style={{ width: "100%", marginTop: "50px", marginLeft: "50px" }}
            >
              <h2 style={{ marginLeft: "30px" }}>Liên Hệ</h2>
              <ul style={{ textDecoration: "none", listStyle: "none" }}>
                <li>+1-212-345-567</li>
                <li>diamondalgola@gmail.com</li>
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <p className="footer-copyright" style={{ textAlign: "center" }}>
              Copyright @2024 koivnstore.vn - All Right Reserved. Design Web and
              Seo By TuanDu
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
