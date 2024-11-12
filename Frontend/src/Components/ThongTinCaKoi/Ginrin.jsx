import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import axios from "axios";
import CardGrid from "../Cardgrid";
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import "../Css/koiStyle.css";
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-Ginrin/Cá koi Ginrin Showa 4.jpg";
import img2 from "../../assets/Koi-Ginrin/ginrin-asagi.jpg";
import img3 from "../../assets/img_4.png";
import img4 from "../../assets/img_5.png";
export default function Ginrin() {
  const [menu, setMenu] = useState("home");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idGinrin, setIDGinrin] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const handleScroll1 = () => {
    const element = document.getElementById("1");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll2 = () => {
    const element = document.getElementById("2");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll3 = () => {
    const element = document.getElementById("3");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll4 = () => {
    const element = document.getElementById("4");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll5 = () => {
    const element = document.getElementById("5");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll6 = () => {
    const element = document.getElementById("6");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll7 = () => {
    const element = document.getElementById("7");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getAllKoi");
        console.log("Data received from API:", response.data); // Kiểm tra dữ liệu
        if (Array.isArray(response.data.result)) {
          setCardData(response.data.result); // Lấy mảng từ thuộc tính 'result'
          setCategoryData(response.data.categoryList);
          console.log("Card data set successfully:", response.data.result); // Kiểm tra sau khi set
          console.log(
            "Category Data set successfully:",
            response.data.cateogryList
          );
        } else {
          console.error("Dữ liệu không phải là mảng:", response.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err); // Ghi lại lỗi
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const ginrinCard = categoryData.find(
      (card) => card.CategoryName === "Ginrin"
    );

    if (ginrinCard) {
      setIDGinrin(ginrinCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idGinrin) {
      const filtered = cardData.filter((card) => card.CategoryID === idGinrin);
      setFilteredCards(filtered);
    }
  }, [idGinrin, cardData]);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" /> {/* You can adjust the size if needed */}
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Layout style={{ backgroundColor: "whitesmoke" }}>
        <Container>
          <div>
            <div>
              <div
                className="body_StyleKoiOfPage"
                style={{ backgroundColor: "#ead8c8" }}
              >
                <Title
                  level={2}
                  style={{ color: "#920202", backgroundColor: "#ead8c8" }}
                >
                  Nội Dung Bài Viết
                </Title>
                <ul
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#ead8c8",
                    paddingTop: "10px",
                    textDecoration: "none",
                    listStyleType: "none",
                  }}
                >
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll1}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      1. Giới thiệu về cá Koi Ginrin
                    </span>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll2}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      2. Cách nhận biết cá Koi Ginrin
                    </span>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll3}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      3. Cách chọn mua cá Koi Ginrin
                    </span>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll4}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      4. Cách chăm sóc Koi Ginrin
                    </span>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll5}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      5. Giá cá koi Ginrin bao nhiêu?
                    </span>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll6}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      6. Tại sao nên mua cá Koi Ginrin tại IKoi
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="noidungchitiet" style={{ paddingTop: "20px" }}>
                  Nội dung chi tiết
                </h2>
                <Paragraph className="paragraph-Style ">
                  Cá Koi Ginrin nổi bật với chiếc vảy phản chiếu màu bạc lấp
                  lánh thu hút người chơi ngay lần đầu tiên. Bài viết này chúng
                  ta sẽ đi khám phá các đặc điểm nổi bật và địa chỉ cung cấp cá
                  Koi Ginrin chất lượng giúp bạn chọn mua được chú cá khỏe mạnh,
                  đẹp nhất.
                </Paragraph>
              </div>
              <div id="1">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  1. Giới thiệu về cá Koi Ginrin
                </h3>
                <Paragraph className="paragraph-Style ">
                  Cá Koi Ginrin có nguồn gốc chủ yếu từ Nhật Bản và được lai tạo
                  bởi một nhà bác học tên Eizaburo Hoshino vào khoảng năm 1929.
                  Nhà lai tạo Hoshino gặp một ngư dân đã bắt được một con Magoi
                  koi có vảy lấp lánh tuyệt vời. Vì thế mà ông Hoshino đã quyết
                  định sử dụng loài cá này làm nền tảng để lai tạo và nghiên cứu
                  nên loài Koi Ginrin. Sau quá trình nghiên cứu khoa học việc có
                  hiệu ứng lấp lánh trên thân Koi Ginrin chính là nhờ nhiễm sắc
                  thể guanine. cá Koi Ginrin
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                  <p style={{ fontSize: "15px", fontWeight: "400" }}>
                    Hình ảnh cá Koi Ginrin
                  </p>
                </div>
              </div>

              <div id="2">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2.Cách nhận biết cá Koi Ginrin
                </h3>
                <div>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Text className="text-Style">
                        Koi Ginrin size 15 – 45
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Kích thước hồ cá tối thiểu: 1000 gallon
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Mức độ chăm sóc: Dễ dàng
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Tính cách: Hòa bình</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Kích thước tối đa: 90 cm
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Màu sắc: Vảy ánh Kim</Text>
                    </li>
                    <li>
                      <Text className="text-Style">Chế độ ăn: Ăn tạp</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Chất lượng: Đẹp xuất sắc với ánh bạc sáng lấp lánh
                      </Text>
                    </li>
                  </ul>
                  <div>
                    <Paragraph className="paragraph-Style">
                      Đặc điểm dễ nhận biết nhất của cá Koi Ginrin là màu sắc
                      lấp lánh ánh bạc trên thân và được bao phủ bởi sắc tố đỏ
                      Hi. Các vảy Ginrin thường ở phần đầu hoặc phần vai tiếp
                      tục đến gốc đuôi và hàng vảy này được sắp xếp gọn gàng.
                      Dòng Koi Ginrin này có hiệu ứng lấp lánh trên thân mạnh
                      nhất khi còn nhỏ và mất dần khi cá Koi này già đi. Một con
                      cá Ginrin sẽ phải có ít nhật 2 hàng hoàn chỉnh hoặc tối đa
                      là 3 hàng trở lên để có thể được coi là Koi Ginrin.
                    </Paragraph>
                  </div>
                </div>
              </div>
              <div id="3">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  3. Cách chọn mua cá Koi Ginrin
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Với sự lấp lánh kiêu sa của những chú cá Koi Ginrin đẹp mắt
                    chắc chắn sẽ mang đến cho không gian sống, làm việc của bạn
                    trở nên hấp dẫn hơn. Theo quan niệm phong thủy, sở hữu cho
                    mình những hồ cá Koi Ginrin hay cá koi karashi sẽ giúp gia
                    chủ có sự may mắn, hạnh phúc và phát triển hơn trong cuộc
                    sống và sự nghiệp.
                  </Paragraph>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img src={img2} style={{ width: "30%" }} />
                  <div>
                    <Text className="text-Style">KOI GINRIN</Text>
                  </div>
                </div>
                <div>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Không nên chọn kích thước cá lớn bởi không phải gia đình
                        nào cũng có bể cá Koi phù hợp để cá phát triển tốt nhất.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Chọn cá có mắc hoa văn rõ ràng, vây không xỉn màu, sắc
                        nét vì Koi Ginrin thuần chủng có sức sống tốt.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hạn chế chọn cá có cơ thể bị trầy xước, không cân đối
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nên chọn cá Koi Ginrin có dáng bơi tròn, uyển chuyển,
                        uốn lượn đẹp mắt.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Vảy cá Ginrin sẽ bắt đầu ở vai hoặc đầu sau đó kéo dài
                        đến đuôi và ở hai bên da lưng với tỉ lệ hàng vẩy gọn
                        gàng. Nếu là vảy Koi Ginrin sẽ bao phủ bởi sắc tố đỏ,
                        trên thân Koi xuất hiện mảng lấp lánh màu vàng được gọi
                        là Kin Ginrin. Còn vảy Koi Ginrin bao phủ bởi sắc tố đen
                        hoặc trắng còn thân Koi xuất hiện mảng lấp lánh ánh màu
                        bạc thì gọi là Ginrin.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="4">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  4. Cách chăm sóc Koi Ginrin
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Để chăm sóc cá Koi Ginrin phát triển khỏe mạnh và toàn diện
                    nhất thì bạn cần phải chú ý đến các yếu tố xung quanh sau:
                  </Paragraph>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Dù là dòng cá ăn tạp nhưng cần có chế độ ăn uống phù
                        hợp, chia ra làm các bữa nhỏ, hạn chế để cá ăn quá no.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Môi trường nước hơi kiềm, có độ pH từ 7.2 – 7.3 và yêu
                        cầu lượng oxy hòa tan cao nên bạn cần bơm sục khí thường
                        xuyên.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nhiệt độ thích hợp để cá sinh trưởng và phát triển là từ
                        20 – 25 độ C còn mùa đông nếu nhiệt độ quá lạnh thì nên
                        giảm lượng thức ăn đi.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Thiết kế hồ cá Koi có diện tích phù hợp theo tập tính
                        thích nghi của cá. Thường xuyên vệ sinh, giữ hồ nước
                        sạch, nhiệt độ thích hợp.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Ở hồ cá Koi Ginrin không nên trồng cây thủy sinh vì Koi
                        có thói quen đào thức ăn gây ra ô nhiễm nguồn nước.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hồ cá Koi cũng phải có đầy đủ hệ thống lọc, hút đáy, tạo
                        đồng, hệ thống oxy,.. để giúp tạo nguồn nước sạch, cá
                        sinh trưởng tốt.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Thường xuyên theo dõi bể cá để dễ dàng phát hiện cá lười
                        ăn, bơi chậm phải cách ly ngay sang một bể cá khác đã
                        chuẩn bị sẵn. Nếu bạn không có kinh nghiệm xử lý thì
                        liên hệ với những đơn vị chuyên cung cấp các dịch vụ cá
                        Koi để được hỗ trợ và xử lý sớm nhất.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </div>

              <div id="5">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  5. Giá cá koi Ginrin bao nhiêu?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Hiện tại IKoi đang cung cấp dòng cá koi Ginrin chuẩn từ cá
                    nhật đến cá F1 với giá cực kỳ ưu đãi. Có thể nói Siêu thị Cá
                    Koi VN là một trong những đơn vị cung cấp cá koi với giá rẻ
                    nhất thị trường, mà chất lượng cũng rất đảm bảo. Giá cá koi
                    nhật và f1 như sau
                    <br />
                    Một con cá Koi trưởng thành Nhật Bản như Ginrin Chagoi,
                    Kohaku, Utsuri với kích thước từ 15cm – 25cm sẽ có giá từ
                    1.200.000 – 4.500.000 VNĐ/con.
                    <br />
                    Ngoài ra các dòng cá koi Ginrin Showa, Sanke, Asagi, Benigoi
                    có kích thước lớn từ 25-30 cm sẽ có giá dao động từ
                    2.200.000 – 6.500.000 VNĐ/con.
                  </Paragraph>
                </div>
              </div>
              <div id="6">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  6.Tại sao nên mua cá Koi Ginrin tại IKoi
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Nhu cầu chơi cá Koi ngày càng nhiều trên thị trường, để chọn
                    mua được cá Koi Ginrin khỏe, đẹp là điều không hề dễ dàng.
                    Bởi vì nếu bạn không phải là người “sành ” về dòng cá này sẽ
                    rất dễ mua phải cá kém chất lượng. Một địa chỉ uy tín cho
                    bạn lựa chọn chính là IKoi. Đơn vị với nhiều năm kinh nghiệm
                    trong lĩnh vực thiết kế và cung cấp cá Koi chính hãng cho
                    người tiêu dùng.
                    <br />
                    Với đa dạng các mẫu cá Koi đẹp, giá thành tốt, đội ngũ tư
                    vấn nhiệt tình đây sẽ là địa chỉ tốt nhất cho bạn khi có nhu
                    cầu mua cá Koi. Nếu bạn cần tư vấn mua cá Koi Ginrin hãy
                    liên hệ ngay với IKoi để được hỗ trợ nhanh chóng.
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <img src={img3} />
            </div>
            <div style={{ objectFit: "cover", width: "100%" }}>
              <img src={img4} />
            </div>
          </div>
        </Container>

        <div>
          {filteredCards && filteredCards.length > 0 ? (
            <CardGrid cardData={filteredCards} />
          ) : (
            <p></p> // Replace with any message or component you want to show
          )}
        </div>
      </Layout>
    </>
  );
}
