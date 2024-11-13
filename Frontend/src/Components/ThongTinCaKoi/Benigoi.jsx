import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import CardGrid from "../Cardgrid";
import axios from "axios";
import { Layout } from "antd";
import { Typography } from "antd";
import "../Css/koiStyle.css";
const { Title, Text, Paragraph } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi Benigoi/BENIGOI1.jpg";
import img2 from "../../assets/Koi Benigoi/BENIGOI2.jpg";
import img3 from "../..//assets/img_4.png";
import img4 from "../../assets/img_5.png";
export default function Benigoi() {
  const [menu, setMenu] = useState("home");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idBenigoi, setIDBenigoi] = useState(null);
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
          console.log("Card data set successfully:", response.data.result9); // Kiểm tra sau khi set
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
    const benigoiCard = categoryData.find(
      (card) => card.CategoryName === "Benigoi"
    );

    if (benigoiCard) {
      setIDBenigoi(benigoiCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idBenigoi) {
      const filtered = cardData.filter((card) => card.CategoryID === idBenigoi);
      setFilteredCards(filtered);
    }
  }, [idBenigoi, cardData]);
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
                className="body_StyleKoiOfPage "
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
                      1. Giới thiệu cá Koi Benigoi
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
                      2. Cách nhận biết cá Koi Benigoi
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
                      3. Cách nhận biết cá Koi Benigoi
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll31}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.1 Chọn Benigoi Koi qua hình dáng
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        {" "}
                        <span
                          onClick={handleScroll32}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.2 Chọn Cá Koi Benigoi qua màu sắc
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        {" "}
                        <span
                          onClick={handleScroll33}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.3 Chọn Benigoi Koi qua hoa văn
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        {" "}
                        <span
                          onClick={handleScroll33}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          3.4 Chọn Cá Koi Benigoi qua dáng bơi
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
                      4. Cách chăm sóc Benigoi Koi
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
                      5. Giá cá koi Benigoi bao nhiêu?
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll31}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          5.1 Giá cá koi Benigoi F1
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        {" "}
                        <span
                          onClick={handleScroll32}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          5.2 Giá cá koi Benigoi Nhật chuẩn
                        </span>
                      </li>
                    </ul>
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
                      6. Tại sao nên mua cá Koi Benigoi tại IKoi?
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="noidungchitiet" style={{ paddingTop: "20px" }}>
                  Nội dung chi tiết
                </h2>
                <Paragraph className="paragraph-Style">
                  <span className="span-Style" style={{ color: "blue" }}>
                    Cá Koi Benigoi
                  </span>{" "}
                  là dòng cá phổ biến rất được ưa chuộng trong những năm gần đây
                  bởi chúng sở hữu nhiều đặc điểm nổi bật. Đối với những người
                  chuyên chơi cá Koi chắc hẳn không còn xa lạ gì đối với loại cá
                  này. Bạn đã biết gì về loại cá này chưa? Hãy cùng Siêu thị Cá
                  Koi VN tìm hiểu rõ hơn về loại cá này ngay trong bài viết dưới
                  đây.
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
                  1. Giới thiệu cá Koi Benigoi
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cũng giống như dòng Chagoi Koi, Cá Koi Benigoi là dòng cá có
                    màu đơn sắc, toàn bộ vảy và vây cá đều có màu đỏ trông như
                    quả ớt khổng lồ. Nếu thả Benigoi Koi trong hồ Koi thì loài
                    cá này có phần nổi bật hơn so với các loại cá khác. Đối với
                    dòng cá nhỏ hơn là Girin Benigoi thì vảy cá có màu óng ánh,
                    đẹp mắt, lộng lẫy và lôi cuốn mọi ánh mắt từ cái nhìn đầu
                    tiên. Do đó, cùng mang một màu đỏ nhưng nhiều người thường
                    nhầm lẫn giữa Benigoi Koi và Higoi.
                  </Paragraph>
                </div>
                <ul>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Mức độ chăm sóc: Dễ dàng
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Mức độ chăm sóc: Dễ dàng
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      {" "}
                      Tính cách: Hòa Bình
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Điều kiện nước: 36-90◦F, KH 2-12, pH 6,8-7,2
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Kích thước tối đa: 90 cm
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Màu sắc: Đỏ
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Chế độ ăn: Ăn tạp
                    </Paragraph>
                  </li>
                </ul>
              </div>

              <div id="2">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2. Cách nhận biết cá Koi Benigoi
                </h3>

                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                  <div style={{ textAlign: "center" }}>
                    <Text className="text-Style">Dòng cá Koi Benigoi</Text>
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
                  3. Cách chọn cá Koi Benigoi
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Để lựa chọn được Benigoi Koi đẹp, bạn cần phải xét dựa trên
                    hai phương diện là màu sắc và hình sáng của cá cụ thể:
                  </Paragraph>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <span id="31" className="span-Style">
                        3.1 Chọn Benigoi Koi qua hình dáng
                      </span>
                      <Paragraph className="paragraph-Style">
                        Khi chọn Benigoi Koi qua hình dáng, bạn cần lưu ý các
                        điều sau:
                      </Paragraph>
                      <ul>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Khi chọn cá Koi Benigoi, bạn nên chọn cá có thân
                            hình như một chiếc tàu ngầm, bụng cá không phệ,
                            không ngắt quãng như dáng cá nóc. Nếu chọn con cá
                            mập quá thì thân cá thường bị ngắn, còn chọn cá dài
                            quá thì dáng cá phát triển sẽ như hình con lươn, sau
                            này khó phát triển về độ lớn.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Bạn cần quan sát thật kỹ dáng bơi của cá bơi điểm
                            bắt đầu và điểm kết thúc, lúc cá bơi cao và lúc cá
                            bơi thấp có hình dáng như thế nào. Bạn hãy quan sát
                            thật kỹ để phát hiện cá có khỏe mạnh hay không. Nếu
                            dáng cá bơi không thẳng thì bạn không nên chọn.
                            Benigoi Koi đẹp chuẩn là cá phải có dáng hơi thẳng
                            và uyển chuyển.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Chọn cá có phần đuôi cong tròn và sờ vào phải mịn.
                            Trường hợp đuôi cá không cong tròn mà có hình trái
                            tim cũng được. Nếu đuôi cá ngắn, không căng thì khả
                            năng trong tương lai, cá sẽ khó phát triển và đến độ
                            dài và sức mạnh cần thiết.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Nên chọn cá Koi Benigoi có lớp da phải sáng, sạch,
                            nhẵn mịn và trơn bóng. Bởi lớp da cá đẹp, tốt sẽ tác
                            động đến vẻ đẹp của vảy cá, làm cho vảy cá đều đặn
                            hơn. Tránh trường hợp bạn chọn những con cá có màu
                            sắc mờ nhạt, da tróc vảy, trầy xước.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Bạn cũng không nên chọn những con cá có dáng bơi lắc
                            lư, lay động, cá bị hở trâu, râu cá không đều, miệng
                            cá méo và phần cuối thân cá bị cong.
                          </Paragraph>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span id="32" className="span-Style">
                        3.2 Chọn Cá Koi Benigoi qua màu sắc
                      </span>
                      <Paragraph className="paragraph-Style">
                        Khi chọn Benigoi Koi thông qua màu sắc, bạn cần lưu ý:
                      </Paragraph>
                      <ul>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Toàn thân cá phải có màu đỏ, không được có các đốm
                            trắng trên ngực
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Trường hợp cá Koi có màu đốm trắng ở ngựa thì không
                            phải là cá Koi Benigoi mà là dòng cá Koi Aka Hajiro.
                          </Paragraph>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span id="33" className="span-Style">
                        3.3 Chọn Benigoi Koi qua hoa văn
                      </span>
                      <Paragraph className="paragraph-Style">
                        Cách chọn Benigoi Koi thông qua hoa văn trên cá như sau:
                      </Paragraph>
                      <ul>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Sự phân bố màu cá tổng thể cân bằng tốt và không tập
                            trung ở một nơi hoặc một phía nhất định.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Đặc điểm nổi bật của cá Koi Benigoi nằm ở đỉnh đầu
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Vị trí của các mảng trên đỉnh đầy phải ở giữa đầu ,
                            nhỏ hơn mặt trước của miệng, không nhiều hơn nắp sọ
                            và không có mắt ở hai bên.
                          </Paragraph>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span id="34" className="span-Style">
                        3.4 Chọn Cá Koi Benigoi qua dáng bơi
                      </span>
                      <Paragraph className="paragraph-Style">
                        Để chọn được Benigoi Koi, bạn không thể bỏ qua tiêu chí
                        về dáng bơi của cá. Dù đã chọn được cá Koi Benigoi đạt
                        các tiêu chí trên nhưng nếu dáng bơi của cá không uyển
                        chuyển, duyên dáng, mượt mà thì vẫn chưa phải là cá hoàn
                        hảo. Nếu cá Koi bơi xoắn trong nước, bơi như rắn hoặc
                        thường bơi sang một bên thì không đủ tiêu chuẩn là con
                        cá Koi đẹp.
                        <br />
                        Nhìn chung, để chọn được cá Koi Benigoi đẹp thì không có
                        bất cứ điểm nào khác ngoài màu đỏ, càng lớn, màu của
                        Benigoi Koi càng đậm.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img src={img2} style={{ width: "30%" }} />
                  <div style={{ textAlign: "center" }}>
                    <Text className="text-Style">Các dòng Cá Koi Benigoi</Text>
                  </div>
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
                  4. Cách chăm sóc Benigoi Koi
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Benigoi thực sự đẹp, không đơn thuần chỉ là chỉ hữu
                    một màu sắc, body rắn chắc, khỏe mạnh mà còn bởi nhiều lý do
                    khác như: tuổi thọ cao, đặc tính thân thiện, hòa đồng. Đặc
                    biệt, hầu hết những người chơi cá Koi lâu năm đều coi loài
                    cá này là vật phong thủy kinh nghiệp, mang đến nhiều may
                    mắn, tài lộc nên chăm sóc rất cẩn thận. Cụ thể, các lưu ý
                    khi chăm sóc Benigoi Koi như sau: thể nuôi dưỡng đàn cá của
                    mình một cách khỏe mạnh nhé:
                  </Paragraph>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Duy trì độ PH trong hồ từ 7 - 7.5
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nhiệt độ nước nên ổn định từ 20 - 27 độc C
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hàm lượng Oxy trong hồ nuôi tối thiểu từ 2,5mg/l
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Khi nồng độ Nitrite trong nước quá cao hoặc có nhu cầu
                        thay nước thì cứ 2 ngày rút đi một phần 3 thể tích nước
                        trong hồ cho đến khi nước hồ đạt yêu cầu.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Để phòng bệnh cho Goshiki thì chúng ta cần thường xuyên
                        quan sát hồ nuôi cũng như các biểu hiện của đàn cá. Kiểm
                        tra xử lý rong, tảo kịp thời, kiểm tra hệ thống lọc nước
                        còn ổn định không….
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nên tìm hiểu và lựa chọn nguồn thức ăn cho Goshiki có
                        nguồn gốc, đảm bảo an toàn.
                      </Paragraph>
                    </li>
                  </ul>
                  <Paragraph className="paragraph-Style">
                    Trên đây là một số cách chăm sóc cá koi Goshiki đơn giản và
                    khoa học mà bên IKoi muốn gửi đến quý khách hàng. Chúc bạn
                    sẽ áp dụng và chăm sóc đàn cá khỏe mạnh.
                  </Paragraph>
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
                  5. Giá cá koi Benigoi bao nhiêu?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Hiện tại IKoi đang cung cấp dòng cá koi Benigoi chuẩn từ cá
                    nhật đến cá F1 với giá cực kỳ ưu đãi. Có thể nói IKoi là một
                    trong những đơn vị cung cấp cá koi với giá rẻ nhất thị
                    trường, mà chất lượng cũng rất đảm bảo. Giá cá koi nhật và
                    f1 như sau
                  </Paragraph>
                </div>
                <div>
                  <span id="51" className="span-Style">
                    5.1 Giá cá koi Benigoi F1
                  </span>
                  <Paragraph className="paragraph-Style">
                    Đối với những con Benigoi f1 có kích thước từ 18cm – 40cm,
                    giá cá koi dao động từ 150.000 – 500.000 VNĐ tùy loại.
                    <br />
                    Cao cấp hơn là những con Benigoi f1 có kích thước từ 50cm –
                    55cm, được chia làm loại 1, loại 2 và 3. Giá thành dao động
                    từ 1.800.000 – 3.000.000 VNĐ tùy loại.
                  </Paragraph>
                </div>
                <div>
                  <span id="52" className="span-Style">
                    5.2 Giá cá koi Benigoi Nhật chuẩn
                  </span>
                  <Paragraph className="paragraph-Style">
                    Một con cá Koi trưởng thành Nhật Bản như Benigoi koi với
                    kích thước từ 10-15cm sẽ có giá từ 600.000 –
                    2.000.000VNĐ/con.
                    <br />
                    Ngoài ra còn có con Benigoi Koi thuần chủng … được xếp vào
                    hàng hiếm có kích thước lớn thì giá cá koi lên đến vài nghìn
                    đến hàng chục nghìn USD. Do đó nếu bạn muốn mua hãy liên hệ
                    với chúng tôi để được tư vấn tận tình.
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
                  6.Tại sao nên mua cá Koi Benigoi tại IKoi?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Hiện nay trên thị trường có rất nhiều đơn vị chuyên cung cấp
                    cá Koi Benigoi với các mức giá và chất lượng khác nhau. Điều
                    này khá khó khăn với khách hàng trong việc lựa chọn một đơn
                    vị uy tín, chất lượng.
                    <br />
                    IKoi là đơn vị chuyên cung cấp cá Koi được nhiều khách hàng
                    lựa chọn trong những năm gần đây không chỉ bởi chất lượng cá
                    tốt mà còn bởi giá thành hợp lý. IKoi chuyên cung cấp các
                    loại cá chất lượng với giá thành cạnh tranh trên thị trường.
                    Khách hàng khi mua sản phẩm tại đây không lo bị hét giá,
                    khống giá như tại các đơn vị khác. Bên cạnh đó, khách hàng
                    khi mua tại đây cũng được yêu thích bởi đội ngũ nhân viên
                    nhiệt tình, có mặt 24/24 hỗ trợ giải đáp mọi thắc của khách
                    hàng một cách nhanh chóng.
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <img src={img3} />
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={img4} style={{ objectFit: "cover", width: "100%" }} />
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
