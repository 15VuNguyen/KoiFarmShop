import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
import "../Css/koiStyle.css";
const { Title, Text, Paragraph } = Typography;
import { Spin } from "antd"; // Import the Spin component
export default function Kohaku() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idKohaku, setIdKohaku] = useState(null);
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
            response.data.cateogoryList
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
    const kohakuCard = categoryData.find(
      (card) => card.CategoryName === "Kohaku"
    );

    if (kohakuCard) {
      setIdKohaku(kohakuCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idKohaku) {
      const filtered = cardData.filter((card) => card.CategoryID === idKohaku);
      setFilteredCards(filtered);
    }
  }, [idKohaku, cardData]);
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
              <div className="body_StyleKoiOfPage">
                <Title level={2} style={{ color: "red" }}>
                  Nội Dung Bài Viết
                </Title>
                <ul style={{ marginTop: "10px" }}>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll1}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      1. Giới thiệu cá Koi Kohaku
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll2}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      2. Các đặc điểm thường gặp trên cá Koi Kohaku
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll3}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      3. Các giống Koi Kohaku phổ biến nhất
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll4}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      4. Sự khác nhau giữa Koi Kohaku Nhật, Koi Kohaku F1
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll5}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      5. Cách chọn cá Koi Kohaku
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll6}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      6. Cách chăm sóc Koi Kohaku
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll7}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      7. Giá coi Koi Kohaku bao nhiêu?
                    </Text>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <Text
                          onClick={handleScroll71}
                          className="contentBox"
                          style={{ cursor: "pointer" }}
                        >
                          7.1 Giá Koi Kohaku F1
                        </Text>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <Text
                          onClick={handleScroll72}
                          className="contentBox"
                          style={{ cursor: "pointer" }}
                        >
                          7.2 Giá Koi Kohaku Nhật chuẩn
                        </Text>
                      </li>
                    </ul>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll8}
                      className="contentBox"
                      style={{ cursor: "pointer" }}
                    >
                      8. Tại sao nên mua Koi Kohaku tại KoiVNStore
                    </Text>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="noidungchitiet">Nội dung chi tiết</h2>
                <Paragraph style={{ fontSize: "20px", fontWeight: "400" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "blue",
                    }}
                  >
                    Cá Koi{" "}
                  </span>
                  là giống cá được ưa chuộng để làm cảnh, trang trí không gian
                  sống trở lên hoàn hảo cho người đam mê cá cảnh. Với đa dạng
                  giống loài, màu sắc và kích thước nổi bật trong đó là dòng{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "blue",
                    }}
                  >
                    Cá Koi Kohaku{" "}
                  </span>
                  đẹp mắt. Bài viết này sẽ cung cấp cho bạn chi tiết về dòng
                  Kohaku koi mới nhất để bạn chọn được loại cá phù hợp cho mình.
                </Paragraph>
              </div>
              <div id="1">
                <h3 style={{ color: "red" }}>1. Giới Thiệu Cá Koi Kohaku</h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Kohaku hay Nishikigoi là một loài cá chép Nhật có thân hình
                    hai màu đỏ và trắng. Phần thân màu trắng được gọi là shiro,
                    các dấu đỏ được gọi là hi. Chúng là một trong big three, gồm{" "}
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "blue",
                      }}
                    >
                      Kohaku, Sanke
                    </span>{" "}
                    và{" "}
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "blue",
                      }}
                    >
                      Showa
                    </span>
                    .
                  </Paragraph>

                  <Paragraph className="paragraph-Style">
                    Theo truyền thuyết, Kohaku là giống cá chép đầu tiên được
                    phát triển. Vào năm 1888, Kunizo, một người đàn ông, đã lai
                    tạo một con cá chép koi màu đỏ với một trong những con đực
                    của mình, tạo ra một thế hệ mới của giống cá chép koi được
                    gọi là Gosuke. Tuy nhiên, dòng Gosuke đã tuyệt chủng sau đó,
                    và hiện nay, các dòng Tomoin và Yagozen là hai dòng máu
                    Kohaku lớn còn lại ở Nhật Bản.
                  </Paragraph>

                  <Paragraph className="paragraph-Style">
                    Kohaku là một trong những giống cá chép phổ biến nhất ở Nhật
                    Bản. Các dấu màu đỏ tươi trên thân cá được gọi là hi. Các
                    dòng cá như Tomoin, Sensuke, Yagozen và Manzo hiện nay đều
                    bắt nguồn từ giống cá chép Gosuke ban đầu.
                  </Paragraph>
                </div>
              </div>

              <div id="detailed-content">
                <h3 style={{ color: "red" }} id="2">
                  2. Các đặc điểm thường gặp trên cá Koi Kohaku
                </h3>

                <Paragraph className="paragraph-Style">
                  Các tiêu chuẩn này chỉ áp dụng cho các loài cá trưng bày tại
                  triển lãm ở Nhật Bản. Các loài cá được giữ làm vật nuôi tại
                  nhà riêng không cần phải tuân thủ các tiêu chuẩn này. Có một
                  số từ được sử dụng để mô tả các đặc điểm trên một con cá
                  Kohaku như sau:
                </Paragraph>
                <ul className="text-Style">
                  <li>
                    <span className="span-Style">Akamuji: </span>{" "}
                    <Text className="text-Style ">
                      là một loài cá đỏ thông thường và thường xuất hiện trong
                      quá trình sinh sản của loài Kohaku. Trước đây, ở Nhật Bản,
                      các con cá Akamuji thường bị đánh bại để làm cá bột. Tuy
                      nhiên, từ năm 1990, chúng trở nên phổ biến và thường được
                      trưng bày trong thể loại Kawarimono như Benigoi hoặc Hiaka
                      tại triển lãm. Một con cá Akamuji có các mảng trắng trên
                      đầu vây được gọi là Aka Hajiro.
                    </Text>
                  </li>
                  <li>
                    <span className="span-Style">Shiromuji:</span>{" "}
                    <Text className="text-Style ">
                      Shiromuji đối lập với Akamuji khi có thân hình trắng toàn
                      phần và xuất hiện trong quá trình sinh sản của loài
                      Kohaku. Ở Nhật Bản, các con cá Shiromuji không được coi là
                      có giá trị. Thay vào đó, loài cá koi tương tự có vảy kim
                      loại - bạch kim koi lại được ưa chuộng.
                    </Text>
                  </li>
                  <li>
                    <span className="span-Style">Komoyō:</span>{" "}
                    <Text className="text-Style ">
                      Với loài cá Komoyō, kích thước của các dấu đỏ rất nhỏ, chỉ
                      chiếm ít hơn ¼ chiều dài của chúng. Chúng không được đánh
                      giá cao.
                    </Text>
                  </li>
                  <li>
                    <span className="span-Style">Ōmoyō:</span>{" "}
                    <Text className="text-Style ">
                      Ngược lại với Komoyō, loài cá Ōmoyō có các dấu đỏ lớn, ít
                      nhất là một phần tư chiều dài của cá. Điều này được đánh
                      giá cao và theo lứa tuổi của cá, các dấu hiệu sẽ tách biệt
                      để tạo ra những mô hình thú vị.
                    </Text>
                  </li>
                  <li>
                    <span className="span-Style">Dangara:</span>{" "}
                    <Text className="text-Style">
                      là một mô hình dấu hiệu tách biệt giống như bước đá trong
                      một hồ bơi. Đây là những giá trị rất lớn trong cạnh tranh.
                      Một sọc đơn từ đầu đến đuôi không có giá trị ở Nhật Bản,
                      nhưng nếu nó tạo thành một mô hình zig-zag thì được gọi là
                      inazuma. Tên này bắt nguồn từ triển lãm All Nippon Show
                      năm 1970, khi người chiến thắng đã tạo ra một hình mẫu
                      inazuma nổi bật. Dangara cũng có thể có hai đốm đỏ, được
                      gọi là Hai bước.
                    </Text>
                  </li>
                </ul>
              </div>
              <div id="3">
                <h3 style={{ color: "red" }}>
                  3. Các giống kohaku phổ biến nhất
                </h3>
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                  <img
                    src="src/assets/gioithieukoikohaku.webp"
                    style={{ objectFit: "cover", width: "70%" }}
                  />
                </div>
                <ul>
                  <li>
                    <span className="span-Style">Menkaburi Kohaku</span>
                    <Text className="text-Style">
                      : dấu hiệu nhận biết của giống Kohaku này là toàn bộ phần
                      đầu cá được bao phủ bởi màu đỏ, phần đỏ trên đầu sẽ tách
                      biệt với màu đỏ ờ phần thân
                    </Text>
                  </li>
                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Hanatsuke Kohaku</span>
                    <Text className="text-Style">
                      : cách để phân biệt giống này cũng khá là đơn giản đó là
                      có màu đỏ ở phần mũi của cá kéo dài lên phần đầu và thân.
                    </Text>
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/hanatsukekohaku.webp"
                        style={{
                          width: "50%",
                          paddingTop: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Hanatsuke Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Inazuma Kohaku</span>
                    <Text className="text-Style">
                      : Vùng đỏ của giống cá này trải dài từ đầu thới đôi theo
                      hình ziczac vô cùng đặc biệt
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/inazumakohaku.webp"
                        style={{
                          width: "30%",
                          paddingTop: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Inazuma Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Goten Sakura Kohaku</span>
                    <Text className="text-Style">
                      : Phần đỏ trên đầu tương đối giống tancho kohaku. Ngoài ra
                      trên thân còn có các đốm đỏ phân bổ đều trên thân
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/gotensakurakohaku.webp"
                        style={{ width: "50%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Goten Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Tancho Kohaku</span>
                    <Text className="text-Style">
                      : Dòng cá này rất được coi trọng ở nhật vì nó trong giống
                      là quốc kỳ của họ. Toàn thân cá có màu trắng, không có một
                      vết gì, đồng thời trên đầu có khoang đỏ với nhiều hình
                      dạng khác nhau rất dễ phân biệt
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/tanchokohaku.webp"
                        style={{ width: "50%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">Giống Tancho Koi</Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Kuchibeni kohaku</span>
                    <Text className="text-Style">
                      : giống cá này đặc biệt ở chỗ khi có một chấm đỏ ở mũi,
                      tách biệt với các khoang đỏ khác trên thân cá. Điều này
                      khác với Hanatsuke Kohaku Koi khi có chấm đỏ ở mũi và kéo
                      dài lên phần đầu
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/kuchibenikohaku.webp"
                        style={{
                          width: "30%",
                          paddingTop: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">Giống Kuchibeni Koi</Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Straight Hi Kohaku</span>
                    <Text className="text-Style">
                      : Điểm đặc biệt của giống cá này là phần đỏ chiếm nhiều
                      trên thân cá, không ngắt quãng từ phần đầu cho tới phần
                      chân.
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/straighthikohaku.webp"
                        style={{ width: "30%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Straight Hi Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Nidan Kohaku</span>
                    <Text className="text-Style">
                      : Cũng giống như Straight Hi Kohaku khi màu đỏ chiếm đa số
                      trên thân. Tuy nhiên dòng cá này khác biệt ở chỗ sẽ có
                      phần trắng ở giữa thân chia phần đỏ thành 2 phần
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/nidankohaku.webp"
                        style={{
                          width: "30% ",
                          paddingTop: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Nidan Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Sandan Kohaku</span>
                    <Text text-Style>
                      : phần màu đỏ sẽ chia thành 3 khoang riêng biệt là đầu,
                      thân và đuôi
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/sandankohaku.webp"
                        style={{
                          width: "30%",
                          paddingTop: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Sandan Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Yondan Kohaku Koi</span>
                    <Text className="text-Style">
                      Phần khoang đỏ sẽ chia thành 4 phần khác với Sandan Kohaku
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/yandankohakukoi.webp"
                        style={{ width: "30%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Yondan Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Kanoko Kohaku</span>
                    <Text className="text-Style">
                      : Vùng đầu của cá là một khoang màu đỏ sẫm khá đậm, trên
                      thân cá xuất hiện những chấm đỏ li ti.
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/kanokokohaku.webp"
                        style={{ width: "30%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Kanoko Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>

                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <span className="span-Style">Maruten Kohaku</span>
                    <Text className="text-Style">
                      : Cơ thể giống loài cá này có 3-4 ngăn màu đỏ nằm cách xa
                      nhau hoặc thông với nhau. Chấm đỏ trên đầu không được tiếp
                      giáp với khoang đỏ trên cơ thể.
                    </Text>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="src/assets/marutenkohaku.webp"
                        style={{ width: "30%", paddingTop: "20px" }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <Text className="text-Style">
                          Giống Maruten Kohaku Koi
                        </Text>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="4">
                <h3 style={{ color: "red", fontWeight: "600" }}>
                  4. Sự khác nhau giữa Koi Kohaku Nhật , Koi Kohaku F1
                </h3>
                <p>
                  <span className="span-Style">Về nguồn gốc Kohaku</span>
                </p>
                <ul>
                  <li>
                    <Text className="text-Style">
                      Cá koi kohaku nhật nhập khẩu: là dòng cá thuần chủng được
                      nuôi ở các trại cá ở Nhật Bản và được IKoi nhập khẩu trực
                      tiếp về
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Cá koi kohaku F1: là dòng cá được lai tạo từ cặp cá bố mẹ
                      là cá koi nhật thuần chủng và nuôi lớn ỏ Việt Nam theo quy
                      trình của Nhật Bản
                    </Text>
                  </li>
                </ul>
                <span className="span-Style">Về nguồn gốc</span>
                <ul>
                  <li>
                    <Text className="text-Style">
                      Kohaku Nhật: Cơ thể có 2 màu trắng đỏ, các khoang đỏ thì
                      có màu đỏ như máu, còn khoang trắng thì màu trắng sáng, có
                      vảy ánh bạc. Màu sắc của cá koi Nhật rất tươi sáng và có
                      ranh giới rõ ràng, các đốm to và đều ở hai bên (khi nhìn
                      từ trên xuống, dọc theo sống lưng).
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Kohaku koi F1: Màu sắc của các khoang trên cơ thể sẽ nhạt
                      hơn, thường là màu đỏ cam. Ranh giới giữa các ngăn đỏ và
                      trắng bị mờ, không rõ ràng.
                    </Text>
                  </li>
                </ul>
                <span className="span-Style">Về hình dáng</span>
                <ul style={{ fontWeight: "400", fontSize: "15px" }}>
                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    <Text className="text-Style ">
                      Kohaku Nhật có cặp râu dài và cứng, đầu cá hơi gù, Kohaku
                      F1 cũng có râu nhưng nhỏ và ngắn hơn cá koi nhật.
                    </Text>
                  </li>
                  <li style={{ fontWeight: "400", fontSize: "15px" }}>
                    {" "}
                    <Text className="text-Style">
                      Vây ngực, vây lưng và vây đuôi của koi Nhật Bản thường rất
                      dày và mờ đục (ánh sáng không xuyên qua nhiều được), còn
                      Vây của cá F1, nhỏ, ít mềm và dẻo hơn và ánh sáng dễ chiếu
                      qua hơn.
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Kohaku Nhật khi nhìn từ trên xuống sẽ mập hơn cá koi F1 ở
                      phần đầu và vai. Nhìn ngang sẽ thấy Koi kohaku Nhật có
                      phần hông hơi ngắn tuy nhiên thân hình thì thuôn dài hơn
                      so với koi F1.
                    </Text>
                  </li>
                </ul>
              </div>
              <div id="5">
                <h3 style={{ color: "red", fontWeight: "600" }}>
                  5. Cách chọn cá koi kohaku
                </h3>
                <Text className="text-Style">
                  Cách chọn cá Koi Kohaku đẹp thì bạn cần phải dựa vào màu sắc
                  và dáng bơi để chọn mua cá chuẩn.
                </Text>
                <ul>
                  <li>
                    <span className="span-Style">Màu sắc cá</span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Đây là yếu tố quan trọng để đánh giá vẻ đẹp của dòng cá
                      Kohaku. Nếu cá Koi có màu sắc rõ ràng, đường ranh giữa các
                      mảng màu trên cá tách biệt rõ ràng, không bị phân lẫn và
                      chồng lên nhau thì đó là một chú cá đẹp nên chọn
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style">Dáng bơi</span>

                    <Paragraph className="paragraph-Style">
                      Bơi là hoạt động hàng ngày của Kohaku koi vì thế để chọn
                      cá Koi tốt bạn nên nhìn dáng bơi của chúng phải uyển
                      chuyển, dáng bơi thẳng, khỏe mạnh lao vun vút về phía
                      trước.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style">Chất lượng da, vảy</span>
                    <Paragraph className="paragraph-Style ">
                      Đừng nhầm lẫn màu sắc với da bởi một con cá Kohaku trưởng
                      thành sẽ có màu cam đỏ đậm rất đẹp, còn cá Kohaku nhỏ thì
                      màu sắc không rõ ràng. Da cá sẽ là yếu tố quyết định đến
                      vảy cá, nên chọn da cá nhẵn mịn, trơn bóng thì vảy cá
                      Kohaku sẽ đều đặn và chất lượng hơn.
                    </Paragraph>
                  </li>
                </ul>
                <Paragraph className="paragraph-Style ">
                  Ngoài ra bạn có thể dựa vào một số đặc điểm sau khi chọn cá
                  Koi Kohaku gồm:
                </Paragraph>
                <ul>
                  <li>
                    <Text className="text-Style">
                      Màu rõ ràng là màu trắng tinh như tuyệt, đỏ đậm, lớn
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Chú ý phần đầu phải có 2 màu không thể toàn bộ là đỏ hoặc
                      trắng.
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Màu đỏ ở đầu không nên phủ mắt hoặc chỉ phủ một bên mắt
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Màu mắt của cá Koi Kohaku phải là màu trắng không phải màu
                      xanh.
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Phân bố các khoang màu đỏ đều đặn trên cơ thể
                    </Text>
                  </li>
                  <li>
                    <Text className="text-Style">
                      Màu của mũi và vùng chóp đuôi là màu trắng
                    </Text>
                  </li>
                </ul>
              </div>
              <div id="6">
                <h3 style={{ color: "red" }}>6. Cách chăm sóc cá Koi Kohaku</h3>
                <Paragraph className="paragraph-Style">
                  Vì Kohaku koi là loài thông minh có thể sống trong nhiều thập
                  kỷ vì thế khi chăm sóc cá Koi Kohaku bạn cần lưu ý về điều
                  kiện môi trường và yếu tố xung quanh sẽ làm ảnh hưởng tới quá
                  trình phát triển của chúng.
                </Paragraph>
                <ul>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Cá koi có thể tồn tại trong nhiều nhiệt độ nước, khả năng
                      chịu lạnh tốt. Tuy nhiên không nên để đáy hồ bị đóng băng
                      để hạn chế ảnh hưởng cá phát triển.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Hạn chế để cá Koi Kohaku tiếp xúc trực tiếp với ánh sáng
                      mặt trời, bạn nên tạo không gian thoáng mát để cá koi thư
                      giãn bên trong.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Kohaku koi là dòng ăn tạp nên chúng có thể ăn bất cứ thứ
                      gì như tảo, giun, ốc, côn trùng,.. Tuy nhiên không nên cho
                      cá Koi ăn quá nhiều sẽ dẫn tới thừa cân, gây ô nhiễm môi
                      trường nước trong ao.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Nên theo dõi bể cá Koi thường xuyên để biết cá sinh trưởng
                      thế nào, có gặp vấn đề gì không. Nếu bạn không có nhiều
                      kinh nghiệm có thể liên hệ siêu thị cá Koi VN để được tư
                      vấn hỗ trợ, giải đáp thắc mắc nhanh chóng.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Luôn giữ độ pH trong bể nuôi trong khoảng 7 - 7,5. Nhiệt
                      độ nước: 20 - 27 độ C. Hàm lượng oxy tối thiểu trong bể
                      nuôi duy trì khoảng 2,5 mg / l.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Nếu trong nước có nồng độ Nitrite quá cao hoặc cần thay
                      nước hồ thì không nên thay một lần mà thay dần dần, cứ sau
                      2 ngày thì rút đi mỗi lần khoảng 1/3 thể tích hồ cho đến
                      khi nước hồ trong. .
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Cá koi sinh trưởng và phát triển mạnh trong hồ cá koi có
                      thể tích nước trên 1000 Gallon nước, nền tốt, ít cây thủy
                      sinh vì chúng sẽ phá hoại thực vật, ảnh hưởng đến chất
                      lượng nước của hồ. Không nên trang trí quá nhiều thứ trong
                      hồ cá Koi như sỏi, đá cứng,..Bởi cá Kahoku phần lớn ở dưới
                      đáy ao nên thường xuyên tiếp xúc với bề mặt đó. Nếu hồ cá
                      Koi gồ ghề có thể làm xước hoặc nhiễm trùng cá koi
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="7">
                <h3 style={{ color: "red" }}>
                  7. Giá cá Koi Kohaku bao nhiêu ?{" "}
                </h3>
                <Paragraph className="paragraph-Style">
                  Hiện tại IKoi đang cung cấp dòng cá koi Kohaku chuẩn từ cá
                  nhật đến cá F1 với giá cực kỳ ưu đãi. Có thể nói IKoi là một
                  trong những đơn vị cung cấp cá koi với giá rẻ nhất thị trường,
                  mà chất lượng cũng rất đảm bảo. Giá cá koi nhật và f1 như sau
                </Paragraph>
                <div id="71">
                  <span className="span-Style">7.1 Giá Koi Kohaku F1</span>
                  <Paragraph className="paragraph-Style">
                    Đối với những con Kohaku f1 có kích thước từ 18cm – 40cm,
                    giá cá koi dao động từ 150.000 – 500.000 VNĐ tùy loại. Cao
                    cấp hơn là những con Kohaku f1 có kích thước từ 50cm – 55cm,
                    được chia làm loại 1, loại 2 và 3. Giá thành dao động từ
                    1.800.000 – 3.000.000 VNĐ tùy loại.
                  </Paragraph>
                </div>
                <div id="72">
                  <span className="span-Style">
                    7.2 Giá cá koi Kohaku Nhật chuẩn
                  </span>
                  <Paragraph className="paragraph-Style">
                    Một con cá Koi trưởng thành Nhật Bản như Kohaku koi với kích
                    thước từ 10-15cm sẽ có giá từ 600.000 – 2.000.000VNĐ/con.
                    Ngoài ra còn có con Kohaku Koi thuần chủng … được xếp vào
                    hàng hiếm có kích thước lớn thì giá cá koi lên đến vài nghìn
                    đến hàng chục nghìn USD. Do đó nếu bạn muốn mua hãy liên hệ
                    với chúng tôi để được tư vấn tận tình.
                  </Paragraph>
                </div>
              </div>
              <div id="8">
                <h3 style={{ color: "red" }}>
                  8. Tại sao nên mua Koi Kohaku ở shop chúng tôi ?{" "}
                </h3>
                <Paragraph className="paragraph-Style">
                  Hiện nay có khá nhiều đơn vị cung cấp các dòng Koi Kohaku giá
                  thành và chất lượng trên thị trường. Đặc biệt là người mới bắt
                  đầu chơi cá Koi Kohaku sẽ rất khó khăn khi lựa chọn đơn vị
                  cung cấp cá Koi uy tín cho mình.
                  <br />
                  IKoi một trong những địa chỉ vàng uy tín để bạn lựa chọn mua
                  bán – thiết kế hồ cá Koi chính hãng cho người tiêu dùng. Chúng
                  tôi tự hào mang đến cho bạn nhiều loại cá Koi, trong đó có Koi
                  Kohaku đẹp, giá thành tốt cho bạn. Chưa kể tại đây chúng tôi
                  có đội ngũ chuyên gia giàu kinh nghiệm, tư vấn hỗ trợ lựa chọn
                  mua và chăm sóc cá Koi đúng cách. Vì vậy, nếu có nhu cầu tư
                  vấn, tìm hiểu các dòng cá Koi Kohaku hãy liên hệ ngay với IKoi
                  để được giải đáp nhanh chóng.
                  <br />
                  Một con cá Koi trưởng thành Nhật Bản như Kohaku koi với kích
                  thước từ 10-15cm sẽ có giá từ 600.000 – 2.000.000VNĐ/con.
                  Ngoài ra còn có con Kohaku Koi thuần chủng … được xếp vào hàng
                  hiếm có kích thước lớn thì giá cá koi lên đến vài nghìn đến
                  hàng chục nghìn USD. Do đó nếu bạn muốn mua hãy liên hệ với
                  chúng tôi để được tư vấn tận tình.
                </Paragraph>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>
              <img src="src/assets/img_4.png" />
            </div>
            <div>
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
