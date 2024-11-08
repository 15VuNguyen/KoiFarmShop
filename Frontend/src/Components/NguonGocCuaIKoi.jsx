import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Css/supplierStyle.css";
import { Typography } from "antd";
import axiosInstance from "../An/Utils/axiosJS";

const { Paragraph } = Typography;

export default function NguonGocCuaIKoi() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axiosInstance.get(
          "/manager/manage-supplier/get-all"
        );
        if (response.status === 200) {
          setData(response.data.result);
        } else {
          setError("Failed to fetch supplier details.");
        }
      } catch (error) {
        setError("Error fetching supplier details." + error);
      }
    };
    fetchSupplierData();
  }, []);

  return (
    <>
      <Container
        style={{ padding: "20px", paddingTop: "100px", color: "#e4cfb1" }}
      >
        <div style={{ color: "white" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "rgb(255, 178, 0)" }}>Nguồn Gốc Của IKoi</h1>
          </div>
          <div>
            <br />
            <Paragraph className="paragraph-Style" style={{}}>
              Cá Koi có nguồn gốc từ Trung Quốc, nơi có truyền thống lai tạo lâu
              đời. Tuy nhiên, cá Koi Nhật Bản lại được biết đến với những phẩm
              chất và giá trị nghệ thuật vượt trội hơn hẳn. Sự khác biệt này
              khiến nhiều người Việt Nam ưa chuộng Koi Nhật Bản vì sự hoàn hảo
              trong từng chi tiết.
            </Paragraph>
            <br />
            <Paragraph className="paragraph-Style" style={{ color: "#e4cfb1" }}>
              Koi Nhật Bản nổi bật với nhiều đặc điểm ưu việt:
            </Paragraph>
            <ul>
              <li>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "#e4cfb1" }}
                >
                  Thân hình thon gọn, khỏe mạnh với cấu trúc tốt, giúp cá có
                  tiềm năng phát triển lớn.
                </Paragraph>
              </li>
              <li>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "#e4cfb1" }}
                >
                  Màu sắc và hoa văn rõ ràng, không lem nhem, tạo nên vẻ đẹp nổi
                  bật.
                </Paragraph>
              </li>
              <li>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "#e4cfb1" }}
                >
                  Tính cách hòa đồng và sức đề kháng tốt, nhờ vào phương pháp
                  nuôi dưỡng chuyên nghiệp.
                </Paragraph>
              </li>
            </ul>
            <Paragraph className="paragraph-Style" style={{ color: "#e4cfb1" }}>
              Việc nuôi Koi không chỉ là sở thích mà còn là một khoản đầu tư,
              với tiềm năng mang lại giá trị kinh tế trong tương lai. Koi Nhật
              Bản có sức hút đặc biệt và dễ dàng tiêu thụ.
            </Paragraph>
          </div>
        </div>
        <div>
          <h1 style={{ color: "rgb(255, 178, 0)" }}>
            Các Koi Farm Nhật Bản Chúng Tôi Tin Dùng
          </h1>
          <div>
            <strong style={{ fontSize: "20px" }}>
              Tại sao chúng tôi chọn Koi?
            </strong>

            <div style={{ paddingTop: "20px" }}>
              <Paragraph
                className="paragraph-Style"
                style={{ color: "#e4cfb1" }}
              >
                IKoi là đối tác của nhiều Koi Farm nổi tiếng như Dainichi,
                Omosako, và Marudo. Mỗi farm đều có thế mạnh riêng, giúp chúng
                tôi cung cấp những con Koi đẹp nhất.
              </Paragraph>
              <Paragraph
                className="paragraph-Style"
                style={{ color: "#e4cfb1" }}
              >
                Tất cả các farm này đều nằm tại Ojiya, Nhật Bản, được xem là
                trung tâm của ngành nuôi cá Koi, nơi tập trung nhiều nhà lai tạo
                danh tiếng.
              </Paragraph>
            </div>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <hr />
        <div>
          {data.map((supplier) => (
            <div key={supplier._id}>
              <Paragraph className="paragraph-Style">
                <h3 style={{ color: "rgb(255, 178, 0)" }}>
                  {supplier.SupplierName}
                </h3>
                <Paragraph className="text-Style">
                  <strong style={{ color: "rgb(255, 178, 0)" }}>
                    Địa chỉ:
                  </strong>{" "}
                  <span style={{ color: "#e4cfb1", fontSize: "20px" }}>
                    {supplier.Address}
                  </span>
                </Paragraph>
                <Paragraph className="text-Style">
                  <strong style={{ color: "rgb(255, 178, 0)" }}>
                    Quốc gia:
                  </strong>{" "}
                  <span style={{ color: "#e4cfb1", fontSize: "20px" }}>
                    {supplier.Country}
                  </span>
                </Paragraph>
                <Paragraph className="text-Style">
                  <strong style={{ color: "rgb(255, 178, 0)" }}>
                    Điện thoại:
                  </strong>{" "}
                  <span style={{ color: "#e4cfb1", fontSize: "20px" }}>
                    {supplier.PhoneNumber}
                  </span>
                </Paragraph>
                <Paragraph className="text-Style">
                  <strong style={{ color: "rgb(255, 178, 0)" }}>Mô tả:</strong>{" "}
                  <span style={{ color: "#e4cfb1", fontSize: "20px" }}>
                    {supplier.SupplierDescription}
                  </span>
                </Paragraph>
                <Paragraph className="text-Style">
                  <strong style={{ color: "rgb(255, 178, 0)" }}>
                    Website:
                  </strong>{" "}
                  <span style={{ color: "#e4cfb1", fontSize: "20px" }}>
                    {supplier.Website}
                  </span>
                </Paragraph>
                {supplier.SupplierImage && (
                  <img
                    src={supplier.SupplierImage}
                    alt={supplier.SupplierName}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "600px",
                    }}
                  />
                )}
              </Paragraph>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
