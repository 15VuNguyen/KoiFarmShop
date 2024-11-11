import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import { Layout, Typography } from "antd";
import "../Css/koiStyle.css";
const { Text, Paragraph, Title } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-Showa/ca-koi-showa-9.webp";
export default function Showa() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idShowa, setIDShowa] = useState(null);
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
  const handleScroll41 = () => {
    const element = document.getElementById("41");

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
  const handleScroll42 = () => {
    const element = document.getElementById("42");

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
  const handleScroll71 = () => {
    const element = document.getElementById("71");

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
  const handleScroll72 = () => {
    const element = document.getElementById("72");

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
  const handleScroll8 = () => {
    const element = document.getElementById("8");

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
    const showaCard = categoryData.find(
      (card) => card.CategoryName === "Showa"
    );

    if (showaCard) {
      setIDShowa(showaCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idShowa) {
      const filtered = cardData.filter((card) => card.CategoryID === idShowa);
      setFilteredCards(filtered);
    }
  }, [idShowa, cardData]);
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
                      1. Giới thiệu về Cá Koi Showa
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
                      2. Các giống cá Koi Showa Nhật và cách xách định
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
                      3. Đặc điểm của cá koi showa
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
                      4.Cách chọn cá Koi Showa đẹp
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll41}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          4.1 Dựa vào hình dáng:
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll42}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          4.2 Dựa vào màu sắc:
                        </span>
                      </li>
                    </ul>
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
                      5. Cách chăm sóc cá Koi showa
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
                      6. Phong thủy cá koi Showa
                    </span>
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
                      7. Tại sao nên mua cá Platinum Koi tại IKoi?
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll71}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          7.1 Giá cá koi Platinum F1
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll72}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          7.2 Giá cá koi Platinum Nhật chuẩn
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <span
                      onClick={handleScroll8}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      8. Tại sao nên mua Showa Koi tại IKoi:
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
                <Paragraph className="paragraph-Style">
                  Trên thị trường hiện nay do muốn đáp ứng được nhu cầu của
                  người dân khi muốn sở hữu trong không gian của mình một bể, hồ
                  cá Koi tuyệt đẹp để mang lại tính thẩm mỹ cho tổng thể công
                  trình của mình. Vì vậy, thị trường đã xuất hiện rất nhiều mẫu,
                  loại cá chép Koi từ bé đến lớn, từ trong nước đến nhập khẩu từ
                  nước ngoài. Mỗi loài cá Koi đều có những đặc điểm riêng nhưng
                  nổi bật và được ưu ái lựa chọn nhất hiện nay là dòng Cá Koi
                  Showa. Mời quý vị hãy đồng hành cùng chúng tôi trong bài viết
                  dưới đây để hiểu hơn về loài Cá Showa này nhé!
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="src/assets/Koi-Showa/ca-koi-showa-5.webp"
                    style={{ width: "50%" }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Text
                      className="text-Style"
                      style={{
                        color: "#efa709",
                      }}
                    >
                      Cá koi showa theo từng kích thước
                    </Text>
                  </div>
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
                  1. Giới thiệu về Cá Koi Showa:
                </h3>

                <Paragraph className="paragraph-Style">
                  Cá koi Showa là dòng cá được lai tạo ra vào năm 1927 bởi
                  Jukichi Hoshino thời Nhật Hoàng Hirohito, Thiên Hoàng Chiêu
                  Hòa. Nó được xuất phát từ hai hậu duệ đầu tiên của giống chép
                  hoang dã Magoi, hậu duệ Tetsu Magoi, tổ tiên của dòng cá koi
                  shiro utsuri. <br />
                  Tên đầy đủ của nó là Showa Sanshoku, hình thành từ hai từ
                  Showa (Chiêu Hòa) và Sankoku (ba màu), biểu thị thời kì mà
                  loài cá này xuất hiện lần đầu dưới thời gian của thiên hoàng
                  Chiêu Hòa nối tiếp thiên hoàng Đại Chính. <br />
                  Cá showa có tuổi thọ trung bình từ 25 đến 35 năm nhưng thi
                  thoảng có những cá thể đặc biệt do các nhà nghiên cứu bậc nhất
                  Nhật Bản lai tạo thì tuổi thọ có thể lên tới 200 năm. <br />
                  Showa Koi trên thị trường cũng được chia hạng rõ ràng. Cá Koi
                  showa đẹp nhất là cá hạng A. Những loài cá này được lai tạo
                  bởi những cặp bố mẹ khỏe mạnh đẹp nhất trên thế giới. <br />
                  Cá showa cao cấp có nhiều loại: Loại có cơ thể một màu đen và
                  cá có điểm nhấn đỏ, trắng tạo thành một tổ hợp xen lẫn nhau
                  thường được gọi là “sumi”; Loại có màu trắng nhiều hơn đen gọi
                  là “Kindai”.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                </div>
                <div>
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>
                    Đặc điểm của Showa Koi:
                  </p>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <Text className="text-Style">Chăm sóc dễ dàng</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Kích thước tối đa : 90cm{" "}
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Ăn tạp, hiền , ưa hòa bình
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Màu sắc: Đen , đỏ , vàng
                      </Text>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Sống ở điều kiện nước: 36 – 90 °F, HK2-12, pH 6,8 – 7,2;
                        Kích thước hồ tối thiểu để nuôi cá 1000 gallon.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="src/assets/Koi-shusui/showa5.jpg"
                    style={{ width: "50%" }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Text
                      className="text-Style"
                      style={{
                        color: "#efa709",
                      }}
                    >
                      Cá Koi Showa có tên đầy đủ là Showa Sanshoku{" "}
                    </Text>
                  </div>
                </div>
              </div>

              <div id="2" style={{ paddingTop: "20px" }}>
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2. Các giống cá Koi Showa Nhật và cách xách định{" "}
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Mặc dù tất cả Showa đều có vẻ ngoài làn da đen (gọi là Sumi)
                    với các dấu hiệu từ đỏ đến cam (Hi) và trắng (Shiroji) trên
                    đó, nhưng có rất nhiều giống Showa khác nhau với các kiểu
                    hoa văn và cách sắp xếp khác nhau. Cùng tìm hiểu nhé
                  </Paragraph>
                  <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Hi Showa
                      </span>{" "}
                      <Paragraph className="paragraph-Style">
                        là một loại cá koi Showa với phần thân cá chiếm ưu thế
                        bởi màu đỏ, trong khi các bệt đen (Sumi) là nhỏ và xen
                        kẽ trên thân cá.
                      </Paragraph>
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/content_hi-showa__1_.jpg"
                          style={{ width: "30%", objectFit: "cover" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Hi Showa
                          </Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Kindai Showa
                      </span>
                      <Paragraph className="paragraph-Style">
                        có nhiều khoang màu trắng chủ đạo (40% trở lên) trên
                        thân cá và các bệt màu đỏ phân bổ đầu, thân, và đuôi cá.
                        Các chấm đen rải rác xuất hiện trên thân cá và cơ vây
                        khớp ngực.
                      </Paragraph>
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/kindai-showa.webp"
                          style={{ width: "30%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Kindai Showa
                          </Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Tancho Showa{" "}
                      </span>
                      có nhiều màu đen trên thân cá và ít màu đỏ và trắng.
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/tancho-showa.png"
                          style={{ width: "30%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Tancho Showa
                          </Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Maruten Showa: {""}
                      </span>
                      <Paragraph className="paragraph-Style">
                        giống Tancho Showa với chấm đỏ trên đầu, nhưng có thêm
                        các chấm đỏ khác trên thân cá
                      </Paragraph>
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/tancho-showa.png"
                          style={{ width: "30%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Maruten Showa
                          </Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Boke Showa: {""}
                      </span>
                      có các chấm đen mờ hơn.
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/boke-showa.webp"
                          style={{ width: "30%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Boke Showa
                          </Text>
                        </div>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Doitsu Showa: {""}
                      </span>
                      <Paragraph className="paragraph-Style">
                        không có vảy, da trơn, các bệt màu xen kẽ đẹp mắt.
                      </Paragraph>
                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <img
                          src="src/assets/Koi-Showa/doistu-showa.jpg"
                          style={{ width: "30%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Doitsu Showa
                          </Text>
                        </div>
                      </div>
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
                  3. Đặc điểm của cá koi showa
                </h3>
                <div style={{ fontSize: "15px", fontWeight: "400" }}>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Showa Sankoku là một dòng cá chép Nhật ba màu giống
                    như Koi Sanke, nhưng khi quan sát kĩ, sắc màu giữa chúng có
                    sự khác biệt đáng kể. Cùng xem những đặc điểm sau của showa
                    koi
                  </Paragraph>
                  <ul style={{ listStyleType: "none" }}>
                    <li style={{ fontSize: "15px", fontWeight: "400" }}>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Đầu cá
                      </span>
                      <Paragraph className="paragraph-Style">
                        Đầu cá Koi Showa Sankoku có nhiều bệt sumi màu đen, và
                        màu đen này có thể lan xuống cả dưới miệng của cá. Trong
                        khi đó, đầu cá Koi Sanke không có vệt đen sumi.
                      </Paragraph>
                    </li>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Phần vai và lưng cá:
                      </span>
                      <Paragraph className="paragraph-Style">
                        Vai và lưng cá Koi Showa Sankoku có màu lưng pha trộn
                        tổng hợp ba màu trắng, đỏ và đen. Màu đen (sumi) là màu
                        nền của cá, trái ngược với màu nền trắng của cá Koi
                        Sanke. Hình thái sumi trên cá Koi Showa Sankoku tạo
                        thành những mảng lớn hoặc những vệt đen kéo dài theo
                        hình ziczac đối xứng. Màu đỏ (hi) trên thân và đầu của
                        cá Koi Showa Sankoku cũng ít hơn so với màu đen, khác
                        với cá Kohaku và Sanke chủ yếu là màu đỏ. Màu trắng
                        (shiroji) của Showa cũng ít hơn so với màu đen.
                      </Paragraph>
                    </li>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Vây cá:
                      </span>
                      <Paragraph className="paragraph-Style">
                        Vây của cá Koi Showa Sankoku có bệt đen sumi và tia đen
                        tejima. Một số cá Koi Sanke vây hoàn toàn là màu đen
                        trông rất nổi bật và bắt mắt. Tuy nhiên, vây cá Koi
                        Showa Sankoku thường có tỷ lệ sumi chiếm 50-60%, còn lại
                        là màu trắng. Các tia vây của Koi Showa Sankoku cũng dễ
                        dàng quan sát bằng mắt thường.
                      </Paragraph>
                    </li>
                    <li>
                      <span
                        className="span-Style"
                        style={{
                          color: "rgb(146, 2, 2)",
                        }}
                      >
                        Hình dáng bên ngoài:
                      </span>
                      <Paragraph className="paragraph-Style">
                        Cá Koi Showa Sankoku có hình dáng bên ngoài giống như cá
                        chuẩn, với thân mập, vai và lưng tròn trịa, râu dài và
                        mắt to và linh hoạt. Lớp vẩy trên mình của cá Koi Showa
                        Sankoku phân bố đều, có màu đục hoặc có ánh kim loại tùy
                        theo dòng cá.
                        <Paragraph className="paragraph-Style">
                          Về cơ bản chúng ta có thể dựa vào các màu sắc trên
                          đầu, thân, vây, đuôi của cá Showa để nhận biết chúng
                          thuộc loại nào.
                        </Paragraph>
                        <ul
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            listStyleType: "none",
                          }}
                        >
                          <li>
                            <Paragraph className="paragraph-Style">
                              Cá có thân màu đỏ chiếm trên thân cá, các bệt đen
                              nhỏ xen kẽ là cá Hi Showa.
                            </Paragraph>
                          </li>
                          <li>
                            <Paragraph className="paragraph-Style">
                              Nếu cá có các vệt đỏ ở trên đầu, thân, đuôi được
                              phân bổ đều. Thân cá có nhiều khoang màu trắng (
                              Kindai Showa).
                            </Paragraph>
                          </li>
                          <li>
                            <Paragraph className="paragraph-Style">
                              Các chấm đen trên thân cá mờ hơn ( Boke showa)
                            </Paragraph>
                          </li>
                          <li>
                            <Paragraph className="paragraph-Style">
                              Cá da trơn, không vảy, màu xen kẽ hợp lý đẹp mắt (
                              Doitsu Showa).
                            </Paragraph>
                          </li>
                          <li>
                            <Paragraph className="paragraph-Style">
                              Thân cá là các khoang màu trắng – đen xen kẽ; Các
                              chấm đỏ tròn như mặt trời trên đỉnh đầu cá (
                              Tancho Showa)….
                            </Paragraph>
                          </li>
                        </ul>
                        <Paragraph className="paragraph-Style">
                          Thực tế cho thấy, chơi Cá showa cùng với Tancho Koi
                          rất khó, kỹ lưỡng nhưng nó lại tạo ra được nhiều điều
                          muốn khám phá nên rất hấp dẫn những vị khách yêu cá
                          Koi tò mò và tìm hiểu. Bởi vậy, thị trường cá Koi nó
                          được phong là một trong tam vương của làng cá Koi.
                        </Paragraph>
                        <div style={{ textAlign: "center" }}>
                          <img
                            src="src/assets/Koi-Showa/ca-koi-showa-9.webp"
                            style={{ width: "50%" }}
                          />
                          <Paragraph
                            className="paragraph-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Về cơ bản chúng ta nhận biết cá Showa dựa vào các
                            màu sắc trên đầu
                          </Paragraph>
                        </div>
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
                  4. Cách chọn cá Koi Showa đẹp
                </h3>
                <Paragraph className="paragraph-Style">
                  Muốn chọn lựa được những chú cá Koi Showa đẹp thì phải dựa vào
                  các tiêu chí sau:
                </Paragraph>
                <div id="41">
                  <span
                    className="span-Style"
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    4.1 Dựa vào hình dáng:
                  </span>
                  <ul>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Chọn cá Koi Showa có dáng bơi thẳng, vây ngực, vây lưng
                        và vây đuôi dày, cặp râu dài và cứng, đầu cá hơi gù,
                        dáng cá thuôn dài từ đầu đến đuôi và phần đuôi có lực.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Tránh chọn cá có dáng bơi lắc lư lay động, râu hở, râu
                        không đều, miệng méo, phần cuối thân của cá bị cong hoặc
                        phần trên thân cá có vết trầy xước.{" "}
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Ngoài ra, tránh chọn cá có phần mang bị đỏ bởi có thể
                        chúng bị nhiễm sán.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
                <div id="42">
                  <span
                    className="span-Style"
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    4.2 Dựa vào màu sắc:
                  </span>
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Khi chọn koi Showa dựa vào màu sắc, ta xem xét đầu cá
                        trước tiên. Cá phải có cả 3 màu đỏ - đen - trắng (thường
                        thì tỉ lệ giữa chúng bằng nhau). Lý tưởng nhất là một
                        con Showa có đầu đẹp và Sumi có hình tia chớp chữ Y.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Các bệt Sumi (đen) trên thân cá phải cân đối, xen kẽ với
                        các khoảng màu Hi (đỏ), Shiroji (trắng) và biên giới các
                        màu rõ nét, không bị mờ.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Vùng Odome ngay trước đuôi nên có màu trắng Shiroji.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Vây lưng nên có màu trắng để tương phản với Sumi.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Nên chọn cá có 1/3 vây ngực kể từ khớp vây là màu đen.
                        Khi cá lớn, phần màu đen sẽ giúp tạo tương phản với màu
                        trắng. Vây đuôi nên có tỷ lệ màu đen và màu trắng tương
                        đối nhau. Tránh chọn cá có màu sắc không đồng nhất hoặc
                        màu sắc không thu hút.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Ngoài ra, màu sắc cá Koi Showa đẹp sẽ cân đối, rõ nét và
                        không bị mờ, có sự tương phản giữa các màu đỏ, đen và
                        trắng, và có tỷ lệ màu đen và màu trắng tương đối nhau
                        trên vây đuôi.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="src/assets/Koi-Showa/ca-koi-showa-7.webp"
                          style={{ width: "50%" }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <Text
                            className="text-Style"
                            style={{
                              color: "#efa709",
                            }}
                          >
                            Nên chọn cá có dáng bơi thẳng có độ uyển chuyển của
                            vây ngực
                          </Text>
                        </div>
                      </div>
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
                  5. Cách chăm sóc cá Koi showa:
                </h3>
                <Paragraph className="paragraph-Style">
                  Muốn đảm bảo có một bể cá, hồ cá Koi showa đẹp và nó có thể
                  sinh trưởng, phát triển tốt thì hồ cá koi cần có đủ các phụ
                  kiện cơ bản và thức ăn phải phù hợp với cá. Thể tích tối thiểu
                  của hồ là 1000 Gallon nước. <br />
                  Kiểm tra cá liên tục, thấy hiện tượng không bình thường như:
                  bơi chậm, ăn không mạnh phải báo ngay cho nơi cung cấp để liên
                  hệ chuyên gia đến xử lý. <br />
                  Nền bể cá phải đạt chuẩn, sử dụng ít cây thủy sinh bể cá thích
                  đùa sẽ phá hủy cây gây ảnh hưởng đến chất lượng nước. Duy trì
                  một hệ thống lọc chuyên nghiệp để duy trì sự sống và giúp
                  chúng phát triển và giữ được giá trị của những con cá chất
                  lượng.
                </Paragraph>
              </div>
              <div id="6">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  6. Phong thủy cá koi Showa
                </h3>
                <Paragraph className="paragraph-Style">
                  Cá koi Showa là dòng cá nổi tiếng với màu sắc đa dạng bao gồm
                  đỏ, trắng và đen. Màu sắc của cá Showa tương sinh với các mệnh
                  trong phong thủy, tùy thuộc vào màu sắc của cá. Do đó, cá
                  Showa có thể phù hợp với mọi mệnh. Việc Lựa chọn cá hợp mệnh
                  có thể giúp người chủ tăng vượng khí, gặp thuận lợi trong công
                  việc và tình cảm
                </Paragraph>
              </div>
              <div id="7">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  7. Cách chăm sóc cá Koi showa:
                </h3>
                <Paragraph className="paragraph-Style">
                  Hiện tại IKoi đang cung cấp dòng cá koi Showa chuẩn từ cá nhật
                  đến cá F1 với giá cực kỳ ưu đãi. Có thể nói IKoi là một trong
                  những đơn vị cung cấp cá koi với giá rẻ nhất thị trường, mà
                  chất lượng cũng rất đảm bảo. Giá cá koi Showa Nhật và f1 như
                  sau
                </Paragraph>
                <div id="71">
                  <h4
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    7.1 Giá cá koi Showa F1
                  </h4>
                  <Paragraph className="paragraph-Style">
                    Đối với những con Showa f1 có kích thước từ 18cm – 40cm, giá
                    cá koi dao động từ 150.000 – 500.000 VNĐ tùy loại. <br />
                    Cao cấp hơn là những con Showa f1 có kích thước từ 50cm –
                    55cm, được chia làm loại 1, loại 2 và 3. Giá thành dao động
                    từ 1.800.000 – 3.000.000 VNĐ tùy loại.
                  </Paragraph>
                </div>
                <div id="72">
                  <h4
                    style={{
                      color: "rgb(146, 2, 2)",
                    }}
                  >
                    7.2 Giá cá koi Showa Nhật chuẩn
                  </h4>
                  <Paragraph className="paragraph-Style">
                    Một con cá Koi Showa nhật với kích thước từ 10-15cm sẽ có
                    giá từ 600.000 – 2.000.000VNĐ/con.
                    <br />
                    Ngoài ra còn có con Showa Koi thuần chủng … được xếp vào
                    hàng hiếm có kích thước lớn thì giá cá koi lên đến vài nghìn
                    đến hàng chục nghìn USD. Do đó nếu bạn muốn mua hãy liên hệ
                    với chúng tôi để được tư vấn tận tình.
                  </Paragraph>
                </div>
              </div>
              <div id="8">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  8. Tại sao nên mua Showa Koi tại IKoi:
                </h3>
                <Paragraph className="paragraph-Style">
                  Phong thủy theo quan niệm của người Á Đông có ý nghĩa vô cùng
                  lớn nên việc lựa chọn cá Koi showa và Cá Koi Yamabuki nó mang
                  lại sự ấm áp, thành công, vận may và thượng thọ của gia chủ
                  nên đa số người chơi lựa chọn nuôi. Sở hữu một hồ showa koi
                  trong không gian sẽ tượng trưng cho sự bền bỉ, sự can đảm và
                  mang lại nhiều may mắn.Nếu quý đang muốn sở hữu cho mình một
                  hồ cá Koi showa đẹp, hoàn hảo nhất hãy đến với chúng tôi IKoi
                  để mua được những con cá chất lượng tốt nhất và giá cả hợp lý
                  nhất. <br />
                  Tự hào là cơ sở cung cấp cá Koi uy tín nhất Việt Nam, có đội
                  ngũ chuyên gia tư vấn, chăm sóc và hướng dẫn nuôi cá đúng cách
                  nhất sẽ giúp quý vị chọn và tập huấn khi mới bắt đầu nuôi.
                  Ngoài ra, theo lịch định kỳ chúng tôi sẽ cử chuyên gia đến
                  kiểm tra cho hồ cá của quý vị. Hãy liên hệ với chúng tôi để
                  được tư vấn kỹ lưỡng hơn. <br />
                  Bài viết ở trên là những thông tin chia sẻ về showa koi, hy
                  vọng với những thông tin này, quý vị và các bạn sẽ quyết định
                  sở hữu cho mình một bể cá Koi hoàn hảo nhất. chúng tôi hy vọng
                  đem đến cho bạn những thông tin hữu ích và cần thiết nhất.
                </Paragraph>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <img src="src/assets/img_4.png" />
              </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src="src/assets/img_5.png"
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </div>
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
