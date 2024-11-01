import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import "../src/Home.css";
import Slideshow from "./Components/Slideshow";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel, message } from "antd";
import { Link } from "react-router-dom";
import "./Components/Css/homeStyle.css";
import { Typography } from "antd";
import { Button, Container } from "react-bootstrap";
const { Paragraph } = Typography;
import axiosInstance from "./An/Utils/axiosJS";
import ChatButton from './Components/Chat/ChatButton'
import BoxChat from './Components/Chat/BoxChat'
import ChatList from './Components/Chat/ChatList'
import { fetchLoginUserData, getManager } from "./services/userService";

export default function Home() {
  const location = useLocation();
  const [lastMessage, setLastMessage] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [koidata, setKoiData] = useState([]);
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  // const [isShowStaffChat, setIsShowStaffChat] = useState(false);
  // const [showListChat, setShowListChat] = useState(false);
  // const [customer, setCustomer] = useState({});
  const [manager, setManager] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const { message } = location.state || {};
    const storedMessage = localStorage.getItem("toastMessage");

    if (message && message !== lastMessage && message !== storedMessage) {
      toast.success(message);
      setLastMessage(message);
      localStorage.setItem("toastMessage", message);
    }
  }, [location.state, lastMessage]);

  const [menu, setMenu] = useState("home");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersResponse, koiResponse] = await Promise.all([
          axiosInstance.get("/manager/manage-supplier/get-all"),
          axiosInstance.get("/getAllKoi"),
        ]);
        setSuppliers(suppliersResponse.data.result);
        setKoiData(koiResponse.data.result.slice(0, 12));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const clearData = async () => {
      try {
        console.log("hello");
        await axiosInstance.post(
          "/clear-coookies",
          { Credential: true },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    clearData();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".animated-section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          entry.target.classList.remove("hidden");
        } else {
          entry.target.classList.remove("animate");
          entry.target.classList.add("hidden");
        }
      });
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);



  // Dữ liệu cá koi
  const koiData = [
    {
      src: "src/assets/nguon-goc-kohaku.jpg",
      alt: "Koi Kohaku",
      name: "kohaku",
    },
    {
      src: "src/assets/Koi-Ogon-1/hi-ogon.jpg",
      name: "ogon",
    },
    {
      src: "src/assets/Koi-Showa/doistu-showa.jpg",
      alt: "Koi Showa",
      name: "showa",
    },
    {
      src: "src/assets/Koi-Tancho/Tancho-Showa.png",
      alt: "Koi Tancho",
      name: "tancho",
    },
    {
      src: "src/assets/Koi Bekko/ca-koi-bekko-4.webp",
      alt: "Koi Bekko",
      name: "bekko",
    },
    {
      src: "src/assets/Koi-Doitsu/Cá koi Ginrin Showa 4.jpg",
      alt: "Koi Doitsu",
      name: "doitsu",
    },
    {
      src: "src/assets/Koi-Ginrin/Cá koi Ginrin Showa 4.jpg",
      alt: "Koi Girin",
      name: "girin",
    },
    {
      src: "src/assets/koi-goshiki.jpg",
      alt: "Koi Goshiki",
      name: "goshiki",
    },
    {
      src: "src/assets/Koi Benigoi/BENIGOI1.jpg",
      alt: "Koi Benigoi",
      name: "benigoi",
    },
    {
      src: "src/assets/Koi-Asagi/4789c7fd1367ba7ae35a271f1b912a8c.png",
      alt: "Koi Asagi",
      name: "asagi",
    },
    {
      src: "src/assets/koi-platinum-ogon.jpg",
      alt: "Koi Platinum",
      name: "platinum",
    },
    {
      src: "src/assets/Koi-shusui/R.jpg",
      alt: "Koi Shusui",
      name: "shusui",
    },
  ];

  /// chat



  // const handleLogout = () => {
  //     try {
  //         localStorage.removeItem('userInfo')
  //         localStorage.removeItem('selectedChat')
  //         toast.success('Logout successfully!')
  //         navigate('/login')
  //     } catch (error) {
  //         toast.error('Logout fail!')
  //     }
  // }

  // const getStaff = async () => {
  //     const {data} = await fetchStaff(config)
  //     if(data){
  //         console.log("staff: ", data)
  //         setStaff(data[0])
  //     }
  // }

  // useEffect(() => {
  //     getStaff()
  // }, [authUser._id])

  const fetchManager = async () => {
    try {
      const { data } = await getManager()
      if (data) {
        console.log("manager: ", data)
        setManager(data.result)
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await fetchLoginUserData()
      if (data) {
        console.log("user: ", data.result)
        setUser(data.result)
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [user._id])

  useEffect(() => {
    fetchManager()
  }, [])


  return (
    <>
      <div>
        <Navbar menu={menu} setMenu={setMenu} />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <Slideshow />
      </div>

      <div style={{ display: "flex" }}>
        <h4
          style={{
            marginTop: "40px",
            marginLeft: "10%",
            marginBottom: "40px",
            color: "red",
          }}
        >
          Các loài cá bên chúng tôi cung cấp:
        </h4>
      </div>
      <Carousel
        autoplay
        style={{ marginLeft: "50px", marginRight: "50px" }}
        autoplaySpeed={6000}
        dots={false}
      >
        {Array.from({ length: Math.ceil(koiData.length / 6) }).map(
          (_, index) => (
            <div key={index}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {koiData.slice(index * 6, index * 6 + 6).map((koi, idx) => (
                  <div className="image-item" key={idx}>
                    <Link to={koi.name}>
                      {" "}
                      {/* Thay đổi đường dẫn theo yêu cầu */}
                      <img
                        src={koi.src}
                        alt={koi.alt}
                        className="carousel-image"
                        loading="lazy"
                      />
                      <h3>
                        Koi{" "}
                        {koi.name.charAt(0).toUpperCase() + koi.name.slice(1)}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </Carousel>
      <div className="secIntroduce">
        <div className="container container-fluid">
          <div className="row-fix">
            <div className="item">
              <div className="block-child">
                <img src="src/assets/homeStyle1.jpg" loading="lazy" />
              </div>
            </div>
            <div className="item">
              <div className="block-child">
                <div className="child-item head-title">
                  <h2 style={{ color: "red", fontSize: "15px" }}>GIỚI THIỆU</h2>
                  <div className="straight-line"></div>
                </div>
                <div>
                  <h1>IKoi Farm</h1>
                </div>
                <Paragraph className="paragraph-Style">
                  Với niềm đam mê với cá Koi chúng tôi đã thành lập nên IKoi
                  nhằm phục vụ nhu cầu chơi cá trên mảnh đất hình chữ S
                </Paragraph>
                <Paragraph className="paragraph-Style">
                  Chúng tôi tự hào là đối tác của nhiều Koi Farm uy tín tại Nhật
                  Bản. Tất cả các dòng cá cũng như các sản phẩm liên quan được
                  cung cấp trên hệ thống đều được chúng tôi chọn lọc và chăm sóc
                  cẩn thận trước khi xuất trại. IKOI FARM cam kết mang lại những
                  giá trị tốt nhất đến với khách hàng của mình.
                </Paragraph>
                <div style={{ textAlign: "center" }}>
                  <Button variant="danger">
                    <Link to={"/gioithieu"} style={{ color: "white" }}>
                      Xem thêm
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4
          style={{
            marginTop: "60px",
            marginLeft: "10%",
            marginBottom: "40px",
            color: "red",
          }}
        >
          Các nhà cung cấp hàng đầu
        </h4>
      </div>

      <Carousel
        autoplay
        autoplaySpeed={6000}
        dots={false}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        {Array.from({ length: Math.ceil(suppliers.length / 12) }).map(
          (_, index) => (
            <div key={index}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {suppliers
                  .slice(index * 4, index * 4 + 4)
                  .map((supplier, idx) => (
                    <div
                      className="supplier-item"
                      key={idx}
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={supplier.SupplierImage}
                        alt={supplier.SupplierName}
                        className="supplier-image"
                        loading="lazy"
                        onClick={() => navigate("/nguongocIKoi")}
                      />
                      <h3 style={{ fontSize: "18px", marginTop: "15px" }}>
                        {supplier.SupplierName}
                      </h3>
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
      </Carousel>

      <div>
        <h4
          style={{
            marginTop: "60px",
            marginLeft: "9%",
            marginBottom: "40px",
            color: "red",
          }}
        >
          Các loại cá mới
        </h4>
      </div>

      <Carousel
        arrows
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          marginBottom: "50px",
        }}
        dots={false}
      >
        {Array.from({ length: Math.ceil(koidata.length / 6) }).map(
          (_, index) => (
            <div key={index}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {koidata.slice(index * 6, index * 6 + 6).map((koi, idx) => (
                  <div className="image-item" key={idx}>
                    <Link to={`/koikygui`}>
                      <img
                        src={koi.Image}
                        alt={koi.KoiName}
                        className="carousel-image"
                        loading="lazy"
                      />
                      <h3
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontWeight: 300,
                          opacity: 0.7,
                          marginTop: "20px",
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        {koi.KoiName}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </Carousel>
      <Container>
        <div>
          <div className="head-title">
            <div className="straight-line2"></div>
            <h1 style={{ fontSize: "40px", textAlign: "center" }}>
              Ký Gửi Cá Koi Bên IKoi
            </h1>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Paragraph className="paragraph-style">
              Cá Koi là loại cá chép cảnh cao cấp đến từ Nhật Bản và ngày càng
              được ưa chuộng tại các quốc gia khác, trong đó có Việt Nam. Chính
              vì thế mà nhu cầu sở hữu những cá Koi rõ ràng về nguồn gốc, đẹp và
              khỏe mạnh tăng lên. Nhằm giúp mọi người sở hữu những chú cá Koi
              tốt, ISHI KOI FARM xin trân trọng giới thiệu chức năng đấu giá cá
              Koi dưới đây.
            </Paragraph>
          </div>

          <div className="flex-container">
            <div className="left-block">
              <div className="dad-block">
                <div className="child-1">
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    IKOI KÝ GỬI
                  </p>
                </div>
                <img
                  src="src/assets/home3.jpg"
                  alt="IKOI Background"
                  className="background-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="right-block">
              <h2>Giới Thiệu Về IKoi</h2>
              <Paragraph className="paragraph-style">
                IKoi tự hào cung cấp những chú cá Koi chất lượng cao nhất từ
                Nhật Bản, mang đến cho khách hàng những trải nghiệm tuyệt vời và
                sự hài lòng. Với đội ngũ chuyên gia tận tâm, chúng tôi cam kết
                đảm bảo sức khỏe và vẻ đẹp của từng chú cá Koi, giúp bạn dễ dàng
                chọn lựa những chú cá phù hợp nhất cho hồ cá của mình.
              </Paragraph>
              <Paragraph className="paragraph-style">
                Ngoài ra, chúng tôi còn cung cấp dịch vụ chăm sóc cá Koi chuyên
                nghiệp, tư vấn kỹ thuật và các giải pháp nuôi dưỡng để bạn có
                thể yên tâm tận hưởng niềm đam mê cá Koi.
              </Paragraph>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="image-background"
        style={{
          backgroundImage: "url('src/assets/home6.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-20px", // Adjust this value to move it closer
        }}
      >
        <div
          className="item"
          style={{
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "1000px",
            width: "100%",
            paddingTop: "20px",
          }}
        >
          <div className="block-child">
            <div
              className="child-item head-title"
              style={{ marginBottom: "10px" }}
            >
              <h2 style={{ fontSize: "20px" }}>Hợp tác cùng IKoi</h2>
              <div className="straight-line"></div>
            </div>
            <h3 style={{ fontSize: "50px" }}>
              Nếu Bạn Đang Tìm Nguồn Cung Cấp Cá Koi Nhật Bản Tại Việt Nam IKoi
              Sẽ Là Một Lựa Chọn Đúng Đắn.
            </h3>
            <Paragraph className="paragraph-Style" style={{ color: "white" }}>
              Chúng tôi chỉ nhập các dòng cá thuần chủng trực tiếp từ các trang
              trại cá uy tín tại Nhật Bản. Nguồn cung cấp dồi dào và đảm bảo
              được chất lượng cá cũng như giá thành. Chất lượng cá luôn được đảm
              bảo từ khâu chọn lựa cá tại trại cá của đối tác Nhật Bản.
            </Paragraph>
            <Paragraph className="paragraph-Style" style={{ color: "white" }}>
              Các lô cá về thường xuyên, chủng loại đa dạng. Hệ thống hồ nuôi,
              dưỡng cá hiện đại, giúp cá khỏe mạnh phát triển tốt sau khi xuất
              trại.
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="home-body">
        <div className='chat-container'>
          <BoxChat
            show={isShow}
            setShow={setIsShow}
            receiver={manager}
            user={user}
          />
          <ChatButton
            show={isShow}
            setShow={setIsShow}
            receiver={manager}
          />

        </div>
      </div>

      <Footer style={{ paddingTop: "20px" }} />
    </>
  );
}
