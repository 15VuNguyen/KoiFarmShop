import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import Footer from "../Footer";
import axios from "axios";
import "../Css/koiStyle.css";
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
import "../Css/koiStyle.css";
import { Spin } from "antd"; // Import the Spin component
const { Title, Text, Paragraph } = Typography;
import img1 from "../../assets/Koi-Asagi/ca-koi-asagi.webp";
import img2 from "../../assets/Koi-Asagi/ginrin-asagi.jpg";
import img3 from "../../assets/Koi-Asagi/konjo-asagi.jpg";
import img4 from "../../assets/Koi-Asagi/narumi-asagi.jpg";
import img5 from "../../assets/Koi-Asagi/4789c7fd1367ba7ae35a271f1b912a8c.png";
import img6 from "../../assets/Koi-Asagi/mizu-asagi.jpg";
import img7 from "../../assets/Koi-Asagi/hi-asagi.jpg";
import img8 from "../../assets/Koi-Asagi/ca-koi-asagi-1.webp";
import img9 from "../../assets/Koi-Asagi/ca-koi-asagi-2.webp";
import img10 from "../../assets/img_4.png";
import img11 from "../../assets/img_5.png";
export default function Asagi() {
  const [menu, setMenu] = useState("home");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idAsagi, setIDAsagi] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const handleScroll1 = () => {
    const element = document.getElementById("1");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll61 = () => {
    const element = document.getElementById("61");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll62 = () => {
    const element = document.getElementById("62");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

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
    const asagiCard = categoryData.find(
      (card) => card.CategoryName === "Asagi"
    );

    if (asagiCard) {
      setIDAsagi(asagiCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idAsagi) {
      const filtered = cardData.filter((card) => card.CategoryID === idAsagi);
      setFilteredCards(filtered);
    }
  }, [idAsagi, cardData]);
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
                      1. Giới thiệu về cá Koi Asagi
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
                      2. Cách nhận biết Asagi Koi
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
                      3. Cách chọn mua Cá Asagi Koi
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
                      4. Cách chăm sóc cá Koi Asagi Doitsu
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
                      5. Các dòng cá Asagi koi trên thị trường
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
                      6. Giá cá koi Asagi bao nhiêu?
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll61}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          6.1 Giá cá koi Asagi F1
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll62}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          6.2 Giá cá koi Asagi Nhật chuẩn
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll7}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      7. Tại sao nên mua cá Koi Asagi Doitsu tại IKoi
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingTop: "20px",
                  }}
                >
                  Nội dung chi tiết
                </h2>
                <Paragraph className="paragraph-Style">
                  Trong các loại cá Koi thì giống cá Koi Asagi được xếp hạng là
                  một trong những nhà vô địch của triển lãm cá Koi trên thế
                  giới. Với lịch sử lâu đời, Asagi Koi đã trở thành cá chép cảnh
                  nguyên bản với màu sắc nổi bật thu hút người nhìn ngay lần
                  đầu. Cùng theo dõi bài viết sau để tìm hiểu kỹ hơn về loại cá
                  Koi này.
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
                  1. Giới thiệu về cá Koi Asagi
                </h3>
                <Paragraph className="paragraph-Style">
                  Asagi là 1 trong những dòng cá Koi xuất hiện sớm nhất ở Nhật
                  Bản. Cái tên của nó bắt nguồn từ ngôi làng sinh ra toàn bộ
                  giống cá Koi Asagi này làm nghề dệt vải giống hoa văn trên
                  người những con cá. Giống cá này được coi là tổ tiên của các
                  loại cá Koi Nishikigoi ra đời từ khoảng 160 năm trước, với hai
                  dòng Kongo Asagi koi và Narumi Asagi đã lai tạo và cho ra
                  những hậu duệ của giống Asagi Magoi (Narumi: tên của ngôi làng
                  sản sinh ra toàn bộ giống Asagi).
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                  <div style={{ textAlign: "center" }}>
                    <Text className="text-Style">Hình ảnh cá Koi Asagi</Text>
                  </div>
                </div>
                <Paragraph className="paragraph-Style">
                  Và cho đến nay thì dòng Asagi đang được nhiều người ưa chuộng
                  bởi sự độc đáo trên những vảy vàng lấp lánh trên lưng vô cùng
                  đặc biệt mà các dòng Koi các không có.
                </Paragraph>
              </div>

              <div id="detailed-content">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2. Cách nhận biết Asagi Koi
                </h3>

                <div>
                  <Paragraph className="paragraph-Style">
                    Cùng tìm hiểu các thông số kỹ thuật của dòng Asagi Koi hiện
                    nay trên thị trường
                  </Paragraph>
                  <ul>
                    <li>
                      <Text className="text-Style">
                        Size kích thước : 10 – 55cm
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Nguồn gốc: Oya, Yamaju</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Loại: Thuần chủng Nhật Bản
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Xuất xứ: Nhật Bản</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Chất lượng: Đẹp xuất sắc
                      </Text>
                    </li>
                  </ul>
                </div>
                <div>
                  <Paragraph className="paragraph-Style">
                    Asagi Koi cùng với giống Goshiki koi là một trong những dòng
                    cá Koi có lịch sử lâu đời hiện nay, chúng được coi là tổ
                    tiên của các loài loài cá Koi Nishikigoi. Cá Koi Asagi có
                    hình dáng và màu sắc riêng dễ phân biệt với các dòng cá Koi
                    khác bởi lớp vẩy đậm màu ở lưng tạo thành hình trám hoặc kết
                    mạng Fukurin.
                  </Paragraph>
                  <ul>
                    <li>
                      <span className="span-Style">Hình dáng: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Asagi koi có hình dáng cơ bản giống như cá chép, thân
                        dày hơn cá chép. Đầu của koi luôn có màu trắng sáng,
                        phần má có màu sắc khác, xương vây có thể nhìn thấy bằng
                        mắt thường.
                      </Paragraph>
                    </li>
                    <li>
                      <span className="span-Style">Hình dáng: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Asagi koi có hình dáng cơ bản giống như cá chép, thân
                        dày hơn cá chép. Đầu của koi luôn có màu trắng sáng,
                        phần má có màu sắc khác, xương vây có thể nhìn thấy bằng
                        mắt thường.
                      </Paragraph>
                    </li>
                    <li>
                      <span className="span-Style">Màu sắc: </span>
                      <br />
                      <ul>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Lưng hoàn toàn không có hiện tượng pha màu như các
                            dòng cá koi khác. Koi Asagi có vảy màu xanh lam hoàn
                            toàn trong suốt từ đầu đến đuôi. Toàn thân chia
                            thành 2 phần riêng biệt, đầu và lưng có màu trắng.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Viền xung quanh đầu và dưới của cá koi asagi có màu
                            đỏ cam, đỏ hoặc vàng cam.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Lưới vảy màu xanh trên nền trắng là chi tiết bắt mắt
                            nhất của Koi Asagi.
                          </Paragraph>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {" "}
                      <span className="span-Style">Vây: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Màu sắc của vây sẽ trùng màu với phần bụng dưới của
                        chúng. Nếu bụng màu đỏ cam thì phần vây của chúng cũng
                        sẽ có màu đỏ cam và có màu trắng ở viền, tương tự với
                        các màu cam, vàng.
                      </Paragraph>
                    </li>
                    <li>
                      {" "}
                      <span className="span-Style">Râu và mắt: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Mắt của cá Koi Asagi tròn và lớn, 2 râu dài, to hơn so
                        với cá chép bình thường, phần đầu trắng quan sát được cả
                        mũi của cá.
                      </Paragraph>
                    </li>
                    <li>
                      {" "}
                      <span className="span-Style">Vẩy: </span>
                      <br />
                      <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Cá koi asagi có vảy màu xanh ánh kim, các vảy trên
                            thân cá nổi rõ. Nhìn từ xa, asagi-koi trông giống
                            như nó đang mặc một bộ giáp bạc sáng bóng.
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph className="paragraph-Style">
                            Phần lớp vẩy lưới xanh này đi đến cuối đường viền cơ
                            thể của cá. Ánh kim xuất hiện ở cuối mỗi chiếc vẩy
                            màu xanh đậm.
                          </Paragraph>
                        </li>
                      </ul>
                    </li>
                  </ul>
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
                  3. Cách chọn mua Cá Asagi Koi
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Asagi Doitsu và cá koi ginrin được nhiều người quan
                    tâm bởi yếu tố phong thủy mà loài cá này mang lại vô cùng
                    đặc biệt. Theo người Nhật thì những khoang màu xanh, đỏ,
                    trắng trên cá sẽ biểu tượng cho sự may mắn, tài lộc và thịnh
                    vượng. Vì thế mà khi chọn mua cá Asagi Doitsu bạn cần lưu ý
                    đến một số điều sau:
                  </Paragraph>
                </div>
                <ul>
                  <li>
                    <span className="span-Style">
                      Chọn cá có tính cân xứng : {""}
                    </span>
                    <Paragraph className="paragraph-Style">
                      Một con cá Koi Asagi lý tưởng thì tính cân xứng khá quan
                      trọng, nó được biểu hiện bởi những mảng màu đỏ Hi. Các
                      mảng màu đỏ Hi này sẽ chạy dọc từ phần đầu cho tời phần
                      đuôi ở hai bên lưng của Asagi.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style"> Mắt cá</span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Cá Koi Asagi được người chơi cá cảnh đánh giá cao là do nó
                      có đôi mắt màu đỏ. Phần mang cá của nó cũng phải có viền
                      đỏ Hi
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style">Đầu cá</span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Nên chọn cá Koi có cái đầu trắng muốt thuần khiết đôi lúc
                      đầu của nó phát triển sẽ có sắc tố đỏ. Đặc biệt khi chọn
                      Asagi non thì nên kiểm tra chop mũi để nhận biết sau này
                      cá Koi lớn lên có mang vẻ màu đẹp và chất lượng không.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style">Phần lưng</span>
                    : Phần đỏ trên đầu tương đối giống tancho kohaku. Ngoài ra
                    trên thân còn có các đốm đỏ phân bổ đều trên thân
                    <br />
                    <Paragraph className="paragraph-Style">
                      Phần lưng Asagi chính là bộ phận quan trọng quyết định
                      phần lớn vẻ đẹp của nó. Và sẽ được bao phủ trong lớp vảy
                      màu xanh với tông xanh nhạt dần đến gần gốc của vảy kết
                      hợp hài hòa với màu tối hơn.
                    </Paragraph>
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
                  4. Cách chăm sóc cá Koi Asagi Doitsu
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Để mua được Koi Asagi đạt tiêu chuẩn rất khó bởi phải từ 3
                    năm tuổi bạn mới có thể nhận biết nó đẹp hay không. Chính vì
                    thế mà việc chăm sóc một em cá Koi là vô cùng khó và cần
                    phải đảm bảo đầy đủ các tiêu chí sau:
                  </Paragraph>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Để cá phát triển tốt cần duy trì độ pH trong hồ từ 7 –
                        7.5 đạt chuẩn
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nhiệt độ nước nên ổn định từ 20 – 27 độ C trong các mùa
                        để cá có thể bơi lượn tự do.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hàm lượng oxy trong hồ nuôi tối thiểu: 2,5mg/l giúp cá
                        dễ dàng hô hấp nhanh chóng.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Cần thay nước thường xuyên khi nồng độ Nitrite quá cao
                        để cá có thể phát triển toàn diện nhất trong quá trình
                        sống.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Chú ý thường xuyên theo dõi, nếu phát hiện cá lười ăn,
                        bơi chậm cần cách ly cá bệnh sau đó liên hệ đến các đơn
                        vị uy tín, có kinh nghiệm để được hướng dẫn, hỗ trợ xử
                        lý kịp thời.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Cá Koi Asagi ăn tạp nên thức ăn khá đơn giản, không nên
                        cho cá ăn quá no. Nên chia 1 ngày thành 2-3 bữa để cá có
                        thể đảm bảo nhu cầu hoạt động.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Hệ thống lọc nước chuyên nghiệp, hiện đại đảm bảo nước ở
                        hồ cá Koi luôn an toàn và đúng theo yêu cầu.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        {" "}
                        Cá Koi Asagi sinh trưởng và phát triển tốt với hồ có thể
                        tích lớn hơn 1000 Gallon. Vì thế bạn cần đảm bảo nền hồ
                        tốt, hạn chế trồng các cây thủy sinh bởi chúng ảnh hưởng
                        tới chất lượng nước và quá trình bơi của cá Koi.
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
                  5. Các dòng cá Asagi koi trên thị trường
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Trên thị trường hiện nay có nhiều loại cá koi Asagi, phổ
                    biến như:
                  </Paragraph>
                  <ul>
                    <li>
                      <span className="span-Style">Ginrin Asagi: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        có lớp vẩy mày xanh ánh kim kết hợp cùng với xanh dương
                        tạo cảm giác bóng bẩy, rõ nét, lấp lánh. Đây là dòng cá
                        nỗi bật nhất trong các dòng Asagi
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img2} style={{ width: "30%" }} />
                        <div>
                          <Text className="text-Style">Ginrin Asagi</Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="span-Style">Konjo Asagi: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Đặc điểm là màu xanh dương đậm nhất, cùng với điểm Hi đỏ
                        cam, tực rỡ, nổi bật, rõ các đường biên.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img3} style={{ width: "30%" }} />
                        <div className="text-Style">
                          <Text className="text-Style">Konjo Asagi</Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="span-Style">Narumi Asagi: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Vẩy màu xanh nhạt, ở giữa màu xanh đậm, viền ngoài nhạt
                        dần.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img4} style={{ width: "30%" }} />
                        <div style={{ textAlign: "center" }}>
                          {" "}
                          <Text className="text-Style">Narumi Asagi</Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="span-Style">Asaki Sanke: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Vảy màu vàng nhạt/ xám nhạt nhất của nhà Asagi.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img5} style={{ width: "30%" }} />
                        <div style={{ textAlign: "center" }}>
                          <Text className="text-Style">Asaki Sanke</Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="span-Style">Mizu Sanke: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Lưng có màu xanh nhạt, bụng dưới có màu trắng, đầu và
                        bụng trên có màu đỏ cam.{" "}
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img6} style={{ width: "30%" }} />
                        <div style={{ textAlign: "center" }}>
                          <Text className="text-Style">Mizu Sanke</Text>/
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="span-Style">Hi Sanke: </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Màu đỏ từ bụng kéo dài lên phía trên đường biên, Vây,
                        đầu có thê toàn bộ là màu Hi đỏ cam
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img7} style={{ width: "30%" }} />
                        <div style={{ textAlign: "center" }}>
                          <Text className="text-Style">Hi Asagi</Text>
                        </div>
                      </div>
                    </li>
                  </ul>
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
                  6. Giá cá koi Asagi bao nhiêu?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Hiện tại IKoi đang cung cấp dòng cá koi Asagi chuẩn từ cá
                    nhật đến cá F1 với giá cá koi cực kỳ ưu đãi. Có thể nói
                    IKoilà một trong những đơn vị cung cấp cá koi với giá rẻ
                    nhất thị trường, mà chất lượng cũng rất đảm bảo. Giá cá koi
                    nhật và f1 như sau
                  </Paragraph>
                </div>
                <div>
                  <ul>
                    <li>
                      <span className="span-Style" id="61">
                        6.1 Giá cá koi Asagi F1
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Cá koi có thể tồn tại trong nhiều nhiệt độ nước, khả
                        năng chịu lạnh tốt. Tuy nhiên không nên để đáy hồ bị
                        đóng băng để hạn chế ảnh hưởng cá phát triển.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img src={img8} />
                      </div>
                    </li>
                    <li>
                      <span className="span-Style" id="62">
                        6.2 Giá cá koi Asagi Nhật chuẩn
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Ngoài ra còn có con Asagi Koi thuần chủng … được xếp vào
                        hàng hiếm có kích thước lớn thì giá cá koi lên đến vài
                        nghìn đến hàng chục nghìn USD. Do đó nếu bạn muốn mua
                        hãy liên hệ với chúng tôi để được tư vấn tận tình.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="7">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  7. Tại sao nên mua cá Koi Asagi Doitsu tại IKoi
                </h3>
                <div>
                  <div style={{ textAlign: "center" }}>
                    <img src={img9} style={{ width: "50%" }} />
                  </div>
                  <Paragraph
                    className="paragraph-Style"
                    style={{ paddingTop: "10px" }}
                  >
                    IKoi một trong những địa chỉ uy tín cung cấp cho bạn đa dạng
                    các mẫu cá Koi chất lượng, khỏe mạnh. Trong đó, nổi bật là
                    dòng cá Koi Asagi đẹp mắt đang được ưa chuộng hiện nay. Đến
                    với chúng tôi bạn sẽ được tư vấn, chọn lựa và giải đáp mọi
                    thắc mắc về dòng Koi Asagi đầy đủ nhất từ đội ngũ chuyên gia
                    giỏi. Chưa kể, IKoi cũng sẽ hỗ trợ bạn quá trình thiết kế hồ
                    cá Koi đẹp, hợp phong thủy mang lại may mắn cho gia chủ. Nếu
                    có thắc mắc hay cần hỗ trợ tư vấn mua cá Koi Asagi Doitsu
                    hãy liên hệ ngay với IKoi để được phục vụ nhanh chóng nhất.
                  </Paragraph>
                </div>
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
