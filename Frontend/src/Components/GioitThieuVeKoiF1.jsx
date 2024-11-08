import { Container } from "react-bootstrap";
import { Typography } from "antd";
const { Paragraph } = Typography;
import { Table } from "react-bootstrap";
import img1 from "../../src/assets/GioiThieuF1/1.jpg";
import img2 from "../../src/assets/GioiThieuF1/2.jpg";
import img3 from "../../src/assets/GioiThieuF1/3.webp";
import img4 from "../../src/assets/GioiThieuF1/4.webp";
import img5 from "../../src/assets/GioiThieuF1/5.webp";
import img6 from "../../src/assets/GioiThieuF1/6.webp";
export default function GioiThieuVeKoiF1() {
  const data = [
    {
      criteria: "Râu Cá",
      purebred: "Cứng, dài, đầu hơi gù",
      f1: "Nhỏ, ngắn hơn, đầu không gù",
    },
    {
      criteria: "Mắt Cá",
      purebred: "Mặt nhanh lẹ hơn",
      f1: "Mặt chậm hơn so với cá Koi Nhật",
    },
    {
      criteria: "Vây Ngực",
      purebred: "Dày, đục",
      f1: "Nhỏ, trong suốt",
    },
    {
      criteria: "Vảy Cá",
      purebred: "Lớn hơn",
      f1: "Nhỏ hơn",
    },
    {
      criteria: "Phần Hông",
      purebred: "Ngắn hơn khi nhìn ngang",
      f1: "Dài, thon hơn khi nhìn ngang",
    },
    {
      criteria: "Thân Cá",
      purebred: "Thân hình khỏe, dài (có chiều dài dưới 1m)",
      f1: "Thân hình ngắn hơn",
    },
  ];
  return (
    <>
      <Container
        style={{
          padding: "20px",
          paddingTop: "100px",
        }}
      >
        <div style={{ textAlign: "center", color: "rgb(255, 178, 0)" }}>
          <h1>Giới thiệu về Koi F1</h1>
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
              Cá Koi F1 Là Gì? Đặc Điểm, Cách Phân Biệt Với Cá Koi Nhật Bản
            </h3>
          </div>
          <div>
            <Paragraph
              style={{ fontSize: "20px", fontWeight: "bold", color: "#e4cfb1" }}
            >
              Cá Koi F1 là một thuật ngữ phổ biến trong làng yêu cá Koi, nhưng
              không phải ai cũng hiểu rõ về nó. Trong khi cá Koi Nhật Bản thường
              được biết đến như là những con cá có giá trị cao và được nuôi
              dưỡng cẩn thận từ Nhật Bản, thì cá Koi F1 là một khái niệm mới mẻ
              và đang thu hút sự quan tâm của cộng đồng yêu thú cảnh trên toàn
              thế giới. Sau đây, hãy cùng Zen Koi Garden tìm hiểu Cá Koi F1 là
              gì? Đặc điểm, cách phân biệt với cá Koi Nhật Bản trong bài viết
              sau nhé
            </Paragraph>
          </div>
          <div>
            <h3
              style={{
                fontWeight: "600",
                color: "red",
                color: "rgb(255, 178, 0)",
              }}
            >
              1. Cá Koi F1 Là Gì ?
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Cá Koi F1 là một biến thể đặc biệt, được tạo ra từ cá Koi Nhật Bản
              sau khi chúng đã được nhập khẩu và sinh sống tại Việt Nam trong
              một khoảng thời gian nhất định. Dòng cá này giữ nguyên nhiều đặc
              tính của bố mẹ, nhưng cũng có những sự khác biệt quan trọng. Được
              nuôi lớn trong điều kiện khí hậu Việt Nam, cá Koi F1 thích nghi
              tốt hơn, dễ chăm sóc hơn và có khả năng chống chọi cao hơn. Mặc dù
              chúng có vẻ giống hệt với bố mẹ, nhưng với sự kinh nghiệm, bạn sẽ
              nhận ra những đặc điểm độc đáo của chúng, đặc biệt là trong hình
              dạng cơ thể, do cá đã phải thích nghi với môi trường mới để tồn
              tại và phát triển tốt nhất.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img1} style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              2.Quy trình tạo ra cá Koi F1 theo phong cách Nhật Bản tại Việt Nam
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Để tạo ra một đàn cá Koi F1 chất lượng, trại nuôi cần lựa chọn
              những con cá bố mẹ thuần chủng, thường là từ cùng một lứa để đảm
              bảo sức khỏe và điều kiện thích nghi tương đương. Cả bố mẹ cần
              được chăm sóc và duy trì sức khỏe tốt để đảm bảo chất lượng của
              trứng.
              <br />
              Sau khi cá bố mẹ thực hiện quá trình đẻ trứng và thụ tinh thành
              công, quá trình ấp trứng được thực hiện tại các bể riêng, áp dụng
              các phương pháp và kỹ thuật Nhật Bản để tạo ra một môi trường phát
              triển hoàn hảo cho trứng. Trong quá trình này, việc duy trì nồng
              độ oxy ổn định và đủ là quan trọng để tăng tỉ lệ nở và đảm bảo sức
              khỏe của cá con.
              <br />
              Sau một thời gian ấp, trứng sẽ nở thành cá bột. Tại đây, chăm sóc
              tiếp tục được tập trung vào thức ăn và nguồn nước để đảm bảo sự
              phát triển khỏe mạnh của cá con. Có thể nuôi chúng trong hồ cá Koi
              đơn giản, nhưng cần phải có thiết bị lọc và máy bơm đầy đủ để tạo
              môi trường tốt nhất cho cá. Khi cá đạt kích thước và trọng lượng
              cần thiết, chúng sẽ sẵn sàng để được chuyển đến các ao cá, tiểu
              cảnh, sông, hồ, và tiếp tục phát triển.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img2} style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              3.Hướng dẫn phân biệt cá koi F1 và cá koi thuần chủng
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Để phân biệt giữa cá Koi F1 và cá Koi thuần chủng, bạn có thể tuân
              theo một số hướng dẫn dưới đây. Việc này không quá khó khăn và có
              thể được thực hiện thông qua sự quan sát kỹ lưỡng về màu sắc, hình
              dáng và đặc tính của cá, cũng như thông qua mức giá trên thị
              trường
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
                      Đối với cá Koi thuần chủng, màu sắc trên thân cá thường
                      rất rõ nét và đậm. Mảng màu trắng sẽ trắng như tuyết,
                      khoang đen sẽ đen sì và mịn, phần mảng màu đỏ sẽ tươi như
                      máu. Ranh giới giữa các màu sắc rất rõ ràng, không có sự
                      lờ mờ hay nhạt màu. Đối với cá Koi trắng và vàng, màu sắc
                      hiện lên với ánh bạc bắt mắt.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img3} style={{ width: "50%" }} />
                    </div>
                  </li>
                  <li>
                    {" "}
                    <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
                      Đối với cá Koi dòng F1, các mảng màu thường mờ hơn, chẳng
                      hạn phần màu đỏ có thể chuyển sang màu cam, vùng đen trở
                      nên xám và vùng trắng mờ hơn. Những màu sắc này không đậm
                      màu và không rõ ràng như cá Koi thuần chủng. Tuy nhiên, sự
                      khác biệt về màu sắc này chỉ có thể được nhận biết bởi
                      những người có kinh nghiệm trong nuôi cá Koi
                    </Paragraph>
                  </li>
                </ul>
              </li>
              <li>
                {" "}
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
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Tiêu Chí
                      </th>
                      <th
                        style={{
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Cá Koi Thuần Chủng
                      </th>
                      <th
                        style={{
                          color: "rgb(255, 178, 0)",
                          backgroundColor: "#470101",
                        }}
                      >
                        Cá Koi F1
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
                          {item.f1}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ textAlign: "center" }}>
                  <img src={img4} style={{ width: "50%" }} />
                </div>
              </li>
              <li>
                {" "}
                <span
                  id="33"
                  style={{ fontSize: "20px", color: "rgb(255, 178, 0)" }}
                >
                  3.3 Chi phí của cá Koi
                </span>
                <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
                  Giá của cá Koi F1 thường rẻ hơn so với cá Koi thuần chủng, và
                  giá thành là một trong những yếu tố quan trọng để phân biệt
                  giữa chúng. Thông thường, dòng cá Koi F1 được bán với giá thấp
                  hơn nhiều so với các loại cá Koi thuần chủng. Đối với cá Koi
                  Nhật Bản, giá cả có thể lên đến vài chục triệu đồng, thậm chí
                  một con cá Koi đắt nhất trên thế giới có giá lên tới 42 tỷ
                  đồng.
                  <br />
                  Chi phí của cá Koi thường phụ thuộc vào kích thước của chúng.
                  Do đó, việc tìm kiếm một nguồn cung cá Koi đáng tin cậy và
                  chuyên nghiệp là quan trọng để đảm bảo mua được sản phẩm phù
                  hợp với ngân sách của bạn.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img5} style={{ width: "50%" }} />
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", color: "rgb(255, 178, 0)" }}>
              4.Nên Mua Cá Koi Nhật Hay Cá Koi F1
            </h3>
            <Paragraph style={{ fontSize: "20px", color: "#e4cfb1" }}>
              Nên chọn mua Koi Nhật hay Koi F1 là một quyết định phụ thuộc vào
              quan điểm cá nhân của người nuôi. Quan trọng nhất là đảm bảo hồ cá
              có cảnh quan hài hòa và tinh tế. Về mặt kinh tế, cá Koi F1 thường
              tiết kiệm chi phí hơn, và không ít trường hợp, chúng có vẻ không
              kém phần đẹp mắt so với Koi Nhật.
              <br />
              Các chú cá Koi F1 thường có giá thành thấp hơn so với Koi Nhật,
              điều này làm cho việc mua sắm trở nên hiệu quả chi phí. Để đảm bảo
              chất lượng, việc tìm đến các trang trại nuôi cá Koi lớn hoặc liên
              hệ với Sân Vườn Trúc Xinh là một lựa chọn khôn ngoan. Chúng tôi
              cung cấp nhiều dòng cá Koi F1 với đủ kích thước để khách hàng có
              thể chọn lựa theo sở thích và điều kiện kinh tế của mình. Đừng
              ngần ngại liên hệ để được tư vấn và lựa chọn chú cá phù hợp.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <img src={img6} style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
