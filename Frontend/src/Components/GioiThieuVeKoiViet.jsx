import { Container } from "react-bootstrap";
import { Typography } from "antd";
const { Paragraph } = Typography;
import { Table } from "react-bootstrap";
import img1 from "Frontend/src/assets/GioiThieuKoiViet/1.jpg";
import img2 from "Frontend/src/assets/GioiThieuKoiViet/2.jpg";
import img3 from "Frontend/src/assets/GioiThieuKoiViet/3.jpg";
import img4 from "Frontend/src/assets/GioiThieuKoiViet/4.jpg";
import img5 from "Frontend/src/assets/GioiThieuKoiViet/5.jpg";
import img6 from "Frontend/src/assets/GioiThieuKoiViet/6.jpg";
export default function GioiThieuVeKoiViet() {
  const data = [
    {
      criteria: "Râu Cá",
      purebred: "Cứng, dài, đầu hơi gù",
      viet: "Nhỏ, ngắn hơn, đầu không gù",
    },
    {
      criteria: "Mắt Cá",
      purebred: "Mặt nhanh lẹ hơn",
      viet: "Mặt chậm hơn so với cá Koi Nhật",
    },
    {
      criteria: "Vây Ngực",
      purebred: "Dày, đục",
      viet: "Nhỏ, trong suốt",
    },
    {
      criteria: "Vảy Cá",
      purebred: "Lớn hơn",
      viet: "Nhỏ hơn",
    },
    {
      criteria: "Phần Hông",
      purebred: "Ngắn hơn khi nhìn ngang",
      viet: "Dài, thon hơn khi nhìn ngang",
    },
    {
      criteria: "Thân Cá",
      purebred: "Thân hình khỏe, dài (có chiều dài dưới 1m)",
      viet: "Thân hình ngắn hơn",
    },
  ];

  return (
    <>
      <div>
        <Container style={{ padding: "20px", paddingTop: "100px" }}>
          <div style={{ textAlign: "center", color: "red" }}>
            <h1>Giới thiệu về Koi Việt</h1>
          </div>
          <div style={{ paddingTop: "50px" }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontWeight: "600", fontSize: "30px" }}>
                Cá Koi Việt Là Gì? Đặc Điểm, Cách Phân Biệt Với Cá Koi Nhật Bản
              </h3>
            </div>
            <div>
              <Paragraph style={{ fontSize: "20px", fontWeight: "bold" }}>
                Cá Koi Việt đang ngày càng trở thành lựa chọn phổ biến trong
                cộng đồng yêu cá, với nhiều đặc điểm hấp dẫn và giá thành hợp
                lý. Trong khi cá Koi Nhật Bản thường được biết đến như những con
                cá có giá trị cao, thì cá Koi Việt lại mang đến sự phù hợp với
                nhu cầu của nhiều người nuôi cá tại Việt Nam.
              </Paragraph>
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "red" }}>
                1. Cá Koi Việt Là Gì?
              </h3>
              <Paragraph style={{ fontSize: "20px" }}>
                Cá Koi Việt là những sản phẩm nuôi trồng tại Việt Nam, có nguồn
                gốc từ cá Koi Nhật Bản. Chúng được lai tạo và nuôi dưỡng để phù
                hợp với điều kiện khí hậu và môi trường tại Việt Nam. Cá Koi
                Việt có những đặc điểm riêng, dễ chăm sóc và có khả năng phát
                triển tốt trong môi trường tự nhiên.
              </Paragraph>
              <div>
                <img src={img1} alt="Koi Viet 1" />
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "red" }}>
                2. Quy trình nuôi cá Koi Việt
              </h3>
              <Paragraph style={{ fontSize: "20px" }}>
                Để tạo ra những con cá Koi Việt chất lượng, quy trình nuôi cần
                đảm bảo từ khâu lựa chọn giống đến chăm sóc. Trại nuôi cần chăm
                sóc cá bố mẹ cẩn thận để đảm bảo sức khỏe và chất lượng trứng.
              </Paragraph>
              <div>
                <img src={img2} alt="Koi Viet 2" />
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "red" }}>
                3. Hướng dẫn phân biệt cá Koi Việt và cá Koi thuần chủng
              </h3>
              <Paragraph style={{ fontSize: "20px" }}>
                Để phân biệt cá Koi Việt và cá Koi thuần chủng, bạn có thể dựa
                vào một số tiêu chí như hình dáng, màu sắc và giá cả.
              </Paragraph>
              <ul>
                <li>
                  <span id="31" style={{ fontSize: "20px" }}>
                    3.1 Màu Sắc
                  </span>
                  <ul>
                    <li>
                      <Paragraph style={{ fontSize: "20px" }}>
                        Cá Koi thuần chủng thường có màu sắc rõ nét và đậm,
                        trong khi cá Koi Việt có thể có màu sắc nhạt hơn và
                        không rõ ràng.
                      </Paragraph>
                      <div>
                        <img src={img3} alt="Koi Viet 3" />
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <span id="32" style={{ fontSize: "20px" }}>
                    3.2 Hình Dáng
                  </span>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tiêu Chí</th>
                        <th>Cá Koi Thuần Chủng</th>
                        <th>Cá Koi Việt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.criteria}</td>
                          <td>{item.purebred}</td>
                          <td>{item.viet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div>
                    <img src={img4} alt="Koi Viet 4" />
                  </div>
                </li>
                <li>
                  <span id="33" style={{ fontSize: "20px" }}>
                    3.3 Chi phí của cá Koi
                  </span>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Cá Koi Việt thường có giá thành thấp hơn so với cá Koi thuần
                    chủng, điều này làm cho nó trở thành lựa chọn hợp lý cho
                    nhiều người yêu cá. Giá cá Koi Việt có thể dao động tùy
                    thuộc vào kích thước và màu sắc.
                  </Paragraph>
                  <div>
                    <img src={img5} alt="Koi Viet 5" />
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "red" }}>
                4. Nên Mua Cá Koi Nhật Hay Cá Koi Việt
              </h3>
              <Paragraph style={{ fontSize: "20px" }}>
                Quyết định mua cá Koi Nhật hay cá Koi Việt phụ thuộc vào sở
                thích và ngân sách của người nuôi. Cá Koi Việt thường có giá rẻ
                hơn và phù hợp với nhiều người hơn, trong khi cá Koi Nhật lại
                mang lại giá trị cao hơn về mặt nghệ thuật và thẩm mỹ.
              </Paragraph>
              <div>
                <img src={img6} alt="Koi Viet 6" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
