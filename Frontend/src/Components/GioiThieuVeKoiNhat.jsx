import { Container } from "react-bootstrap";
import { Typography } from "antd";
const { Paragraph } = Typography;
import { Table } from "react-bootstrap";
import img1 from "../../src/assets/GioiThieuKoiViet/1.jpg";
import img2 from "../../src/assets/GioiThieuKoiViet/2.jpg";
import img3 from "../../src/assets/GioiThieuKoiViet/3.jpg";
import img4 from "../../src/assets/GioiThieuKoiViet/4.jpg";
import img5 from "../../src/assets/GioiThieuKoiViet/5.jpg";
import img6 from "../../src/assets/GioiThieuKoiViet/6.jpg";
export default function GioiThieuVeKoiNhat() {
  const data = [
    {
      criteria: "Râu Cá",
      purebred: "Cứng, dài, đầu hơi gù",
      nhat: "Dài, nhẹ nhàng, đầu gù rõ nét",
    },
    {
      criteria: "Mắt Cá",
      purebred: "Mặt nhanh lẹ hơn",
      nhat: "Mắt to, sáng, biểu cảm hơn",
    },
    {
      criteria: "Vây Ngực",
      purebred: "Dày, đục",
      nhat: "Mỏng nhẹ, trong suốt",
    },
    {
      criteria: "Vảy Cá",
      purebred: "Lớn hơn",
      nhat: "Nhỏ hơn, bóng đẹp hơn",
    },
    {
      criteria: "Phần Hông",
      purebred: "Ngắn hơn khi nhìn ngang",
      nhat: "Dài và thon hơn khi nhìn ngang",
    },
    {
      criteria: "Thân Cá",
      purebred: "Thân hình khỏe, dài (có chiều dài dưới 1m)",
      nhat: "Thân hình thanh thoát, thường dài hơn",
    },
  ];
  return (
    <>
      <Container style={{ padding: "20px", paddingTop: "100px" }}>
        <div style={{ textAlign: "center", color: "rgb(255, 178, 0)" }}>
          <h1>Giới thiệu về Koi Nhật</h1>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontWeight: "600",
                fontSize: "30px",
                color: "rgb(255, 178, 0)",
              }}
            >
              Cá Koi Nhật Là Gì? Đặc Điểm, Cách Phân Biệt Với Cá Koi Việt
            </h3>
          </div>
          <div>
            <Paragraph
              style={{ fontSize: "20px", fontWeight: "bold", color: "#e4cfb1" }}
            >
              Cá Koi Nhật Bản là một trong những giống cá cảnh nổi tiếng nhất
              thế giới, được biết đến với vẻ đẹp tuyệt vời và giá trị cao. Với
              lịch sử lâu đời và truyền thống nuôi trồng tinh tế, cá Koi Nhật đã
              trở thành biểu tượng của sự sang trọng và nghệ thuật trong việc
              nuôi cá.
            </Paragraph>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              1. Cá Koi Nhật Là Gì?
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Cá Koi Nhật là giống cá được nhập khẩu từ Nhật Bản, nổi bật với
              màu sắc rực rỡ và hình dáng thanh thoát. Chúng thường được nuôi
              trong các hồ cảnh quan và là biểu tượng của sự thịnh vượng và may
              mắn trong văn hóa Nhật Bản.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img1} alt="Koi Nhat 1" style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              2. Quy trình nuôi cá Koi Nhật
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Quy trình nuôi cá Koi Nhật Bản rất khắt khe, từ khâu chọn giống
              cho đến chăm sóc. Để đảm bảo chất lượng, cá bố mẹ phải được lựa
              chọn kỹ lưỡng và được chăm sóc trong điều kiện tốt nhất.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img2} alt="Koi Nhat 2" style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <h3
              style={{
                fontWeight: "600",
                color: "rgb(255, 178, 0)",
                marginTop: "20px",
              }}
            >
              3. Hướng dẫn phân biệt cá Koi Nhật và cá Koi Việt
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Để phân biệt cá Koi Nhật và cá Koi Việt, bạn có thể dựa vào một số
              tiêu chí như hình dáng, màu sắc và giá cả.
            </Paragraph>
            <ul>
              <li>
                <span
                  id="31"
                  style={{ fontSize: "20px", color: "rgb(255, 178, 0)" }}
                >
                  3.1 Màu Sắc
                </span>
                <ul>
                  <li>
                    <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
                      Cá Koi Nhật thường có màu sắc rất rõ nét và sống động,
                      trong khi cá Koi Việt có thể có màu sắc nhạt hơn và không
                      rõ ràng như cá Koi Nhật.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={img3}
                        alt="Koi Nhat 3"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <span
                  id="32"
                  style={{ fontSize: "20px", color: "rgb(255, 178, 0)" }}
                >
                  3.2 Hình Dáng
                </span>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th
                        style={{
                          fontSize: "20px",
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Tiêu Chí
                      </th>
                      <th
                        style={{
                          fontSize: "20px",
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Cá Koi Thuần Chủng
                      </th>
                      <th
                        style={{
                          fontSize: "20px",
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Cá Koi Nhật
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            fontSize: "20px",
                            color: "#e4cfb1",
                            backgroundColor: "#470101",
                          }}
                        >
                          {item.criteria}
                        </td>
                        <td
                          style={{
                            fontSize: "20px",
                            color: "#e4cfb1",
                            backgroundColor: "#470101",
                          }}
                        >
                          {item.purebred}
                        </td>
                        <td
                          style={{
                            fontSize: "20px",
                            color: "#e4cfb1",
                            backgroundColor: "#470101",
                          }}
                        >
                          {item.nhat}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ textAlign: "center" }}>
                  <img src={img4} alt="Koi Nhat 4" style={{ width: "50%" }} />
                </div>
              </li>
              <li>
                <span
                  id="33"
                  style={{ fontSize: "20px", color: "rgb(255, 178, 0)" }}
                >
                  3.3 Chi phí của cá Koi
                </span>
                <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
                  Giá của cá Koi Nhật Bản thường cao hơn so với cá Koi Việt,
                  điều này phản ánh sự chăm sóc và quá trình nuôi trồng rất kỹ
                  lưỡng từ các trại cá nổi tiếng.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img5} alt="Koi Nhat 5" style={{ width: "50%" }} />
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              4. Nên Mua Cá Koi Nhật Hay Cá Koi Việt
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Quyết định mua cá Koi Nhật hay cá Koi Việt phụ thuộc vào sở thích
              và ngân sách của người nuôi. Cá Koi Nhật thường mang lại giá trị
              cao hơn về mặt nghệ thuật và thẩm mỹ, trong khi cá Koi Việt lại có
              giá rẻ hơn và dễ chăm sóc hơn.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img6} alt="Koi Nhat 6" style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
