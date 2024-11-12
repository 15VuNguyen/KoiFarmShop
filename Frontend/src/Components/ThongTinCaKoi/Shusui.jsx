import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "../Footer";
import { Table } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import { Layout, Typography } from "antd";
import "../Css/koiStyle.css";
const { Title, Text, Paragraph } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-shusui/ca-koi-shusui-1.webp";
import img2 from "../../assets/Koi-shusui/ca-koi-shusui-2.webp";
import img3 from "../../assets/img_4.png";
import img4 from "../../assets/img_5.png";
export default function Shusui() {
  const [menu, setMenu] = useState("home");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idShusui, setIdKohaku] = useState(null);
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

  const handleScroll51 = () => {
    const element = document.getElementById("51");

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
  const handleScroll52 = () => {
    const element = document.getElementById("52");

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
    const shuisuiCard = categoryData.find(
      (card) => card.CategoryName === "Shusui"
    );

    if (shuisuiCard) {
      setIdKohaku(shuisuiCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idShusui) {
      const filtered = cardData.filter((card) => card.CategoryID === idShusui);
      setFilteredCards(filtered);
    }
  }, [idShusui, cardData]);
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
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      1. Giới thiệu về Cá Koi Shusui
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
                      2. Cách nhận biết Cá Koi Shusui
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
                      3. Cách chọn Cá Koi Shusui
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
                      4. Cách chăm sóc Cá Koi Shusui
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
                      5. Giá cá koi Shusui bao nhiêu?
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll51}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          5.1 Giá cá koi Shusui F1
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll52}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          5.2 Giá cá koi Shusui Nhật chuẩn
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
                      6. Tại sao nên mua Cá Koi Shusui tại IKoi?
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "red",
                    paddingTop: "20px",
                  }}
                >
                  Nội dung chi tiết
                </h2>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi đã không còn quá xa lạ với cộng đồng những người có
                    niềm đam mê với cá cảnh. Loài cá này thường có ưu điểm là
                    đẹp, dễ dàng cho việc chăm sóc, và nổi bật hơn rất nhiều
                    loài cá khác. Một trong số đó phải kể đến dòng cá Shusui Koi
                    với nhiều đặc điểm nổi bật. Hãy cùng Siêu Thị Cá Koi VN khám
                    phá về dòng cá này qua những thông tin được chia sẻ dưới
                    đây.
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
                  1. Giới thiệu về Cá Koi Shusui
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Shusui là dòng cá Koi đẹp đến từ Nhật Bản và có chất
                    lượng tốt hơn so với các dòng cá Koi từ các nước Đông Nam Á
                    khác. Shusui xuất hiện từ năm 1910, trước xuất hiện giống cá
                    Koi Kohaku hay KOI Showa.
                    <br />
                    Koi Shusui là một loại cá tạo ấn tượng từ cái nhìn đầu tiên
                    đối với khách hàng bởi 3 màu mạnh là đen, đỏ và trắng. Đây
                    là một trong số dòng cá có vảy đầu tiên, với làn da trắng
                    trong suốt. Hơn nữa màu sắc chủ đạo của cá còn tạo nên phong
                    thủy cho chủ sở hữu, màu sắc tạo nên sự phú quý, cao sang và
                    đem đến nhiều may mắn, tài lộc.
                    <br />
                    Thuộc dòng cá xuất hiện tương đối sớm cùng với sự nuôi dưỡng
                    và nghiên cứu để cá phát triển toàn diện nhất, nên hiện nay
                    giống Shusui Koi có giá trị kinh tế rất cao và được nhiều
                    người săn đón.
                  </Paragraph>
                </div>
                <div>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    style={{ fontSize: "15px", fontWeight: "400" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <Text className="text-Style">Tiêu chí</Text>
                        </th>
                        <th>
                          <Text className="text-Style">Thông tin</Text>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Text className="text-Style">
                            Kích thước bể cá tối thiểu
                          </Text>
                        </td>
                        <td>
                          <Text className="text-Style">1000 gallon</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Mức độ chăm sóc</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Dễ dàng</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Tính cách</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Hòa bình</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Điều kiện nước</Text>
                        </td>
                        <td>
                          <Text className="text-Style">
                            36-90 độ F, KH 2 – 12, pH 6.8 – 7.2
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Kích thước tối đa</Text>
                        </td>
                        <td>
                          <Text className="text-Style">90cm</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Màu sắc</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Đen, đỏ, trắng</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Chế độ ăn uống</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Ăn tạp</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Xuất xứ</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Nhật Bản</Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text className="text-Style">Thuộc họ</Text>
                        </td>
                        <td>
                          <Text className="text-Style">Cyprinidae</Text>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div id="detailed-content">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  2. Cách nhận biết Cá Koi Shusui
                </h3>
                <Paragraph className="paragraph-Style">
                  Về loại cá đang dần thịnh hành trên thị trường Việt Nam, Cá
                  Koi Shusui có những đặc điểm cụ thể để chúng ta có thể dễ dàng
                  nhận biết. Sau đây là một số miêu tả về Shusui Koi:
                </Paragraph>
                <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Kích thước tối đa : 90cm
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Màu sắc: Đen, đỏ, trắng
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Vẻ ngoài: Đẹp xuất sắc
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Có hai bên vảy đối xứng màu sắc
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Thuộc dòng da trơn, thân hình tròn trịa
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Là loại cá ăn tạp
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Đôi mắt tròn trịa
                    </Paragraph>
                  </li>
                </ul>
                <Paragraph className="paragraph-Style">
                  Màu sắc chủ đạo trên thân cá là đen, trắng, đỏ, tuy nhiên một
                  số cá thể Shusui koi đặc biệt còn có cả màu xanh ngọc. Các
                  khoang màu được sắp xếp đối xứng cân đối đẹp mắt. Các màu sắc
                  rõ nét, vảy màu xanh đen, thân cá màu đỏ thì đỏ chót, màu
                  trắng thì trắng như tuyết. Ranh giới giữa các bệt màu rõ nét,
                  không bị mờ nhòe.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img src={img1} />
                  <div style={{ textAlign: "center" }}>
                    <Text className="text-Style">
                      Cá Shusui độc đáo, mới lạ
                    </Text>
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
                  3. Cách chọn Cá Koi Shusui
                </h3>
                <Paragraph className="paragraph-Style">
                  Đối với người Nhật, Shusui Koi là từ ngữ đẹp, tượng trưng cho
                  may mắn, sức khỏe, sự nghiệp và tiền bạc. Cùng với Platinum
                  koi thì đây cũng là loại cá thường xuất hiện trong những cung
                  điện, triều đình của thời xưa. Chính vì thế, Cá Koi Shusui
                  không chỉ là những giống cá tạo cảnh, đem lại màu sắc đa dạng
                  cho hồ cá nhà bạn mà nó còn đem lại sự uy thế, quyền quý.{" "}
                  <br /> Vậy làm như thế nào để có thể chọn được những con Cá
                  Koi Shusui có chất lượng tốt nhất. Tại siêu thị Cá Koi VN, có
                  rất nhiều loại cá được đảm bảo đầu ra và được chăm sóc rất cẩn
                  thận. Về sức khỏe và tuổi thọ của những con Cá Koi tại đây thì
                  rất tốt. Để chọn Shusui Koi ưng ý nhất, hãy chọn những con
                  đang bơi khỏe, màu sắc đậm, đầu phải có màu trắng và sự đối
                  xứng của hai vẩy phải cân bằng.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={img2}
                    style={{ width: "50%", paddingBottom: "20px" }}
                  />
                </div>
              </div>
              <div id="4">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    paddingTop: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  4. Cách chăm sóc Cá Koi Shusui
                </h3>
                <Paragraph className="paragraph-Style">
                  Đây là dòng cá có nguồn gốc từ Nhật Bản và mang lại giá trị
                  cao sang cho ngôi nhà của bạn. Nhưng chắc hẳn ít ai biết được
                  cách chăm sóc Shusui Koi đúng cách. Sau đây sẽ là một số mẹo
                  cho các bạn có thể tham khảo để giúp Cá Koi Shusui cũng như
                  dòng Matsuba koi nhà mình được phát triển toàn diện nhất:
                </Paragraph>
                <ul>
                  <li>
                    <span className="span-Style ">
                      Về điều kiện hồ, bể nuôi cá:
                    </span>
                    <Paragraph className="paragraph-Style">
                      Môi trường sống sẽ tác lớn đến sức khỏe và sự phát triển
                      của cá sau này. Vì thế mà trước khi đưa Shusui Koi về với
                      ngôi nhà của mình, gia chủ phải có sự chuẩn bị cẩn thận và
                      về hồ, bể nuôi cá. Đầu tiên, phải xây hồ đảm bảo được diện
                      tích đủ rộng để Shusui Koi có thể thỏa sức bơi lội. Và nếu
                      những gia đình mà nuôi nhiều loại cá, thì phải đảm bảo
                      được mật độ bơi của các loại cá không quá dày, phải tạo độ
                      thoáng phù hợp. Mực nước trong hồ phải đảm bảo đủ cao để
                      cá không bị bơi cạn, nhiệt độ và độ ẩm cũng phải được
                      trang bị thích hợp với thân nhiệt của cá.
                      <br />
                      Để tạo một môi trường sinh thái tốt cho cá, chúng ta có
                      thể thiết kế những cây tảo, rêu, … Nhiều gia đình còn xây
                      nên một không gian vách đá, những bức tượng nhân tạo để
                      cho bể cá thêm phần thẩm mỹ cao.
                    </Paragraph>
                  </li>
                  <li>
                    <span className="span-Style ">Về thức ăn cho cá:</span>
                    <Paragraph className="paragraph-Style">
                      Với thân hình trơn thì chế độ ăn uống của Cá Koi Shusui
                      cũng phải được đảm bảo đủ chất và lượng. Thức ăn cho
                      Shusui Koi thường được các nhà sản xuất chế biến riêng
                      biệt để giúp cá phát triển toàn diện nhất. Khi Shusui Koi
                      được hấp thu những chất dinh dưỡng tốt thì thân sẽ dài ra,
                      tròn hơn và đặc biệt là những màu sắc trên vảy sẽ sáng,
                      lung linh hơn.
                      <br />
                      Thức ăn cho Shusui Koi cũng có thể tự làm với sự kết hợp
                      từ tôm đã chế biến, vụn bánh mì, rau, … Chế độ ăn phải
                      theo chuẩn công thức mà các nhà nghiên cứu đã chỉ định
                      sẵn.
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="5">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    paddingTop: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  5. Giá cá koi Shusui bao nhiêu?
                </h3>
                <Paragraph className="paragraph-Style">
                  Hiện tại IKoi đang cung cấp dòng cá koi Shusui chuẩn từ cá
                  nhật đến cá F1 với giá cực kỳ ưu đãi. Có thể nói Siêu thị Cá
                  Koi VN là một trong những đơn vị cung cấp cá koi với giá rẻ
                  nhất thị trường, mà chất lượng cũng rất đảm bảo. Giá cá koi
                  nhật và f1 như sau
                </Paragraph>
                <ul style={{ fontWeight: "400", fontSize: "15px" }}>
                  <li>
                    <span id="51" className="span-Style ">
                      5.1 Giá cá koi Shusui F1
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Đối với những con Shusui f1 có kích thước từ 18cm – 40cm,
                      giá cá koi dao động từ 150.000 – 500.000 VNĐ tùy loại.
                      <br />
                      Cao cấp hơn là những con Shusui f1 có kích thước từ 50cm –
                      55cm, được chia làm loại 1, loại 2 và 3. Giá thành dao
                      động từ 1.800.000 – 3.000.000 VNĐ tùy loại.
                    </Paragraph>
                  </li>
                  <li>
                    <span id="52" className="span-Style ">
                      5.2 Giá cá koi Shusui Nhật chuẩn
                    </span>
                    <br />
                    <Paragraph className="paragraph-Style">
                      Bơi là hoạt động hàng ngày của Kohaku koi vì thế để chọn
                      cá Koi tốt bạn nên nhìn dáng bơi của chúng phải uyển
                      chuyển, dáng bơi thẳng, khỏe mạnh lao vun vút về phía
                      trước.
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="6">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    paddingTop: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  6. Tại sao nên mua Cá Koi Shusui tại IKoi?
                </h3>
                <Paragraph className="paragraph-Style">
                  Về loại Cá Koi tại IKoi, thì những con cá đều được cấp giấy
                  chứng nhận sức khỏe đầy đủ. Mua tại Ikoi sẽ được đảm bảo chất
                  lượng và giảm thiểu chi phí vận chuyển. Tại đây, các chuyên
                  gia có chế độ chăm sóc đặc biệt để đảm bảo cho sức khỏe và
                  chất lượng cá được tốt nhất. Khi mua cá tại đây, các bạn sẽ
                  được hướng dẫn chăm sóc và nuôi dưỡng lâu dài.
                </Paragraph>
                <Paragraph className="paragraph-Style">
                  Không chỉ giá thành phải chăng mà khi đến với IKoi VN, bạn sẽ
                  được trải nghiệm sự phục vụ chu đáo, tận tình. Hơn thế nữa,
                  nhân viên sẽ tư vấn cho bạn về loại cá phù hợp nhất đối với
                  tài chính và phong thủy gia đình.
                  <br />
                  Là một cửa hàng có mặt tại Việt Nam, IKoi sẽ cam kết chất
                  lượng cá và đảm bảo có hỗ trợ cho những khách hàng lâu dài.
                  Các bạn cũng có thể tham khảo các loại cá trên các website hay
                  các trang mạng của IKoi để có thể lựa chọn được những con cá
                  ưng ý nhất cho mình.
                  <br />
                  Hy vọng những chia sẻ trong bài viết trên sẽ mang đến cho bạn
                  những hiểu biết nhất định về Shusui Koi để có được sự lựa chọn
                  tốt nhất. Nếu có nhu cầu mua sản phẩm hãy đến với IKoi qua
                  những thông tin được chia sẻ dưới đây.
                </Paragraph>
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
