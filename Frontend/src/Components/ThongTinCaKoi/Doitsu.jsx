import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import CardGrid from "../Cardgrid";
import Footer from "../Footer";
import axios from "axios";
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-Doitsu/doitsui.webp";
import img2 from "../../assets/Koi-Doitsu/ca-koi-doitsu-2.webp";
import img3 from "../../assets/Koi-Doitsu/ca-koi-doitsu-1.webp";
import img4 from "../../assets/img_4.png";
import img5 from "../../assets/img_5.png";
export default function Doitsu() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idDoitsu, setIDDoitsu] = useState(null);
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
    const doitsuCard = categoryData.find(
      (card) => card.CategoryName === "Doitsu"
    );

    if (doitsuCard) {
      setIDDoitsu(doitsuCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idDoitsu) {
      const filtered = cardData.filter((card) => card.CategoryID === idDoitsu);
      setFilteredCards(filtered);
    }
  }, [idDoitsu, cardData]);
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
                      1. Giới thiệu về Cá Koi Doitsu
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
                      2. Cách nhận biết cá Koi Doitsu
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
                      3. Các dòng koi doitsu đẹp trên thị trường
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
                      4. Cách chọn mua Doitsu Koi đẹp, chất lượng
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
                      5. Cách chăm sóc Cá Koi Doitsu
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
                      6. Giá cá koi Doitsu bao nhiêu?
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
                      7. Tại sao nên mua Doitsu Koi tại IKoi:
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="noidungchitiet">Nội dung chi tiết</h2>
                <Paragraph className="paragraph-Style">
                  Cá Koi Doitsu hay còn có cái tên gọi khác là sexy Koi - một
                  giống cá Koi duy nhất chỉ có hai đường vẩy nhỏ cạnh vây lưng.
                  Có thể nói giống cá Koi da trơn này vô cùng đặc biệt và được
                  đông đảo người chơi cá yêu thích. Cùng tìm hiểu một số thông
                  tin cụ thể về dòng Doitsu Koi ở bài viết sau.
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
                  1. Giới thiệu về Cá Koi Doitsu
                </h3>
                <Paragraph className="paragraph-Style">
                  Cá Koi Doitsu ra đời vào những năm 1904, với hình dáng độc
                  đáo, là sự kết hợp lai giữa hai dòng cá Koi Nhật Bản và cá da
                  trơn của Đức. Điểm nổi bật của những chú cá Doitsu Koi là
                  không có vảy, hoặc có chỉ dọc theo 2 bên vây lưng bạn có thể
                  quan sát bằng mắt thường. Tuy nhiên, rất ít cá Koi Doitsu
                  không hề có một chiếc vẩy nào, mà chúng vẫn có những đặc điểm
                  giống cá chép Nhật.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} style={{ width: "50%" }} />
                  <p style={{ fontSize: "15px", fontWeight: "400" }}>
                    Dòng cá Koi Doitsu
                  </p>
                </div>
                <div style={{ fontSize: "15px", fontWeight: "400" }}>
                  <ul>
                    <li>
                      <Text className="text-Style">
                        Kích thước hồ cá Doitsu tối thiểu: 1000 gallon
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Mức độ chăm sóc: Dễ dàng
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Tính cách: Hòa Bình</Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Điều kiện nước: 36-90◦F, KH 2-12, pH 6,8-7,2
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Kích thước tối đa: 90 cm
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">
                        Màu sắc: Đỏ, đen, trắng.
                      </Text>
                    </li>
                    <li>
                      <Text className="text-Style">Chế độ ăn: Ăn tạp</Text>
                    </li>
                    <li>
                      <Text className="text-Style" s>
                        Họ: Cyprinidae
                      </Text>
                    </li>
                  </ul>
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
                  2.Cách nhận biết cá Koi Doitsu
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Để nhận biết cá Koi Doitsu giữa các loại cá Koi khác như
                    shusui koi bạn có thể dựa vào một số đặc điểm nổi bật riêng
                    chỉ có ở dòng cá này như. Vảy cá Doitsu có ít, nhưng những
                    lớp vảy này tạo nên các nét đẹp riêng cho cá. Một lớp vảy
                    bất thường ở sai vị trí có thể phá hỏng hết vẻ đẹp riêng của
                    con cá Koi Doitsu này. Vì thế mà Doitsu Koi thường có vảy ở
                    lưng dọc theo vây và các đường bên cơ thể được sắp xếp gọn
                    gàng theo dọc lưng cá.
                    <br />
                    Tuy nhiên ngày nay các nhà lai tạo đã cố gắng nhân giống
                    Doitsu với càng ít vảy càng tốt để có thẻ tạo ra những con
                    cá đẹp và hoàn hảo nhất. <br />
                    Một điểm để nhận biết Doitsu Koi chính là màu sắc cá. Bạn có
                    thể nhận biết bằng mắt thường bởi dòng Doitsu khác với các
                    dòng Kohaku bởi tỷ lệ màu Hi và Shiroji có sự cân bằng của
                    hai màu. <br />
                    Tuy nhiên dòng Doitsu vẫn có khá nhiều phiên bản khác nhau
                    như Heisei Nishiki ,.. Một vài giống Doitsu mới nhất hiện
                    nay mà bạn có thể quan tâm như là Doitsu Goshiki và Doitsu
                    Metal Ochibashigure. Đây đều là thuộc dòng cá Koi Doitsu
                    nhưng được lai tạo khác đi để tạo ra vẻ đẹp tuyệt vời và
                    hoàn hảo theo cách riêng tạo ra hồ cá Koi tuyệt đẹp.
                  </Paragraph>
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
                  3. Các dòng koi doitsu đẹp trên thị trường
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá koi doitsu là kết quả của một cuộc lai tạo giữa cá chép
                    Nhật và cá chép da trơn Đức, nên nó vẫn được phân loại dựa
                    theo màu sắc y hệt như các giống cá koi Nhật có vẩy khác.
                    Sau đây là một số dòng doitsu đẹp sau:
                    <p>
                      <span className="span-Style">
                        Cá koi Doitsu Kujaku : {""}
                      </span>{" "}
                      <Paragraph className="paragraph-Style">
                        Gồm ba màu trắng, đen xám và đỏ, thoạt nhìn qua khá
                        giống koi sanke tuy nhiên khác ở chỗ là chỉ hai hàng vẩy
                        cạnh vây lưng và phần đầu vai và tiếp giáp đuôi có một
                        chút đốm đen, còn lại là màu trắng và đỏ. Các mảng đỏ
                        (hi) trên lưng lớn và có cả những mảng hi nhỏ ở trên đầu
                        và trên lưng.
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">Cá koi Doitsu Kujaku :</span>{" "}
                      <Paragraph className="paragraph-Style">
                        Có hai màu trắng và vàng, đặc biệt màu vàng của cá koi
                        Doitsu Hariwake giống với màu vàng kim loại chứ không
                        phải màu vàng thông thường. Đốm vàng (ki) là những đốm
                        nhỏ và có một mảng lớn ở phần tiếp giáp của đuôi. Đây là
                        loại koi doitsu đẹp và hiếm, rất ít người mua Việt Nam
                        có thể sở hữu loại koi này.
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">
                        Cá koi Doitsu Kujaku : {""}
                      </span>{" "}
                      <Paragraph className="paragraph-Style">
                        Nó có màu vàng sậm (hơi cam), hai hàng vảy nổi rõ bên
                        cạnh vây lưng. Một tính năng đặc trưng của dòng là một
                        màu đồng nhất và làn da mịn màng.
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">Cá koi Doitsu Goshiki:</span>{" "}
                      <Paragraph className="paragraph-Style">
                        Giống koi hai màu trắng và đỏ tựa như koi kohaku, tuy
                        nhiên khác ở lớp da bóng như cao su cùng mảng màu đồng
                        kích thước nhỏ trên lưng. Màu đỏ của loại koi doitsu này
                        là đỏ đậm, phần hi chiếm đến 60 % toàn bộ thân cá với
                        các mảng lớn liền mạch, không rời rạc..
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">Cá koi Doitsu Goshiki:</span>{" "}
                      <Paragraph className="paragraph-Style">
                        Giống koi hai màu trắng và đỏ tựa như koi kohaku, tuy
                        nhiên khác ở lớp da bóng như cao su cùng mảng màu đồng
                        kích thước nhỏ trên lưng. Màu đỏ của loại koi doitsu này
                        là đỏ đậm, phần hi chiếm đến 60 % toàn bộ thân cá với
                        các mảng lớn liền mạch, không rời rạc..
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">Cá koi Doitsu Ochiba:</span>{" "}
                      <Paragraph className="paragraph-Style">
                        Chỉ có 2 màu đỏ, cam và trắng, da cá nhẵn bóng, không có
                        các vệt sumi đen hay đồng trên thân cá. Các đốm đỏ
                        cam/cam phân bố đối xứng, giáp đuôi màu đỏ, trên đầu,
                        mắt và miệng xuất hiện các sọc đỏ.
                      </Paragraph>
                    </p>
                    <p>
                      <span className="span-Style">Cá koi Doitsu Sanke:</span>{" "}
                      <Paragraph className="paragraph-Style">
                        Sự kết hợp giữa màu nền trắng với lông đỏ và đế sumi
                        đen, đầu không chân màu đen và lớp da cao su sáng bóng.
                      </Paragraph>
                    </p>
                  </Paragraph>
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
                  4. Cách chọn mua Doitsu Koi đẹp, chất lượng
                </h3>
                <div>
                  <div style={{ textAlign: "center" }}>
                    <img src={img2} style={{ width: "50%" }} />
                    <p style={{ fontSize: "15px", fontWeight: "400" }}>
                      Doitsu Koi đẹp
                    </p>
                  </div>
                </div>
                <Paragraph className="paragraph-Style">
                  Để mua được chú cá Koi Doitsu khỏe mạnh, chất lượng tốt bạn
                  cần có những tiêu chí hàng đầu để đánh giá cá sau:
                </Paragraph>
                <ul
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    listStyleType: "none",
                  }}
                >
                  <li>
                    <span className="span-Style" style={{ color: "#920202" }}>
                      {" "}
                      Vảy{" "}
                    </span>
                    <Paragraph className="paragraph-Style">
                      Koi Doitsu là dòng cá không có vảy hoặc có ít vảy, và nếu
                      có vảy thì phải ở vị trí đẹp tạo được sự độc đáo riêng cho
                      cá. Thường vảy giáp cá sẽ xuất hiện rõ ràng, mỗi bên vây
                      lưng có 1 hàng.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style" style={{ color: "#920202" }}>
                      Màu sắc của cá
                    </span>
                    <Paragraph className="paragraph-Style">
                      Tránh chọn cá có dáng bơi lắc lư lay động, râu hở, râu
                      không đều, miệng méo, phần cuối thân của cá bị cong hoặc
                      phần trên thân cá có vết trầy xước.{" "}
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style" style={{ color: "#920202" }}>
                      Hình dáng của cá
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cá Doitsu có hình thể, có hình dáng giống như một chiếc
                      tàu ngầm, bụng cá không được quá phệ. Nên chọn cá có thân
                      hình vừa phải, không quá dài cũng không quá ngắn giúp cá
                      phát triển tốt nhất.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style" style={{ color: "#920202" }}>
                      Dáng bơi
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cũng là yếu tố khi mua Koi Doitsu cần quan tâm với dáng
                      bơi uốn lượn, khả năng di chuyển hài hòa, nét người khỏe
                      khoắn, nhanh nhẹn của cá Koi.
                    </Paragraph>
                  </li>
                </ul>
              </div>

              <div id="5">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  5. Cách chăm sóc Cá Koi Doitsu:
                </h3>
                <Paragraph className="paragraph-Style">
                  Cá Koi Doitsu là dòng cá đẹp và vô cùng đặc biệt và đẹp mắt
                  tuy nhiên việc nuôi dưỡng cá khá khó khăn, nếu không khéo léo
                  có thể trong quá trình nuôi dưỡng cá dễ mắc bệnh.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img3} style={{ width: "50%" }} />
                </div>
                <Paragraph className="paragraph-Style">
                  Khi chăm sóc cá Doitsu Koi cũng như Matsuba koi tốt cần lưu ý:
                </Paragraph>
                <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Thay nước hồ thường xuyên và nên diễn ra từ từ không nên
                      rút hết nước thay ngay để tránh cá bị bất ngờ, khó thích
                      nghi với điều kiện nước đang sử dụng.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Sử dụng hệ thống lọc nước an toàn để duy trì sự trong sạch
                      đảm bảo cá phát triển tốt nhất. Môi trường để cá Koi
                      Doitsu phát triển tốt nhất là có thể tích nước lớn hơn
                      1000 Gallon nước, có ít cây thủy sinh xung quanh để cá
                      phát triển.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Là dòng cá ăn tạp, nhưng khi cho Koi Doitsu ăn bên cũng
                      nên chú ý. Chỉ cho ăn các loại rau củ quả vừa phải, hạn
                      chế ăn quá no ảnh hưởng tới sức khỏe. Bên cạnh đó không
                      nên cho cá Koi ăn vào trời mưa bởi chúng sẽ cần nhiều oxy
                      để tiêu thụ thức ăn hơn bình thường.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Nên thường xuyên theo dõi và quan sát cá Koi phát triển có
                      tốt không hay có các biểu hiện lạ như lười ăn, chậm bơi…
                      thì nên liên hệ với đơn vị uy tín để được tư vấn, chăm sóc
                      cá Koi ngay tránh lây bệnh cho các con khác.
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="6">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  6. Giá cá koi Doitsu bao nhiêu?
                </h3>
                <Paragraph className="paragraph-Style">
                  Hiện tại IKoi đang cung cấp dòng cá koi Doitsu chuẩn từ cá
                  nhật đến cá F1 với giá cực kỳ ưu đãi. Có thể nói Siêu thị Cá
                  Koi VN là một trong những đơn vị cung cấp cá koi với giá rẻ
                  nhất thị trường, mà chất lượng cũng rất đảm bảo. Giá cá koi
                  nhật và f1 như sau:
                </Paragraph>
                <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Đối với những con Doitsu f1 có kích thước từ 18cm – 40cm,
                      giá cá koi dao động từ 150.000 – 500.000 VNĐ tùy loại.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Cao cấp hơn là những con Doitsu f1 có kích thước từ 50cm –
                      55cm, được chia làm loại 1, loại 2 và 3. Giá thành dao
                      động từ 1.800.000 – 3.000.000 VNĐ tùy loại.
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="7">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  7. Tại sao nên mua Showa Koi tại IKoi:
                </h3>
                <Paragraph className="paragraph-Style">
                  Tự hào là đơn vị chuyên cung cấp cá Doitsu Koi khỏe mạnh, chất
                  lượng và uy tín hàng đầu hiện nay, IKoi sẽ bạn lựa chọn được
                  loại cá phù hợp với không gian sống của bạn. Chúng tôi sẽ hỗ
                  trợ tư vấn, hướng dẫn quá trình chăm sóc hồ cá Koi thủy sinh
                  an toàn, đảm bảo chất lượng với chi phí phù hợp nhất. Đến với
                  IKoi các bạn thoải mái chiêm ngưỡng vẻ đẹp của những chú cá
                  Koi Nhật tuyệt vời nhất. Nếu có thắc mắc hay cần hỗ trợ tư vấn
                  mua cá Koi Doitsu hãy liên hệ ngay với IKoi để được phục vụ
                  tốt nhất.
                </Paragraph>
              </div>
            </div>
          </div>
        </Container>
        <div style={{ display: "flex" }}>
          <div>
            <img src={img4} />
          </div>
          <div style={{ textAlign: "center" }}>
            <img src={img5} />
          </div>
        </div>
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
