import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Table } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import { Layout } from "antd";
import { Typography } from "antd";
import "../Css/koiStyle.css";
const { Text, Paragraph, Title } = Typography;
import { Spin } from "antd"; // Import the Spin component
import img1 from "../../assets/Koi-Tancho/ca-koi-tancho-nhat.jpg";
import img2 from "../../assets/Koi-Tancho/08e242e22db6eae8b3a7-225x300.jpg";
import img3 from "../../assets/Koi-Tancho/Tancho-Sanke.png";
import img4 from "../../assets/Koi-Tancho/Tancho-Showa.png";
import img5 from "../../assets/Koi-Tancho/Tancho-Kohaku-Sanke-Showa.jpg";
import img6 from "../../assets/img_4.png";
import img7 from "../../assets/img_5.png";
export default function Tancho() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idTancho, setIDTancho] = useState(null);
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
  const handleScroll21 = () => {
    const element = document.getElementById("21");

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
  const handleScroll22 = () => {
    const element = document.getElementById("22");

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
  const handleScroll23 = () => {
    const element = document.getElementById("23");

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
  const handleScroll61 = () => {
    const element = document.getElementById("61");

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
  const handleScroll62 = () => {
    const element = document.getElementById("62");

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
    const tanchoCard = categoryData.find(
      (card) => card.CategoryName === "Tancho"
    );

    if (tanchoCard) {
      setIDTancho(tanchoCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idTancho) {
      const filtered = cardData.filter((card) => card.CategoryID === idTancho);
      setFilteredCards(filtered);
    }
  }, [idTancho, cardData]);
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
      <Layout style={{}}>
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
                      1. Giới thiệu cá Koi Tancho
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
                      2. Các loại cá koi Tancho đẹp
                    </span>
                    <ul>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll21}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          2.1 Tancho Kohaku
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll22}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          2.2 Tancho Sanke
                        </span>
                      </li>
                      <li style={{ paddingTop: "10px" }}>
                        <span
                          onClick={handleScroll23}
                          className="contentBox"
                          style={{
                            cursor: "pointer",
                            color: "#920202",
                          }}
                        >
                          2.3 Tancho Showa
                        </span>
                      </li>
                    </ul>
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
                      3. Phân biệt các loại cá koi Tancho có trên thị trường
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
                      4. Cách chọn cá koi tancho
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
                      5. Cách chăm sóc cá koi tancho
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
                      6. Cách chăm sóc Koi Kohaku
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
                          6.1 Giá cá koi Tancho F1
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
                          6.2 Tại sao nên mua Tancho koi tại IKoi?
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
                      7. Tại sao nên mua Koi Tancho tại IKoi
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
                  Hiện nay, cá koi là dòng cá được ưa chuộng để làm cảnh cũng
                  như trang trí cho không gian sống của bạn. Cá koi có nhiều
                  giống loài, kích thước và màu sắc và dòng cá Koi Tancho là một
                  trong những dòng cá đó. Đây loại cá có hình dáng bắt mắt và
                  khá đẹp, khiến nhiều người quan tâm đến dòng cá này. Bài viết
                  hôm nay chúng tôi sẽ giúp bạn hiểu kỹ hơn cũng như cách chăm
                  sóc về dòng cá này qua bài viết dưới đây.
                </Paragraph>
              </div>
              <div id="1">
                <h3 style={{ color: "red" }}>1. Giới thiệu cá Koi Tancho </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Tancho hiện đang là sự chú ý của nhiều dân chơi cá,
                    đặc điểm nổi bật của dòng cá này đó là tượng trưng cho quốc
                    kỳ Nhật Bản. Đặc điểm của Tancho koi là có chấm tròn màu đỏ
                    nằm chính giữa trung tâm đầu của chúng. Chấm màu đỏ trên đầu
                    có nhiều hình dạng như vuông, hình thoi, bầu dục, tim,
                    chéo,.....Nhưng cá có chấm đỏ hình tròn sẽ được xem như là
                    hoàn hảo và được tìm kiếm nhiều nhất. Đây là loại cá được
                    nhiều người tìm kiếm nhất hiện đây và giá cá Koi Tancho cũng
                    sẽ không rẻ
                  </Paragraph>
                  <div style={{ textAlign: "center" }}>
                    {/* img1 */}
                    <img src={img1} />
                    <Text>Đàn cá Koi Tancho đẹp</Text>
                  </div>
                </div>
              </div>

              <div id="2">
                <h3 style={{ color: "red" }}>2. Các loại cá koi Tancho đẹp</h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Bạn có thể phân biệt cá Koi Tancho với một số những giống cá
                    koi Nhật khác bằng cách nhìn vào dấu chấm tròn trên đầu. Ba
                    loại cá Koi Tancho thông thường đều có hình dáng giống nhau.
                    Nhưng những loại cá koi có vảy đục , vây đẹp có thể nhìn rõ
                    được các tia vây, màu sắc rực rỡ , mắt to, người tròn và đầu
                    hơi gù được nhiều dân chơi cá tìm kiếm. Hiện nay có 3 loại
                    Tancho koi đẹp điển hình đó là Kohaku, Sanke, Showa. Dưới
                    đây là một số những đặc điểm của loại cá này.
                  </Paragraph>
                </div>
                <div>
                  <ul>
                    <li>
                      <span id="21" className="span-Style">
                        2.1 Tancho Kohaku
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Cá Koi Tancho Kohaku được ví như quốc kỳ của Nhật Bản,
                        chúng có thân và phần bụng màu trắng như tuyết, tất cả
                        các vây cũng có màu trắng. Chỉ có duy nhất một chấm màu
                        đỏ lớn trên đầu.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        {/* img2 */}
                        <img src={img2} />
                        <Text>Tancho Kohaku</Text>
                      </div>
                    </li>
                    <li>
                      <span id="22" className="span-Style">
                        2.2 Tancho Sanke
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Tancho koi Sanke ngoài có chấm đỏ trên đầu thì đặc điểm
                        nổi bật của nó cũng khá giống với cá koi sanke bình
                        thường. Đó là sự xuất hiện của chấm sumi trên nền trắng
                        ở phần lưng cá. Và một điểm lưu ý đó là phần đầu của
                        tancho sanke chỉ có chấm đen rất nhỏ trên chấm đỏ.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        {/* img3 */}
                        <img src={img3} />
                        <Text>Tancho Sanke</Text>
                      </div>
                    </li>
                    <li>
                      <span id="23" className="span-Style">
                        2.3 Tancho Showa
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Cá Koi Tancho Showa là giống cá giống ý như sankoku.
                        Nhưng có điều sẽ khác đó là chỉ chấm đỏ trên đầu. Tancho
                        showa cả phần đầu và phần thân có xuất hiện vệt đen lớn
                        và màu trắng sẽ ít hơn. Ở phần đầu tancho showa cũng sẽ
                        xuất hiện sumi hoặc những đốm đen này còn nằm trên cả
                        chấm đỏ. Một đặc điểm nữa đó là vây của cá koi tancho
                        showa có màu đen, còn 2 loại kohaku và sanke sẽ có vây
                        màu trắng.
                      </Paragraph>
                      <div style={{ textAlign: "center" }}>
                        {/* img4 */}
                        <img src={img4} />
                        <Text>Tancho Showa</Text>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="3">
                <h3 style={{ color: "red" }}>
                  3. Phân biệt các loại cá koi Tancho có trên thị trường
                </h3>
                <Table striped bordered hover responsive>
                  <thead style={{ fontSize: "15px", fontWeight: "400" }}>
                    <tr>
                      <th>
                        <span className="span-Style">Tiêu chí</span>
                      </th>
                      <th>
                        <span className="span-Style">
                          Tancho Nhật thuần chủng
                        </span>
                      </th>
                      <th>
                        <span className="span-Style">
                          Tancho Nhật nuôi vỗ ao bùn
                        </span>
                      </th>
                      <th>
                        <span className="span-Style">Tancho F1</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="span-Style">Nguồn gốc</span>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Tancho Nhật được lựa chọn và nhập trực tiếp từ các
                          trang trại cá koi lớn ở Nhật Bản.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Tancho nuôi vỗ ao bùn là dòng cá được nhập từ bé ở
                          Nhật đem về Việt Nam nuôi dưỡng.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Là dòng cá được lai tạo từ cá koi Nhật thuần chủng và
                          được nuôi dưỡng tại Việt Nam theo quy trình Nhật Bản.
                        </Paragraph>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="span-Style">Hình dáng</span>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Phần đầu Tancho Nhật hơi gù, vai rộng, mắt linh hoạt,
                          thân mập, phần hông hơi ngắn nhưng thân thuôn dài.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Hình dáng đẹp, chuẩn như cá koi thuần chủng.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Vây ngực, lưng, đuôi nhỏ, dáng bơi không mềm mại và
                          uyển chuyển như dòng koi thuần chủng.
                        </Paragraph>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="span-Style">Màu sắc</span>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Màu sắc toàn thân đồng đều và hài hòa từ đầu đến phần
                          đuôi.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Màu sắc, khoang cắt sắc nét, hài hòa.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Màu sắc trên thân Tancho F1 sẽ nhạt và không rõ nét
                          như cá koi Nhật.
                        </Paragraph>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="span-Style">Giá cả</span>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Rất đắt đỏ.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Rẻ hơn koi thuần chủng do được nuôi tại Việt Nam.
                        </Paragraph>
                      </td>
                      <td>
                        <Paragraph className="paragraph-Style">
                          Hợp túi tiền với nhiều đối tượng.
                        </Paragraph>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div id="4">
                <h3 style={{ color: "red" }}>4. Cách chọn cá koi tancho</h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Đối với những người chơi Tancho koi đều mong muốn cá của
                    mình có giá trị và có thể tham gia được các cộng đồng chơi
                    cá koi. Vậy nên, việc lựa chọn cá Koi Tancho đẹp để nuôi
                    được xem là bước quyết định trong tương lai.
                    <br />
                    Cách chọn Tancho koi chuẩn đó là chấm đỏ trên đầu có khoảng
                    cách với các nhãn mảng màu khác trên thân koi. Dưới đây là 3
                    kinh nghiệm để lựa chọn cá Koi Tancho đẹp bạn nên biết:
                  </Paragraph>
                </div>

                <div style={{ fontSize: "15px", fontWeight: "400" }}>
                  <ul>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Các em cá koi chỉ cần có dấu hiệu hình đỏ trên đầu đều
                        thuộc dòng koi tancho. Tuy nhiên, đối với những loại
                        Tancho koi có hình tròn đỏ trên đầu mới được đánh giá
                        cao.{" "}
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Vị trí điểm đỏ sẽ đúng trọng tâm ở đỉnh cầu cá koi,
                        khoảng cách giữa miệng, mắt và điểm đầu sống lưng.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Lớp da nền mỏng thì cơ thể cá sẽ bị nổi gân máu. Từ đó
                        giảm đi giá trị thẩm mỹ của cá.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph className="paragraph-Style">
                        Giá của cá Koi Tancho hiện nay khá đắt hơn so với dòng
                        cá koi khác. Để có thể tìm được một em cá Koi đẹp và
                        chất lượng, đạt chuyển là việc không dễ dàng. Bạn chọn
                        cá koi không nên ham rẻ mà mua những loại cá bị bệnh
                        hoặc có vấn đề về sức khỏe.{" "}
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="5">
                <h3 style={{ color: "red" }}>5. Cách chăm sóc cá koi tancho</h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Cá Koi Tancho được nuôi trong một môi trường từ 18 - 26 độ
                    C. Nước nuôi cá thường là nước cứng có tính kiềm yếu và phải
                    sạch sẽ. Nhưng đây là một loại cá dễ nuôi hơn so với một số
                    dòng cá khác. Thức ăn cho Tancho koi thông thường là trùn
                    chỉ và những loại thức ăn ở dạng hạt. Tập tính dễ nuôi nên
                    thích hợp đối với những người yêu thích chơi cá koi nhưng
                    không có quá nhiều thời gian để chăm sóc.
                    <br />
                    Bạn cũng nên theo dõi thường xuyên hoạt động, môi trường
                    nước trong quá trình mới bắt đầu nuôi cá. Nên hỏi những kinh
                    nghiệm của người đi trước để có cách chăm sóc tốt nhất.
                  </Paragraph>
                  <div style={{ textAlign: "center" }}>
                    {/* img5 */}
                    <img src={img5} />
                  </div>
                </div>
              </div>
              <div id="6">
                <h3 style={{ color: "red" }}>
                  6. Giá cá koi Tancho bao nhiêu?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Vì Kohaku koi là loài thông minh có thể sống trong nhiều
                    thập kỷ vì thế khi chăm sóc cá Koi Kohaku bạn cần lưu ý về
                    điều kiện môi trường và yếu tố xung quanh sẽ làm ảnh hưởng
                    tới quá trình phát triển của chúng.
                  </Paragraph>
                </div>
                <div>
                  <ul>
                    <li>
                      <span id="61" className="span-Style">
                        6.1 Giá cá koi Tancho F1
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Đối với những con Tancho f1 có kích thước từ 18cm –
                        40cm, giá cá koi dao động từ 150.000 – 500.000 VNĐ tùy
                        loại.
                        <br />
                        Cao cấp hơn là những con Tancho f1 có kích thước từ 50cm
                        – 55cm, được chia làm loại 1, loại 2 và 3. Giá thành dao
                        động từ 1.800.000 – 3.000.000 VNĐ tùy loại.
                      </Paragraph>
                    </li>
                    <li>
                      <span id="62" className="span-Style">
                        6.2 Giá cá koi Tancho Nhật chuẩn
                      </span>
                      <br />
                      <Paragraph className="paragraph-Style">
                        Một con cá Koi trưởng thành Nhật Bản như Tancho koi với
                        kích thước từ 10-15cm sẽ có giá từ 600.000 –
                        2.000.000VNĐ/con.
                        <br />
                        Ngoài ra còn có con Tancho Koi thuần chủng … được xếp
                        vào hàng hiếm có kích thước lớn thì giá cá koi lên đến
                        vài nghìn đến hàng chục nghìn USD. Do đó nếu bạn muốn
                        mua hãy liên hệ với chúng tôi để được tư vấn tận tình.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="7">
                <h3 style={{ color: "red" }}>
                  7. Tại sao nên mua Tancho koi tại IKoi?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Trên thị trường hiện nay có khá nhiều nơi cung cấp cá Koi
                    Tancho với giá thành và chất lượng khác nhau. Nhưng đối với
                    những người mới bắt đầu chơi dòng cá này sẽ khá khó khăn khi
                    lựa chọn địa chỉ uy tín.
                    <br />
                    Siêu thị Cá Koi VN được biết đến là một trong những địa chỉ
                    uy tín để bạn có thể lựa chọn và cung cấp thiết kế hồ cá Koi
                    độc đáo cho những dân chơi cá. Siêu thị Cá Koi VN tự hào là
                    nơi mang đến cho bạn những dòng cá koi tancho đẹp hiện nay.
                    Với giá thành tốt, phù hợp và cạnh tranh trên thị trường.
                    Bên cạnh đó, IKoi có đội ngũ chuyên gia nhiều kinh nghiệm sẽ
                    tư vấn và hỗ trợ cho bạn lựa chọn mua cũng như chăm sóc cá
                    Koi đúng cách. Vậy nên, nếu bạn có nhu cầu tư vấn hoặc muốn
                    tìm hiểu các loại Tancho koi khác. Hãy liên hệ với chúng tôi
                    để được hỗ trợ và giải đáp nhanh chóng.
                    <br />
                    Trên đây là những thông tin giúp bạn có thêm thông tin hữu
                    ích về Tancho koi . Hy vọng điều này sẽ giúp bạn có thêm
                    kiến thức và cách chọn cá Koi Tancho đẹp để sở hữu cho mình
                    những loại cá đẹp và phù hợp nhất.
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              {/* img6 */}
              <img src={img6} />
            </div>
            <div style={{ textAlign: "center" }}>
              {/* img7 */}
              <img src={img7} style={{ objectFit: "cover", width: "100%" }} />
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
