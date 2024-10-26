import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./Css/supplierStyle.css";

import { Layout, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;

export default function NguonGocCuaIKoi() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/manager/manage-supplier/get-all"
        );
        if (response.status === 200) {
          setData(response.data.result);
        } else {
          setError("Failed to fetch supplier details.");
        }
      } catch (error) {
        setError("Error fetching supplier details.");
      }
    };
    fetchSupplierData();
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ padding: "20px", paddingTop: "100px" }}>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "red" }}>Nguồn Gốc Của IKoi</h1>
          </div>
          <div>
            <br />
            <Paragraph className="paragraph-Style">
              Cá Koi có nguồn gốc từ Trung Quốc, nơi có truyền thống lai tạo lâu
              đời. Tuy nhiên, cá Koi Nhật Bản lại được biết đến với những phẩm
              chất và giá trị nghệ thuật vượt trội hơn hẳn. Sự khác biệt này
              khiến nhiều người Việt Nam ưa chuộng Koi Nhật Bản vì sự hoàn hảo
              trong từng chi tiết.
            </Paragraph>
            <br />
            <Paragraph className="paragraph-Style">
              Koi Nhật Bản nổi bật với nhiều đặc điểm ưu việt:
            </Paragraph>
            <ul>
              <li>
                <Paragraph className="paragraph-Style">
                  Thân hình thon gọn, khỏe mạnh với cấu trúc tốt, giúp cá có
                  tiềm năng phát triển lớn.
                </Paragraph>
              </li>
              <li>
                <Paragraph className="paragraph-Style">
                  Màu sắc và hoa văn rõ ràng, không lem nhem, tạo nên vẻ đẹp nổi
                  bật.
                </Paragraph>
              </li>
              <li>
                <Paragraph className="paragraph-Style">
                  Tính cách hòa đồng và sức đề kháng tốt, nhờ vào phương pháp
                  nuôi dưỡng chuyên nghiệp.
                </Paragraph>
              </li>
            </ul>
            <Paragraph className="paragraph-Style">
              Việc nuôi Koi không chỉ là sở thích mà còn là một khoản đầu tư,
              với tiềm năng mang lại giá trị kinh tế trong tương lai. Koi Nhật
              Bản có sức hút đặc biệt và dễ dàng tiêu thụ.
            </Paragraph>
          </div>
        </div>
        <div>
          <h1 style={{ color: "red" }}>
            Các Koi Farm Nhật Bản Chúng Tôi Tin Dùng
          </h1>
          <div>
            <strong>Tại sao chúng tôi chọn Koi?</strong>
            <br />
            <Paragraph className="paragraph-Style">
              Nhật Koi Farm là đối tác của nhiều Koi Farm nổi tiếng như
              Dainichi, Omosako, và Marudo. Mỗi farm đều có thế mạnh riêng, giúp
              chúng tôi cung cấp những con Koi đẹp nhất.
            </Paragraph>
            <br />
            <Paragraph className="paragraph-Style">
              Tất cả các farm này đều nằm tại Ojiya, Nhật Bản, được xem là trung
              tâm của ngành nuôi cá Koi, nơi tập trung nhiều nhà lai tạo danh
              tiếng.
            </Paragraph>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="supplier-list">
          {data.map((supplier) => (
            <div key={supplier._id} className="supplier-item">
              <Paragraph className="paragraph-Style">
                <h3 style={{ color: "red" }}>{supplier.SupplierName}</h3>
                <p className="text-Style">
                  <strong style={{ color: "red" }}>Địa chỉ:</strong>{" "}
                  {supplier.Address}
                </p>
                <p className="text-Style">
                  <strong style={{ color: "red" }}>Quốc gia:</strong>{" "}
                  {supplier.Country}
                </p>
                <p className="text-Style">
                  <strong style={{ color: "red" }}>Điện thoại:</strong>{" "}
                  {supplier.PhoneNumber}
                </p>
                <Paragraph className="text-Style">
                  <strong style={{ color: "red" }}>Mô tả:</strong>{" "}
                  {supplier.SupplierDescription}
                </Paragraph>
                <Paragraph className="text-Style">
                  <strong style={{ color: "red" }}>Website:</strong>{" "}
                  {supplier.Website}
                </Paragraph>
                {supplier.SupplierImage && (
                  <img
                    src={supplier.SupplierImage}
                    alt={supplier.SupplierName}
                    className="supplier-image"
                  />
                )}
              </Paragraph>
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%" }}>
            <img src="src/assets/img_4.png" alt="Image 4" />
          </div>
          <div style={{ width: "70%" }}>
            <img src="src/assets/img_5.png" alt="Image 5" />
          </div>
        </div>
      </Container>

      <div
        style={{
          display: "flex",
          backgroundImage: `url("src/assets/e.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>
      <Footer />
    </>
  );
}
