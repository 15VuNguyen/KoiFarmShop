import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Layout, Typography } from "antd";
const { Paragraph } = Typography;
export default function Gioithieu() {
  const [menu, setMenu] = useState("home");
  return (
    <>
      <Layout>
        <Navbar menu={menu} setMenu={setMenu} />
        <Container>
          <div>
            <div>
              <h1
                style={{
                  paddingTop: "100px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Giới Thiệu Về IKoi
              </h1>
              <hr />
            </div>

            <div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "75%" }}>
                  <img
                    src="src/assets/Japanese-koi-garden.jpg"
                    style={{
                      width: "100%",
                      paddingLeft: "10px",
                      marginTop: "50px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    paddingLeft: "20px",
                    marginTop: "50px",
                  }}
                >
                  <h2 style={{ color: "red" }}>IKoi</h2>
                  <hr />
                  <Paragraph style={{ fontSize: "20px" }}>
                    Koi là một loại cá chép đã được thuần hóa, lai tạo và được
                    nuôi khá phổ biến tại Nhật Bản để làm cảnh. Bên cạnh vẻ đẹp
                    mê hồn, Koi còn được biết đến là một loại cá phong thủy cực
                    tốt, luôn mang lại may mắn cho người chơi. IKoi chuyên cung
                    cấp cho khách hàng trên cả nước các loại cá Koi chất lượng
                    tốt với giá thành ưu đãi nhất.
                  </Paragraph>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Với nhiều năm kinh nghiệm và tầm cỡ phát triển, IKoiliên kết
                    với các trang trại nổi tiếng của Nhật Bản như Marusei,
                    Dainichi Koi Farm, Marudo Koi Farm, Takeda Koi Farm , Koi
                    Farm Saka… để trực tiếp lựa lọc ra những chú cá Koi chất
                    lượng với đa dạng chủng loại, kích thước nhập khẩu về Việt
                    Nam theo nhu cầu của khách hàng.
                  </Paragraph>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "100px" }}>
              <Paragraph style={{ fontSize: "20px" }}>
                Sở hữu nguồn hàng chất lượng và ổn định, cùng dịch vụ chăm sóc
                tận tâm, chúng tôi tin: IKoi đáp ứng được yêu cầu của những vị
                khách khó tính nhất trong làng cá Koi nước ta.
              </Paragraph>
              <ul>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Ngoài ra, chúng tôi còn cung cấp dịch vụ chăm sóc sân vườn,
                    hồ cá Koi trọn gói dành cho các khách hàng có nhu cầu, các
                    biệt thự, cao ốc, văn phòng, nhà hàng, quán cà phê, khách
                    sạn …
                  </Paragraph>
                </li>
                <li>
                  {" "}
                  <Paragraph style={{ fontSize: "20px" }}>
                    Với đội ngũ nghệ nhân và nhân viên lành nghề, giàu kinh
                    nghiệm trong lĩnh vực thiết kế và thi công sân vườn, hồ cá
                    Koi, Hồ sinh thái, Thủy cung, tiểu cảnh, hòn non bộ, tranh
                    đá, phù điêu…sẽ đáp ứng các nhu cầu trên cho quý khách với
                    mức giá hợp lí nhất.
                  </Paragraph>
                </li>
                <li>
                  {" "}
                  <Paragraph style={{ fontSize: "20px" }}>
                    Đến với chúng tôi, quý khách sẽ được các nhân viên dày dặn
                    kinh nghiệm tư vấn miễn phí.
                  </Paragraph>
                </li>
                <li>
                  {" "}
                  <Paragraph style={{ fontSize: "20px" }}>
                    Các sản phẩm và dịch vụ của chúng tôi có bảo hành và quý
                    khách sẽ được hướng dẫn cách chăm sóc.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    uý khách chỉ cần goi điện thoại sẽ có nhân viên đến tận nhà
                    tư vấn, đo đạc và báo giá.
                  </Paragraph>
                </li>
              </ul>
            </div>
            <div>
              <h4>Sản phẩm đa dạng:</h4>
              <ul>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Chuyên cung cấp phụ kiện cho hồ cá Koi, thiết bị lọc hồ Koi
                    và các hệ thống xử lý nước các hồ cá Koi lớn trên 24m3 nước
                    ao. Thùng lọc ao Koi lớn từ các nhãn hàng cao cấp Sera của
                    Đức, SICCE của Ý hay BOYU của Đài Loan.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Vật liệu lọc nước hồ cá Koi, cá chép Nhật, giúp hệ thống lọc
                    có một chu trình xử lý nước sinh học hoàn thiện với các vật
                    liệu lọc: chổi lọc, bùi nhùi, sứ thanh, nham thạch… và các
                    sản phẩm chăm sóc nước cho Hồ cá Koi khác.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Vấn đề tảo xanh trong ao Koi luôn làm đau đầu người nuôi cá
                    Koi. Tảo gây mất mỹ quan hồ koi, làm đục nước hạn chế tầm
                    nhìn, gây thiếu hụt Oxy nặng trong hồ Koi. Vì thế, bạn có
                    thể sử dụng đèn UV-C hay dung dịch vi sinh diệt tảo mà không
                    hề có hại cho cá Koi hay người dùng, để xử lý tảo một cách
                    hiệu quả.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph style={{ fontSize: "20px" }}>
                    Vấn đề tảo xanh trong ao Koi luôn làm đau đầu người nuôi cá
                    Koi. Tảo gây mất mỹ quan hồ koi, làm đục nước hạn chế tầm
                    nhìn, gây thiếu hụt Oxy nặng trong hồ Koi. Vì thế, bạn có
                    thể sử dụng đèn UV-C hay dung dịch vi sinh diệt tảo mà không
                    hề có hại cho cá Koi hay người dùng, để xử lý tảo một cách
                    hiệu quả.
                  </Paragraph>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <Footer />
      </Layout>
    </>
  );
}
