import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { Layout, Typography } from "antd";
import img1 from "../assets/van-chuyen-ca-koi-tu-nhat-ve-viet-nam-uy-tin.jpg";
const { Text, Paragraph } = Typography;
export default function Kienthuckoi() {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <Container style={{ paddingTop: "150px" }}>
          <div>
            <h1 style={{ textAlign: "center", color: "#920202" }}>
              Kiến thức nuôi cá Koi cơ bản cho người mới bắt đầu
            </h1>
            <div>
              <Paragraph style={{ fontSize: "20px", paddingTop: "20px" }}>
                Mấy năm trở lại đây thú chơi cá Koi đang dần nở rộ và được khá
                nhiều người quan tâm nhất là người dùng Việt Nam. Cá Koi chính
                là dòng cá mới được du nhập vào Việt Nam trong khoảng thời gian
                gần đây, những chú cá Koi với nhiều màu sắc đa dạng mang đến sự
                thu hút cho những người yêu thích bộ môn này. Và để giúp bạn
                hiểu rõ hơn về giống cá này, IKoi xin giới thiệu đến bạn những
                kiến thức nuôi cá Koi cơ bản cho người mới bắt đầu như sau, hãy
                cùng tham khảo nhé!
              </Paragraph>
              <div style={{ textAlign: "center" }}>
                <img src={img1} style={{ width: "50%" }} />
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ color: "#920202", paddingTop: "20px" }}>
              Nguồn gốc cá Koi
            </h2>
            <Paragraph style={{ fontSize: "20px" }}>
              Cá Koi được bắt nguồn từ Nhật Bản, cụ thể tại Niigata mỗi dịp mùa
              đông đến nơi đây thường có lượng tuyết rơi rất dày và mọi thứ đều
              phủ bởi tuyết trắng từ đó các hoạt động nông nghiệp đều bị ngưng
              trệ, do đó tất cả người dân trong vùng đều phải dự trữ lượng lớn
              thức ăn để phục vụ cho cuộc sống nhất là thịt và cá, họ đã tìm
              cách nuôi những chú cá chép trong các kênh rạch và tránh xa vùng
              trồng lúa, và đến mùa Thu họ bắt những chú cá này để muối và chỉ
              chừa lại vài con để duy trì giống nồi đến mùa xuân.
              <br />
              Những chú cá chép này có màu đỏ rất đẹp, và đến tận thế kỷ thứ 19
              một số nông dân Nhật đã bắt đầu tìm hiểu và thực hiện lai tạo để
              hình thành những chú cá chép với nhiều màu sắc đa dạng, từ đó cá
              Koi đã được ra đời và dần lan rộng khắp nước Nhật, và dần dần thú
              nuôi cá Koi đã lan rộng sang các nước khác.
            </Paragraph>
          </div>
          <div>
            <h3 style={{ color: "#920202" }}>Tiêu chuẩn của hồ nuôi cá Koi</h3>
            <Paragraph style={{ fontSize: "20px" }}>
              Cá Koi được bắt nguồn từ Nhật Bản, cụ thể tại Niigata mỗi dịp mùa
              đông đến nơi đây thường có lượng tuyết rơi rất dày và mọi thứ đều
              phủ bởi tuyết trắng từ đó các hoạt động nông nghiệp đều bị ngưng
              trệ, do đó tất cả người dân trong vùng đều phải dự trữ lượng lớn
              thức ăn để phục vụ cho cuộc sống nhất là thịt và cá, họ đã tìm
              cách nuôi những chú cá chép trong các kênh rạch và tránh xa vùng
              trồng lúa, và đến mùa Thu họ bắt những chú cá này để muối và chỉ
              chừa lại vài con để duy trì giống nồi đến mùa xuân.
            </Paragraph>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#920202",
                  }}
                >
                  Bóng mát:{" "}
                </span>
                <br />
                <Paragraph style={{ fontSize: "20px" }}>
                  Xung quang hồ nuôi cá cần có độ phủ bóng ít nhất là 15%, bạn
                  có thể trồng cây xung quang hoặc dùng mái che vì cá Koi phát
                  triển mạnh mẽ ở điều kiện đủ ánh sáng và phải có bóng mát.
                </Paragraph>
              </li>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#920202",
                  }}
                >
                  Hệ thống tạo Oxy:{" "}
                </span>
                <br />
                <Paragraph style={{ fontSize: "20px" }}>
                  Cá Koi chính là loài cá khá đặc biệt vì chúng cần rất nhiều
                  oxy để phát triển tốt, vì vậy bạn cần lắp đặt hệ thống lọc
                  nước hoặc tạo nên sự luân chuyển của dòng nước để nguồn oxy
                  luôn được cung cấp đủ cho cá.
                </Paragraph>
              </li>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#920202",
                  }}
                >
                  Thảm thực vật trong hồ:{" "}
                </span>
                <br />
                <Paragraph style={{ fontSize: "20px" }}>
                  Bạn cần tạo nên một thảm thực vật dưới hồ như rong rêu, đây là
                  những điều rất cần để giúp cá Koi có thể ẩn náo, đặc biệt đó
                  chính là môi trường tự nhiên, những thực vật này cũng tạo nên
                  oxi trong quá trình quan hợp và cũng là nguồn thức ăn để bổ
                  sung dinh dưỡng cho cá Koi.
                </Paragraph>
              </li>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#920202",
                  }}
                >
                  Nguồn thức ăn:{" "}
                </span>
                <br />
                <Paragraph style={{ fontSize: "20px" }}>
                  Cá Koi khi du nhập vào Việt Nam đa phần chúng ta chỉ sử dụng
                  cám làm thức ăn chính cho cá vì đây là nguồn thức ăn khá phổ
                  biến và rất dễ tìm mua, mỗi ngày bạn chỉ nên cho ăn 2 lần với
                  một lượng vừa phải, không nên ăn quá nhiều, tùy vào mật độ
                  hoặc tình trạng của cá mà bạn cho ăn với lượng thức ăn phù
                  hợp. Thức ăn dư có thể làm ô nhiễm nguồn nước và gây bệnh cho
                  cá Koi.
                </Paragraph>
              </li>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#920202",
                  }}
                >
                  Yếu tố mật độ:{" "}
                </span>
                <br />
                <Paragraph style={{ fontSize: "20px" }}>
                  Cá Koi thường di chuyển theo đàn nên nhìn rất đẹp mắt do đó
                  chúng ta cần chú trọng đến yếu tố mật độ, không nên nuôi quá
                  nhiều cá trong không gian hồ quá hẹp điều này sẽ dẫn đến cá sẽ
                  rất khó phát triển hoặc phát triển không đồng đều, bên cạnh đó
                  lượng oxy không đủ sẽ gây nên cá dễ bị nhiễm bệnh hoặc tình
                  trạng sức khỏe yếu. Lượng phân thải ra cũng sẽ nhiều và gây ô
                  nhiễm nguồn nước. Nên để khối lượng nước khoảng 1000 lít để
                  giúp cá phát triển tốt. Tuổi thọ của cá Koi có thể lên đến 100
                  tuổi nếu chúng được chăm sóc đúng cách.
                </Paragraph>
              </li>
            </ul>
          </div>
        </Container>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
