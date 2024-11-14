import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import "../Css/koiStyle.css";
import { Layout, Typography } from "antd";
const { Text, Paragraph, Title } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-Ogon/ca-koi-platinum-3.webp";
import img2 from "../../assets/Koi-Ogon-1/bo-5.jpg";
import img3 from "../../assets/Koi-Ogon-1/image14-1661495518-730-width801height889.jpg";
import img4 from "../../assets/Koi-Ogon-1/image14-1661495518-730-width801height889.jpg";
import img5 from "../../assets/Koi-Ogon-1/img_0095.png";
import img6 from "../../assets/Koi-Ogon-1/hi-ogon.jpg";
import img7 from "../../assets/Koi-Ogon-1/orenji-ogon.jpg";
import img8 from "../../assets/Koi-Ogon-1/mukashi-ogon.webp";
import img9 from "../../assets/Koi-Ogon-1/nezu-ogon.jpg";
import img10 from "../../assets/img_4.png";
export default function Ogon() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idOgon, setIDOgon] = useState(null);
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
  const handleScroll31 = () => {
    const element = document.getElementById("31");

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
  const handleScroll32 = () => {
    const element = document.getElementById("32");

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

  const handleScroll33 = () => {
    const element = document.getElementById("33");

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
  const handleScroll34 = () => {
    const element = document.getElementById("34");

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
  const handleScroll35 = () => {
    const element = document.getElementById("35");

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
  const handleScroll36 = () => {
    const element = document.getElementById("36");

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
            response.data.categoryList
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
    const ogonCard = categoryData.find((card) => card.CategoryName === "Ogon");
    if (ogonCard) {
      setIDOgon(ogonCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idOgon) {
      const filtered = cardData.filter((card) => card.CategoryID === idOgon);
      setFilteredCards(filtered);
    }
  }, [idOgon, cardData]);
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
      <Layout>
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
                      1. Nguồn gốc lịch sử của giống cá Koi Ogon
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
                      2. Đặc điểm của Koi ogon
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
                      3. Những dòng cá Koi ogon phổ biến hiện nay
                    </span>
                    <ul style={{ listStyleType: "none" }}>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll31}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.1 Giá cá Koi Ogon F1
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll32}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.2 Giá cá Koi Ogon Nhật chuẩn
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll33}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.3 Cá Koi Hi Ogon
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll34}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.4 Cá Koi Orenji Ogon
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll35}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.5 Cá Koi Mukashi Ogon
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll36}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                          s
                        >
                          3.6 Cá Nezu Ogon Koi
                        </span>
                      </li>
                    </ul>
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
                      4. Cách nuôi cá Koi ogon khỏe mạnh, phát triển tốt
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
                      5. Địa chỉ bán cá Koi Ogon đẹp, uy tín
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2
                  className="noidungchitiet"
                  style={{ color: "red", paddingTop: "20px" }}
                >
                  Nội dung chi tiết
                </h2>
                <div style={{ fontSize: "15px", fontWeight: "400" }}>
                  <Paragraph
                    className="paragraph-Style"
                    style={{ color: "black" }}
                  >
                    <span className="span-Style" style={{ color: "blue" }}>
                      Koi Ogon
                    </span>{" "}
                    là dòng cá Koi được yêu thích nhất trên thế giới. Với vẻ
                    ngoài lấp lánh tạo ra vẻ sang trọng cho không gian nuôi cá
                    Koi. Hãy cùng chúng tôi tìm hiểu thông tin cụ thể về dòng cá
                    này nhé!
                  </Paragraph>
                </div>
              </div>
              <div id="1">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  {" "}
                  1. Nguồn gốc lịch sử của giống cá Koi Ogon
                </h3>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                  <Paragraph
                    className="paragraph-Style"
                    style={{ color: "#efa709" }}
                  >
                    Giới thiệu về cá Koi Ogon
                  </Paragraph>
                </div>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "black" }}
                >
                  Koi Ogon có lịch sử từ 90 năm trước, ông Sawata Aoki tại Nhật
                  Bản đã có ý tưởng lai tạo một giống cá Koi đặc biệt. Có thể
                  nói sự xuất hiện của cá Koi Ogon gắn liền với lịch sử khai
                  sinh cá Koi. Từ lúc còn nhỏ, ông nghe nói có cậu bé tìm được 1
                  chú cá chép hoang với vẻ bề ngoài rất kì lạ, có 1 sọc vàng
                  trên lưng, ông đã lặn lội đường xa tìm đến thuyết phục cậu bé
                  bán cho ông chú cá cảnh.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img2} />
                  <Paragraph
                    className="paragraph-Style"
                    style={{ color: "#efa709" }}
                  >
                    Nguồn gốc lịch sử của giống cá Koi Ogon
                  </Paragraph>
                </div>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "black" }}
                >
                  Đây cũng là lúc hành trình nuôi cá của ông bắt đầu, ông đã
                  nuôi dưỡng chú cá suốt 25 năm, trong suốt khoảng thời gian này
                  ông đã quan sát, theo dõi từng giai đoạn cá đẻ trứng, nhân đàn
                  và kiên nhẫn lai tạo nhằm tìm ra những đặc tính ở 1 chú cá mà
                  ông mong ước. Cho đến năm 1946, ông đã lai tạo thành công chú
                  cá Koi Yamabuki Ogon với màu vàng đặc trưng, chú cá Koi được
                  mệnh danh là ông tiên của dòng cá Koi Ogon.
                </Paragraph>
              </div>

              <div id="2">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2.Đặc điểm của Koi ogon
                </h3>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "black" }}
                >
                  Cá Koi Ogon được coi là một trong những giống cá Koi đẹp nhất
                  và độc đáo nhất trên trái đất với ngoại hình đặc trưng là màu
                  vàng óng ánh rực rỡ. Tên gọi Ogon được lấy theo từ tiếng Nhật,
                  có nghĩa là vàng, nhằm vinh danh cho sắc màu đặc trưng của
                  giống cá này.
                  <br />
                  Màu sắc của Koi Ogon là một điểm nhấn cực kỳ ấn tượng, chúng
                  có màu vàng sáng, chúng thường được tô điểm bằng một vài chấm
                  đen hoặc những đường nét đen trên thân. Một số loại Koi Ogon
                  khác có màu cam hoặc trắng. Tuy nhiên, màu sắc của chúng có
                  thể thay đổi theo mùa và phụ thuộc vào điều kiện môi trường
                  xung quanh. Ví dụ, nếu chúng được nuôi dưỡng trong môi trường
                  lạnh, màu sắc của chúng sẽ trở nên nhạt đi.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img3} style={{ width: "50%" }} />
                  <Paragraph
                    className="paragraph-Style"
                    style={{ color: "#efa709" }}
                  >
                    Đặc điểm của Koi ogon
                  </Paragraph>
                </div>
                <Paragraph
                  className="paragraph-Style"
                  style={{ color: "black" }}
                >
                  Ngoài màu sắc rực rỡ, Koi Ogon cũng được yêu thích bởi vẻ đẹp
                  tinh tế, sang trọng và thon gọn của chúng. Thân cá Koi Ogon
                  cũng có hình dạng khá dài, chúng có đầu tròn và mắt lớn, đuôi
                  và vây rất rộng và phẳng. Một số loài Koi Ogon cũng có đuôi
                  dạng hình tam giác, tạo nên sự khác biệt về ngoại hình so với
                  các giống cá Koi khác.
                  <br />
                  Koi Ogon có bản tính hiền hoà và thân thiện, chúng ưa sống
                  trong những hồ nước ngọt và thường được chăm sóc như một loài
                  cá cảnh trong các khu vườn và sân vườn. Tuy nhiên, việc chăm
                  sóc Koi Ogon cần có kiến thức và sự chăm sóc kỹ càng. Việc tạo
                  dựng môi trường sống lý tưởng cho cá đòi hỏi hiểu biết về chăm
                  sóc cá cảnh cũng như tập tính sống của cá.
                </Paragraph>
              </div>
              <div id="3">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  3. Những dòng cá Koi ogon phổ biến hiện nay
                </h3>
                <ul>
                  <li>
                    <span
                      className="span-Style"
                      id="31"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.1 Cá Koi Platinum Ogon
                    </span>
                    <br />
                    <Paragraph
                      className="paragraph-Style"
                      style={{ color: "black" }}
                    >
                      Cá Koi Platinum Ogon là một trong những dòng cá Koi Ogon
                      đẹp và đặc biệt nhất với màu trắng bạc sang trọng. Loại cá
                      Koi này được tạo ra từ sự pha trộn giữa các dòng Koi Ogon
                      khác nhau, tạo nên một loài cá có màu sắc đa dạng và độc
                      đáo.
                      <br />
                      Với bề ngoài thanh lịch và trang nhã, Platinum Ogon được
                      yêu thích vì sự tinh tế của nó. Thân cá Koi Platinum Ogon
                      có màu trắng bạc óng ánh vô cùng đẹp mắt, tạo nên một vẻ
                      ngoài tinh khôi, thanh tao và đẹp mắt. Chúng có thân hình
                      thon gọn và đầu nhỏ, vây và đuôi rộng và dài, tạo thành
                      một hình dáng hoàn hảo và thanh lịch.Điểm nhấn nổi bật của
                      loài cá này là màu sắc trắng bạc đa dạng và tinh tế, tạo
                      nên một sự độc đáo và quyến rũ. Một số loài Platinum Ogon
                      có thể có màu sắc pha trộn với màu vàng hoặc cam, tạo nên
                      sự sang trọng và quý phái đến từng tiểu tiết.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={img4}
                        style={{ width: "30%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ textAlign: "center", color: "#efa709" }}>
                      <Text
                        className="text-Style "
                        style={{ color: "#efa709" }}
                      >
                        KOI PLATINUM OGON
                      </Text>
                    </div>
                  </li>
                  <li>
                    <span
                      className="span-Style"
                      id="32"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.2 Cá Koi Yamabuki Ogon
                    </span>
                    <br />
                    <Paragraph
                      className="paragraph-Style"
                      style={{ color: "black" }}
                    >
                      Cá Koi Yamabuki Ogon là một trong những giống cá Koi Ogon
                      phổ biến và được ưa chuộng trên khắp thế giới. Đây là một
                      dòng cá có màu vàng kim rực rỡ với những đặc trưng màu sắc
                      rất rõ nét và không thể nào bị nhầm lẫn được. Đây là một
                      trong những loại cá Koi không có khuyết điểm về màu sắc.
                      <br />
                      Yamabuki Ogon có màu vàng đậm trên lưng cá, được phối hợp
                      với các chấm đen hoặc sọc đen trên lưng. Màu vàng của
                      Yamabuki Ogon được xem là đặc trưng của loài cá này và tạo
                      nên sự nổi bật và rực rỡ cho màu sắc của chúng. Vây và
                      đuôi của Yamabuki Ogon đều có màu vàng nhạt, tạo thành một
                      sự phối hợp màu sắc hài hoà và đẹp mắt.
                      <br />
                      Yamabuki Ogon có kích thước tối đa khoảng 1 mét và tuổi
                      thọ của chúng vào khoảng 35 năm. Là một dòng cá Koi có
                      tính tình vô cùng hiền hoà và thân thiện. Chúng cũng rất
                      dễ nuôi, có thể sinh sống trong các bể cá ở nhiều điều
                      kiện khác nhau và không có quá nhiều yêu cầu về nước.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={img5}
                        style={{ width: "30%", objectFit: "cover" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text
                          className="text-Style"
                          style={{ color: "#efa709" }}
                        >
                          KOI YAMABUIKI OGON
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li>
                    <span
                      className="span-Style"
                      id="33"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.3 Cá Koi Hi Ogon
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Cá Koi Hi Ogon là một trong những giống cá Koi được yêu
                      thích trên toàn thế giới với màu sắc chủ đạo là màu đỏ
                      tươi. Tuy nhiên, nhiều người mới tập chơi cá hay gặp phải
                      nhầm lẫn giữa Hi Ogon và Orenji Ogon – một giống cá Koi
                      khác cũng có màu đỏ. Tuy nhiên, Hi Ogon có màu đỏ thắm,
                      đậm hơn và phần đuôi cũng có màu sắc đậm hơn so với phần
                      thân.
                      <br />
                      Tuy nhiên, khi được nuôi dưỡng đúng cách, cá Koi Hi Ogon
                      có thể phát triển và tồn tại lâu dài, chúng có thể duy trì
                      tuổi thọ lên tới 25-35 năm. Các triển lãm cá cảnh và cuộc
                      thi cá Koi cũng thường trưng bày những con cá Koi Hi Ogon
                      đẹp nhất để khán giả chiêm ngưỡng và thưởng thức.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img6} style={{ width: "50%" }} />
                      <div style={{ textAlign: "center" }}>
                        <Text
                          className="text-Style"
                          style={{ color: "#efa709" }}
                        >
                          KOI HI OGON{" "}
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li>
                    <span
                      className="span-Style"
                      id="34"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.4 Cá Koi Orenji Ogon
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Cá Koi Orenji Ogon là một trong những dòng cá Koi được yêu
                      thích nhất với màu sắc chủ đạo là cam. Thân cá của chúng
                      có vảy rồng óng ánh, tạo nên một vẻ ngoài vô cùng bắt mắt.
                      Phần vây đuôi và vây lưng của cá đều có màu tuyết trắng
                      giống với Yamabuki Ogon Koi, góp phần tạo thành một kết
                      cấu thân cá hoàn hảo.
                      <br />
                      Việc nuôi cá Koi Orenji Ogon cần có kiến thức và kinh
                      nghiệm để giám sát và quản lý hồ cá để đảm bảo chất lượng
                      và sự tăng trưởng tối ưu nhất cho chúng. Nước trong hồ
                      nuôi cần được kiểm soát chặt chẽ độ pH, độ kiềm và nhiệt
                      độ thích hợp, cũng như nguồn thức ăn chất lượng cao để đảm
                      bảo nhu cầu phát triển của cá.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img7} />
                      <div style={{ textAlign: "center" }}>
                        <Text
                          className="text-Style"
                          style={{ color: "#efa709" }}
                        >
                          KOI ORENJI OGON{" "}
                        </Text>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      className="span-Style"
                      id="35"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.5 Cá Koi Mukashi Ogon
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Cá Koi Mukashi Ogon là một trong những dòng cá Koi có lịch
                      sử lai tạo lâu đời và được yêu thích vì nét đẹp cổ xưa,
                      độc đáo của chúng. Mukashi Ogon có nghĩa là vàng xưa, bởi
                      vì chúng có màu sắc vàng tươi và được coi như một biểu
                      tượng của sự thịnh vượng và may mắn theo văn hóa Nhật Bản.
                      <br />
                      Thân cá của Mukashi Ogon có màu vàng tươi đặc trưng, tuy
                      vậy, màu sắc lại không đồng đều trên cơ thể cá. Thường có
                      một hoặc hai vết trắng ở phần đầu của thân, tạo thành một
                      vẻ đẹp khác biệt và độc đáo. Ngoài ra, các vây của chú cá
                      cũng có màu vàng tươi, tạo nên sự đồng điệu với thân cá.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img8} style={{ width: "30%" }} />
                      <div>
                        <Text
                          className="text-Style"
                          style={{ color: "#efa709" }}
                        >
                          KOI MUKASHI OGON{" "}
                        </Text>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      className="span-Style"
                      id="36"
                      style={{
                        color: "rgb(146, 2, 2)",
                      }}
                    >
                      3.6 Nezu Ogon Koi
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Cá Koi Nezu Ogon là một trong những dòng cá Koi được yêu
                      thích với màu sắc độc đáo và khác lạ. Nezu có nghĩa là
                      chuột đồng, vì vậy tên của chú cá được đặt theo hình dáng
                      và màu sắc của mình, giống như một chú chuột đồng.
                      <br />
                      Thân cá của Nezu Ogon có màu bạc nhạt đặc trưng, phần lớn
                      thân cá được bao phủ bằng các vảy trắng long lanh tựa như
                      phấn trắng, tạo nên một vẻ đẹp sang trọng và khác lạ. Một
                      số vảy có thể có màu đen hoặc nâu, tạo nên một sự đồng
                      điệu và khác biệt đối với chú cá.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img9} style={{ width: "30%" }} />
                      <div>
                        <Text
                          className="text-Style"
                          style={{ color: "#efa709" }}
                        >
                          KOI NEZU OGON{" "}
                        </Text>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="4">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  4. Cách nuôi cá Koi ogon khỏe mạnh, phát triển tốt
                </h3>
                <Paragraph className="paragraph-Style">
                  Sau đây là cách nuôi cá Koi Ogon phát triển khỏe mạnh:
                </Paragraph>
                <Paragraph className="paragraph-Style">
                  Chọn hồ nuôi phù hợp
                </Paragraph>
                <ul>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Về diện tích, hồ nuôi tối thiểu cần có diện tích 4-5m2 và
                      độ sâu khoảng 1,2 đến 1,5 m.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Về vật liệu, hồ nuôi cá Koi Ogon nên được xây bằng bê tông
                      hoặc nhựa PVC. Bề mặt hồ cần được phủ lớp chất tạo màu
                      nhằm đảm bảo sạch sẽ và ngăn chặn sự tăng trưởng của tảo
                      và vi khuẩn.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Cần lựa chọn đúng hình thức bơi lội cho cá Koi Ogon, bao
                      gồm bơi lội tại mặt nước và bơi lội tại lòng hồ.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Trang bị các hệ thống lọc nước phù hợp, giúp nước luôn
                      sạch sẽ và cân đối dinh dưỡng.
                    </Paragraph>
                  </li>
                </ul>
                <Paragraph className="paragraph-Style">
                  Đảm bảo chất lượng nước
                </Paragraph>
                <ul>
                  <li>
                    <Paragraph className="paragraph-Style">
                      pH: Khoảng pH lý tưởng đối với cá Koi Ogon là 7.2-7.6. Nếu
                      pH quá cao hoặc quá thấp, sẽ ảnh hưởng đến chất lượng của
                      cá và khiến cho chúng dễ mắc bệnh.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Ammonia: Ammonia là một chất độc hại đối với cá Koi Ogon,
                      có thể gây ra tổn thương gan và các bệnh đường hô hấp. Nên
                      kiểm tra nồng độ ammonia trong nước định kỳ và thay đổi
                      nước định kỳ để ngăn chặn sự tích tụ của amoniac.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Nitrat và Nitrit: Những chất này có thể gây ngộ độc ở cá
                      nếu nồng độ quá cao. Kiểm tra định kỳ và xử lý nước định
                      kỳ nhằm hạn chế sự tích tụ của chúng.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Oxy: Nếu nồng độ oxy trong nước quá thấp, cá sẽ bị stress
                      và dễ mắc các bệnh liên quan đến hô hấp. Để đảm bảo nồng
                      độ oxy đủ, bạn có thể sử dụng máy bơm oxy hoặc đổ nước vào
                      bể nhằm tăng cường hàm lượng oxy trong nước.
                    </Paragraph>
                  </li>
                </ul>
                <Text className="text-Style">Thức ăn</Text>
                <ul style={{ fontWeight: "400", fontSize: "15px" }}>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Thức ăn viên: được sản xuất từ các nguyên liệu thiên nhiên
                      như rong biển, tôm, cá hú, cá diếc, . .. Thức ăn viên có
                      kích cỡ khác nhau tuỳ thuộc vào kích thước cá Koi Ogon.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Thức ăn nuôi: cá Koi Ogon cũng có thể ăn các loại thức ăn
                      nuôi như dế, trùn, tôm, cá, . ..
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Thức ăn tự làm: nuôi cá Koi Ogon cũng có thể tự làm thức
                      ăn bằng cách phối trộn các loại thức ăn từ tảo biển, tôm,
                      cá hú, rau củ quả, . ..
                    </Paragraph>
                  </li>
                </ul>
                <p>
                  <span
                    className="span-Style"
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    Kiểm tra sức khoẻ
                  </span>
                  <br />
                  <Paragraph className="paragraph-Style">
                    Kiểm tra sức khỏe thường xuyên là vô cùng cần thiết nhằm bảo
                    vệ sức khoẻ của cá Koi Ogon. Bạn nên theo dõi thường xuyên
                    chú cá của mình nhằm phát hiện kịp thời các dấu hiệu của
                    bệnh tật và tiến hành chữa trị kịp thời.
                  </Paragraph>
                </p>
                <p>
                  <span
                    className="span-Style"
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    Giám sát và quản lý
                  </span>
                  <br />
                  <Paragraph className="paragraph-Style">
                    Giám sát và quản lý là một phần cực kỳ cần thiết đối với quá
                    trình chăm sóc cá Koi Ogon. Bạn cần đảm bảo rằng các thông
                    số nước, thức ăn và sức khoẻ của chúng được giám sát và quản
                    lý nghiêm ngặt nhằm đảm bảo chúng phát triển tốt nhất có
                    thể.
                  </Paragraph>
                </p>
              </div>
              <div id="5">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  5. Địa chỉ bán cá Koi Ogon đẹp, uy tín?{" "}
                </h3>
                <Paragraph className="paragraph-Style">
                  IKoi là đơn vị thiết kế thi công hồ cá Koi chuyên nghiệp, uy
                  tín hiện nay. Ngoài ra, chúng tôi còn là đơn vị chuyên cung
                  cấp các dòng cá Koi Ogon siêu đẹp với mức giá cạnh tranh.
                  Khách hàng sẽ hoàn toàn yên tâm khi sử dụng dịch vụ của chúng
                  tôi:
                  <ul>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Thiết kế hồ cá Koi Nhật đạt chuẩn trong thời gian nhanh
                        nhất đúng tiến độ đã cam kết.{" "}
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Tất cả yêu cầu của khách hàng được đáp ứng đầy đủ như đã
                        thỏa thuận.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hỗ trợ chăm sóc bảo dưỡng công trình, tư vấn để khách
                        hàng sử dụng hồ cá đúng chuẩn. s
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Giá thành thiết kế, thi công hồ cá Koi cạnh tranh nhất
                        thị trường hiện nay.{" "}
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Đội ngũ kiến trúc sư, kỹ sư xây dựng giỏi và nhân viên
                        tư vấn am hiểu chuyên môn.
                      </Paragraph>
                    </li>
                  </ul>
                </Paragraph>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <img src={img10} />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="src/assets/img_5.png"
                style={{ objectFit: "cover", width: "100%" }}
              />
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
