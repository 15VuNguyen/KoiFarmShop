import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardGrid from "../Cardgrid";
import axios from "axios";
import "../Css/koiStyle.css";
import { Layout } from "antd";
import { Typography } from "antd";
import "../Css/koiStyle.css";
const { Text, Paragraph, Title } = Typography;
import img1 from "../../assets/Koi Bekko/ca-koi-bekko.webp";
import img2 from "../../assets/img_4.png";
import img3 from "../../assets/img_5.png";
import { Spin } from "antd"; // Import the Spin component
export default function Bekko() {
  const [menu, setMenu] = useState("home");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idBekko, setIDBekko] = useState(null);
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
  const handleScroll21 = () => {
    const element = document.getElementById("21");

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
  const handleScroll22 = () => {
    const element = document.getElementById("22");

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
  const handleScroll23 = () => {
    const element = document.getElementById("23");

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
    const bekkoCard = categoryData.find(
      (card) => card.CategoryName === "Bekko"
    );

    if (bekkoCard) {
      setIDBekko(bekkoCard._id);
    }
  }, [categoryData]); // Run this effect when categoryData changes

  useEffect(() => {
    if (idBekko) {
      const filtered = cardData.filter((card) => card.CategoryID === idBekko);
      setFilteredCards(filtered);
    }
  }, [idBekko, cardData]);
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
                      1. Cá Koi Bekko là giống cá gì?
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
                      2. Đặc điểm của cá Koi Bekko
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
                            2.1 Giá cá koi Shusui F1
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
                            2.2 Giá cá koi Shusui Nhật chuẩn
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
                            2.3 Giá cá koi Shusui Nhật chuẩn
                          </span>
                        </li>
                      </ul>
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
                      3. Cách phân biệt giữa Shiro Bekko và Shiro Utsuri
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
                      4. Cách lựa chọn cá Koi Bekko đẹp nhất
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
                      5. Nên mua cá Koi bekko ở đâu.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 style={{ textAlign: "center", color: "red" }}>
                  Nội dung chi tiết
                </h2>
                <div>
                  <Paragraph className="paragraph-Style">
                    <span className="span-Style" style={{ color: "blue" }}>
                      Cá Koi Bekko
                    </span>{" "}
                    là loài cá cảnh được nhiều người yếu thích và săn tìm. Tuy
                    nhiên, bên cạnh cũng vẫn có những người chưa hề biết về loài
                    cá này. Vậy nhân đây, hãy tìm hiểu về nguồn gốc của cá Koi
                    Bekko cũng như những đặc biệt và cách chọn cá Koi Bekko đẹp
                    nhất nhé!
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
                  1. Cá Koi Bekko là giống cá gì?
                </h3>
                <div>
                  <Paragraph className="paragraph-Style">
                    Với những người có đam mê lớn với loài cá chép Koi thì chắc
                    chắn không còn quá xa lại với cái tên Cá Koi Bekko. Nhưng
                    với những người mới bắt đầu nuôi cá Koi thì đây lại được xem
                    là “khái niệm” khá mới mẻ. Vậy cá Koi Bekko là giống cá gì?
                    Có nguồn gốc từ đâu? Cùng tìm hiểu ngay sau đây nhé:
                    <br />
                    Cá Koi Bekko vốn là loại cá Koi thuần chủng, có được gốc từ
                    Koi Sanke. Qua quá trình lai tạo mang màu sắc riêng biệt,
                    nên được gọi là Koi Bekko. Bekko là hoa văn trên mai của 1
                    loài đồi mồi, cái tên Koi Bekko cũng là vì loài Koi này có
                    những hoa văn trên lưng giống như loài đồi mồi trong mô tả.
                    <br />
                    Cá Koi Bekko còn được phân loại ra thành 3 loại khác nhau đó
                    là: Shi Bekko, Aka Bekko, Ki Bekko
                  </Paragraph>
                  <div style={{ textAlign: "center" }}>
                    <img src={img1} />
                    <Text>Cá Koi Bekko</Text>
                  </div>
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
                  2. Đặc điểm của cá Koi Bekko
                </h3>
                <Paragraph className="paragraph-Style">
                  Như ở phần trên đã nói cá Koi Bekko được chia ra làm 3 loại
                  khác nhau. Mỗi loại lại có đặc điểm về thân hình và màu sắc
                  khác nhau. Cụ thể là:
                </Paragraph>
                <ul style={{ fontSize: "15px", fontWeight: "400" }}>
                  <li>
                    <span
                      id="21"
                      className="span-Style"
                      style={{ color: "rgb(146, 2, 2)" }}
                    >
                      2.1 Aka Bekko : {""}
                    </span>
                    <Paragraph className="paragraph-Style">
                      Là một loài cá đỏ thông thường và thường xuất hiện trong
                      quá trình sinh sản của loài Kohaku. Trước đây, ở Nhật Bản,
                      các con cá Akamuji thường bị đánh bại để làm cá bột. Tuy
                      nhiên, từ năm 1990, chúng trở nên phổ biến và thường được
                      trưng bày trong thể loại Kawarimono như Benigoi hoặc Hiaka
                      tại triển lãm. Một con cá Akamuji có các mảng trắng trên
                      đầu vây được gọi là Aka Hajiro.
                    </Paragraph>
                  </li>
                  <li>
                    <span
                      id="22"
                      className="span-Style"
                      style={{ color: "rgb(146, 2, 2)" }}
                    >
                      2.2 Ki Bekko : {""}
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cũng giống như Aka Bekko, Ki Bekko cũng là giống cá Koi
                      Bekko được lai tạo từ Sanke. Tuy nhiên, nền da lại là màu
                      vàng với những đốm đen. Điều này được tạo bởi gen lặn của
                      Ki Bekko, được đánh giá là hiếm hơn rất nhiều so với Aka
                      Bekko. Từ đó có thể thấy những con Ki Bekko đời đầu sẽ
                      được đánh giá rất cao và cực kỳ quý hiếm.
                    </Paragraph>
                  </li>
                  <li>
                    <span
                      id="23"
                      className="span-Style"
                      style={{ color: "rgb(146, 2, 2)" }}
                    >
                      2.3 Shiro Bekko : {""}
                    </span>
                    <Paragraph className="paragraph-Style">
                      Shiro Bekko là loại cá Koi Bekko có làn da trắng nổi bật
                      với những đốm sumi đen quanh thân mình. Người Nhật Bản cho
                      rằng Shiro Bekko, Aka Bekko và Ki Bekko đều xuất hiện từ
                      Sanke cổ điển. Tất cả những cá Koi Bekko hiện tại đều được
                      sinh sản từ Snake, là sản phẩm phụ của Sanke.
                    </Paragraph>
                  </li>
                </ul>
              </div>
              <div id="3">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  3. Cách phân biệt giữa Shiro Bekko và Shiro Utsuri
                </h3>
                <Paragraph className="paragraph-Style">
                  Trong các màu sắc của cá Koi thì cá Koi Bekko Shiro và cá Koi
                  Utsuri Shiro có dáng vẻ khác giống nhau. Vậy làm thế nào để có
                  thể phân biệt được 2 loài này. Cùng tìm hiểu ngay sau đây nhé:
                  <br />
                  Nền da của cá Koi Bekko Shiro là nền da trắng hoàn toàn còn cá
                  Koi Utsuri Shiro có nền da hơi thiên đen.
                  <br />
                  Sumi (đốm đen) trên cá Koi Bekko Shiro thường nhỏ, nhạt và
                  phân tán hơn so với cá Koi Utsuri Shiro. Cá Koi Utsuri Shiro
                  có những đốm sumi to bản, đen đậm hơn nhiều.
                  <br />
                  Koi Bekko Shiro không có sumi đến đầu và Koi Utsuri Shiro có
                  sumi trên đầu. Đây được xem là đặc điểm lớn nhất để phân loại
                  2 loại này.{" "}
                </Paragraph>
              </div>
              <div id="4">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    padding: "10px",
                    backgroundColor: "#ead8c8",
                  }}
                >
                  4. Cách lựa chọn cá Koi Bekko đẹp nhất
                </h3>
                <Paragraph className="paragraph-Style">
                  Để lựa chọn được 1 con cá Koi Bekko đẹp, cần dựa vào những
                  tiêu chí sau. Chúng ta hãy cùng tìm hiểu nhé:{" "}
                </Paragraph>
                <ul>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Điểm nổi bật nhất của một con cá Koi Bekko đó chính là màu
                      da và các đốm sumi trên cơ thể. Như đã nói ở trên cá Koi
                      Bekko có 3 màu cơ bản đó là trắng mịn bóng, vàng và đỏ. Cá
                      Koi Bekko có nền da đỏ rất ít và có nền da vàng lại càng
                      thuộc dạng quý hiếm hơn.{" "}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Cá Koi Bekko thường không có sumi ở trên đầu và đuôi,
                      những đốm sumi thường nhỏ nhắn, tái đều cơ thể, con nào có
                      sumi càng đậm con đó càng quý hiếm. Đặc điểm quyến rũ độc
                      đáo nhất của cá Koi Bekko là vệ sumi trên vai và ít sọc ở
                      vây.{" "}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Nên chọn những cá Koi Bekko có độ dài từ 30cm - 40cm, thân
                      hình mập mạp, dáng bơi thẳng, đẹp, khỏe mạnh, đôi mắt tinh
                      anh.{" "}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Ngoài ra, thân hình cá phải thon dài, cân đối, vai to, đầu
                      nhỏ, bụng không sệ, đuôi thon gọn, các đường cong trên cơ
                      thể mượt mà, đặc biệt là mang cá không được mở to.{" "}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph className="paragraph-Style">
                      Ngoài ra, có thể phân biệt giữa cá Koi Bekko thuần chủng
                      và cá Koi Bekko lai. Koi bekko thuần chủng những chấm đen
                      sumi trên lưng chúng rất rõ nét, màu đỏ máu/đỏ ớt /đỏ cam
                      hoặc màu vàng, màu trắng không bị lẫn lộn bởi các đốm màu
                      nhỏ. Cá koi lai thì ít khi đạt được màu đỏ sắc nét này
                      (hầu hết là màu cam). Ngoài ra cá Koi bekko của Nhật
                      thường có phần đầu sạch, trắng, không xuất hiện điểm đen
                      sumi.
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
                  5. Nên mua cá Koi bekko ở đâu.{" "}
                </h3>
                <Paragraph className="paragraph-Style">
                  Siêu thị cá Koi là đơn vị cung cấp cá Koi Bekko thuần chủng
                  chất lượng uy tín trên toàn quốc. Cá Koi Bekko tại có màu sắc
                  rõ nét vàng, đỏ hoặc trắng, các đốm sumi sậm, phân biệt hoàn
                  toàn với màu sắc tổng thể của cá. Đặc biệt phần đầu sạch,
                  không xuất hiện bất cứ vệt sumi nào.
                  <br />
                  Bên cạnh đó mã cá đẹp, thân hình to lớn, dáng bơi uyển chuyển,
                  cam kết cá hoàn toàn khỏe mạnh, được dưỡng kỹ lưỡng trước khi
                  đến tay người nuôi.
                  <br />
                  Siêu thị cá Koi có những chính sách bán hàng có lợi cho người
                  mua, đã và đang được nhiều khách hàng tin tưởng. Ngoài ra,
                  chúng tôi còn có dịch vụ tư vấn và thi công xây hồ cá Koi đẹp
                  với nhiều kích thước, trên nhiều công trình nhà ở khác nhau.
                  <br />
                  Trên đây là các thông tin vô cùng thú vị về loài cá Koi Bekko.
                  Hy vọng với những thông tin sẽ giúp bạn có thể tích lũy thêm
                  nhiều kiến thức trong lĩnh vực nuôi cá Koi. Đặc biệt hơn là có
                  thể tự mình lựa chọn một con cá Koi bekko đẹp mã, ưng ý. Chúc
                  bạn thành công!
                </Paragraph>
              </div>
            </div>
          </div>
        </Container>
        <div style={{ display: "flex" }}>
          <div>
            <img src={img2} />
          </div>
          <div style={{ textAlign: "center" }}>
            <img src={img3} />
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
