import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Kohaku from "./ThongTinCaKoi/Kohaku";
import Asagi from "./ThongTinCaKoi/Asagi";
import Bekko from "./ThongTinCaKoi/Bekko";
import Benigoi from "./ThongTinCaKoi/Benigoi";
import Doitsu from "./ThongTinCaKoi/Doitsu";
import Ginrin from "./ThongTinCaKoi/Ginrin";
import Goshiki from "./ThongTinCaKoi/Goshiki";
import Ogon from "./ThongTinCaKoi/Ogon";
import Platinum from "./ThongTinCaKoi/Platinum";
import Showa from "./ThongTinCaKoi/Showa";
import Shusui from "./ThongTinCaKoi/Shusui";
import Tancho from "./ThongTinCaKoi/Tancho";
import { Button, Typography, Spin, Layout } from "antd";
import { Container } from "react-bootstrap";
const { Title, Text, Paragraph } = Typography;

const OrderPage = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();
  const [quantityInCart, setQuantityInCart] = useState(0); // Track quantity in cart
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [comboQuantity, setComboQuantity] = useState(1); // Track combo quantity
  console.log(selectedItem);

  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);
  }, []); // Chỉ chạy khi component được mount
  useEffect(() => {
    const sendOrderDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/order/detail/price",
          {
            Size: selectedItem.Size,
            Breed: selectedItem.Breed,
            CategoryID: selectedItem.CategoryID,
          }
        );
        //
        if (response.status === 200) {
          let maxQty;
          if (
            selectedItem.Size >= 5 &&
            selectedItem.Size <= 14 &&
            selectedItem.Status !== 4
          ) {
            maxQty = 39;
            setSelectedQuantity(39); // Default to 39
            setMaxQuantity(response.data.result.CategoryName.Quantity); // Update maxQuantity
          } else if (
            selectedItem.Size >= 15 &&
            selectedItem.Size <= 17 &&
            selectedItem.Status !== 4
          ) {
            maxQty = 25;
            setSelectedQuantity(25); // Default to 25
            setMaxQuantity(response.data.result.CategoryName.Quantity); // Update maxQuantity
          } else if (
            selectedItem.Size >= 18 &&
            selectedItem.Size <= 20 &&
            selectedItem.Status !== 4
          ) {
            maxQty = 12; // Default to 12, with an extra 3
            setSelectedQuantity(12);
            setMaxQuantity(response.data.result.CategoryName.Quantity); // Update maxQuantity
          } else {
            maxQty = response.data.result.CategoryName.Quantity; // Fallback for other sizes
            setSelectedQuantity(1); // Default to 1 for other sizes
            setMaxQuantity(maxQty); // Update maxQuantity
          }
        }
      } catch (error) {
        console.error("Error sending order details:", error);
      }
    };
    sendOrderDetails();
  }, [selectedItem]);
  //   useEffect(()=> {
  //  const handleAddToCart = async () => {
  //     if (!selectedItem || loading) return;

  //     const totalQuantity = quantityInCart + selectedQuantity;

  //     // Prevent adding if total exceeds maxQuantity
  //     if (totalQuantity > maxQuantity) {
  //       toast.error("Số lượng vượt quá giới hạn cho phép.");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4000/order/detail/makes",
  //         {
  //           Size: parseInt(selectedItem.Size),
  //           Breed: selectedItem.Breed,
  //           CategoryID: selectedItem.CategoryID,
  //           Quantity: parseInt(selectedQuantity),
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       if (response.status === 200) {
  //         const { result } = response.data; // Lấy thuộc tính 'result' từ phản hồi
  //         console.log(result);
  //         if (
  //           typeof result === "string" &&
  //           result.includes("available in stock")
  //         ) {
  //           setError(result); // Hiển thị thông điệp từ phản hồi
  //           return;
  //         }
  //         console.log("Add to cart successful: " + response.data.message);
  //         setOrderId(response.data.result.orderDT._id);
  //       }
  //       if (totalQuantity === maxQuantity) {
  //         setIsAddedToCart(true);
  //       }
  //       toast.success("Đã thêm vào giỏ hàng!");
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Có lỗi xảy ra! " + (error.response?.data?.message || ""));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   },[])
  const handleAddToCart = async () => {
    if (!selectedItem || loading) return;

    const totalQuantity = quantityInCart + selectedQuantity;

    // Prevent adding if total exceeds maxQuantity
    if (totalQuantity > maxQuantity) {
      toast.error("Số lượng vượt quá giới hạn cho phép.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/order/detail/makes",
        {
          Size: parseInt(selectedItem.Size),
          Breed: selectedItem.Breed,
          CategoryID: selectedItem.CategoryID,
          Quantity: parseInt(selectedQuantity),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { result } = response.data; // Lấy thuộc tính 'result' từ phản hồi
        console.log(result);
        if (
          typeof result === "string" &&
          result.includes("0 available in stock")
        ) {
          setError(result); // Hiển thị thông điệp từ phản hồi
          return;
        } else if (
          typeof result === "string" &&
          result.includes("available in stock")
        ) {
          toast.success(result); // Hiển thị thông điệp từ phản hồi nếu có lỗi số lượng
          return;
        }
        console.log("Add to cart successful: " + response.data.message);
      }

      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra! " + (error.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };
  const handleOrderNow = async () => {
    if (!selectedItem || loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/order/detail/makes",
        {
          Size: parseInt(selectedItem.Size),
          Breed: selectedItem.Breed,
          CategoryID: selectedItem.CategoryID,
          Quantity: parseInt(selectedQuantity),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { result } = response.data; // Lấy thuộc tính 'result' từ phản hồi
        console.log(result);
        if (
          typeof result === "string" &&
          result.includes("available in stock")
        ) {
          setError(result); // Hiển thị thông điệp từ phản hồi
          return;
        }
        console.log("Add to cart successful: " + response.data.message);
      }

      setTimeout(() => {
        toast.success("Đã thêm vào giỏ hàng!");
      }, 2000); // Adjust the delay time (in milliseconds) as needed
      navigate("/cart");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra! " + (error.response?.data?.message || ""));
    } finally {
      setLoading(false);
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
          console.log("CategoryData" + categoryData);
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

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Layout
        style={{
          backgroundColor: "whitesmoke",
          minHeight: "100vh",
          paddingTop: "120px",
        }}
      >
        <Container>
          <div
            style={{
              display: "flex",
              width: "80%",
              maxWidth: "1000px",
              margin: "0 auto",
              flexWrap: "wrap",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                flex: "1 1 50%",
                textAlign: "center",
                paddingRight: "10px",
              }}
            >
              {selectedItem ? (
                <>
                  <img
                    src={selectedItem.Image}
                    alt={selectedItem.KoiName}
                    style={{
                      width: "100%",
                      objectFit: "container",
                      borderRadius: "8px",
                      maxHeight: "400px",
                    }}
                  />
                  <video
                    controls
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      marginTop: "10px",
                      maxHeight: "300px",
                      borderRadius: "8px",
                    }}
                  >
                    <source src={selectedItem.Video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : (
                <Spin tip="Loading..." />
              )}
            </div>
            <div
              style={{
                flex: "1 1 50%",
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Title level={1} style={{ color: "red" }}>
                {selectedItem.KoiName}
              </Title>
              {selectedItem && (
                <>
                  <hr style={{ margin: "10px 0" }} />
                  <Paragraph style={{ paddingTop: "18px" }}>
                    <h3 style={{ fontSize: "25px", textAlign: "left" }}>
                      Price:{" "}
                      <span style={{ fontSize: "25px", color: "red" }}>
                        {" "}
                        {new Intl.NumberFormat("vi-VN").format(
                          selectedItem.Price
                        )}{" "}
                        VND
                      </span>
                    </h3>
                    <Text>
                      Tình trạng: Sẵn hàng, xem và lựa chọn cá trực tiếp tại
                      trại{" "}
                      <span
                        style={{
                          fontWeight: "600",
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        IKoi
                      </span>
                      .
                    </Text>
                  </Paragraph>
                  <hr style={{ margin: "10px 0" }} />
                  <Paragraph>
                    <Text
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Ưu đãi:
                    </Text>
                    <ul>
                      <li>
                        Mua nhiều tặng nhiều: Mua 20 tặng 5; Mua 12 tặng 3; Mua
                        30 tặng 9 (áp dụng với cá Koi Việt , Koi F1 phụ thuộc
                        vào size).
                      </li>
                      <li>
                        Giá trị đơn hàng từ 1.500.000đ tặng kèm 1 chai vi sinh
                        (không hợp nhất với combo khác).
                      </li>
                      <li>Miễn phí ship từ trại ra các bến xe tại Hà Nội.</li>
                    </ul>
                  </Paragraph>
                  <Paragraph
                    style={{
                      fontSize: "20px",
                      textAlign: "left",
                      color: "red",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        textAlign: "left",
                        color: "red",
                      }}
                    >
                      {selectedItem.Size > 20 && (
                        <label>
                          <strong>Quantity: </strong>
                          <input
                            type="number"
                            style={{
                              fontSize: "14px",
                              color: "red",
                              width: "48%",
                            }}
                            value={selectedQuantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Kiểm tra xem giá trị có phải là số hợp lệ không
                              if (
                                !isNaN(value) &&
                                value >= 1 &&
                                value <= maxQuantity
                              ) {
                                setSelectedQuantity(value);
                              }
                            }}
                            min="1"
                            max={maxQuantity}
                            onKeyPress={(e) => {
                              // Ngăn nhập ký tự "e"
                              if (e.key === "e" || e.key === "E") {
                                e.preventDefault();
                              }
                            }}
                          />
                        </label>
                      )}
                      {selectedItem.Size < 20 && (
                        <label>
                          <strong>Quantity: </strong>
                          <input
                            type="number"
                            style={{
                              fontSize: "14px",
                              color: "red",
                              width: "48%",
                            }}
                            value={selectedQuantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Kiểm tra xem giá trị có phải là số hợp lệ không
                              if (
                                !isNaN(value) &&
                                value >= 1 &&
                                value <= maxQuantity
                              ) {
                                setSelectedQuantity(value);
                              }
                            }}
                            min="1"
                            max={maxQuantity}
                            onKeyPress={(e) => {
                              // Ngăn nhập ký tự "e"
                              if (e.key === "e" || e.key === "E") {
                                e.preventDefault();
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        textAlign: "left",
                        color: "red",
                      }}
                    >
                      {selectedItem.Size >= 15 &&
                        selectedItem.Size <= 17 &&
                        selectedItem.Status !== 4 && (
                          <Paragraph
                            style={{
                              fontSize: "20px",
                              textAlign: "left",
                              color: "red",
                            }}
                          >
                            <strong>Combo: </strong>
                            <input
                              type="number"
                              style={{
                                fontSize: "14px",
                                color: "red",
                                width: "48%",
                              }}
                              value={comboQuantity}
                              onChange={(e) => {
                                const value = Math.max(e.target.value, 1);
                                setComboQuantity(value);
                                setSelectedQuantity(value * 25);
                              }}
                              min="1"
                            />
                          </Paragraph>
                        )}
                      {selectedItem.Size >= 5 &&
                        selectedItem.Size <= 14 &&
                        selectedItem.Status !== 4 && (
                          <Paragraph
                            style={{
                              fontSize: "20px",
                              textAlign: "left",
                              color: "red",
                            }}
                          >
                            <strong>Combo: </strong>
                            <input
                              type="number"
                              style={{
                                fontSize: "14px",
                                color: "red",
                                width: "48%",
                              }}
                              value={comboQuantity}
                              onChange={(e) => {
                                const value = Math.max(e.target.value, 1);
                                setComboQuantity(value);
                                setSelectedQuantity(value * 39);
                              }}
                              min="1"
                            />
                          </Paragraph>
                        )}
                      {selectedItem.Size >= 18 &&
                        selectedItem.Size <= 20 &&
                        selectedItem.Status !== 4 && (
                          <div>
                            <Paragraph
                              style={{
                                fontSize: "20px",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              <strong>Combo: </strong>
                              <input
                                type="number"
                                style={{
                                  fontSize: "14px",
                                  color: "red",
                                  width: "48%",
                                }}
                                value={comboQuantity}
                                onChange={(e) => {
                                  const value = Math.max(e.target.value, 1);
                                  setComboQuantity(value);
                                  setSelectedQuantity(value * 12);
                                }}
                                min="1"
                              />
                            </Paragraph>
                          </div>
                        )}
                      {maxQuantity < selectedQuantity && (
                        <div>
                          <span style={{ color: "red" }}>
                            Cá trong kho không đủ
                          </span>
                        </div>
                      )}
                    </div>
                  </Paragraph>
                  <Paragraph style={{ fontSize: "20px", textAlign: "left" }}>
                    <strong>Certificate ID: </strong>
                    <Text style={{ fontSize: "20px", color: "red" }}>
                      {selectedItem.CertificateID}
                    </Text>
                  </Paragraph>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Paragraph>
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "20px",
                        gap: "10px",
                      }}
                    >
                      <Button
                        type="primary"
                        danger
                        size="large"
                        onClick={handleOrderNow}
                        disabled={!!error} // Disable if there's an error
                        style={{
                          flex: "0 1 40%", // Adjust width
                          padding: "10px", // Reduce padding
                          borderRadius: "8px",
                          fontSize: "18px", // Reduce font size
                          fontWeight: "bold",
                        }}
                      >
                        Mua Ngay
                      </Button>
                      <Button
                        style={{
                          flex: "1 1 60%", // Adjust width
                          padding: "20px", // Increase padding
                          borderRadius: "8px",
                          fontSize: "22px", // Increase font size
                          fontWeight: "bold",
                          backgroundColor:
                            isAddedToCart ||
                            quantityInCart + selectedQuantity > maxQuantity ||
                            !!error
                              ? "#f0f0f0"
                              : "#ffffff", // Change color when disabled
                          color:
                            isAddedToCart ||
                            quantityInCart + selectedQuantity > maxQuantity ||
                            !!error
                              ? "#a0a0a0"
                              : "red", // Change text color when disabled
                          border: "2px solid red", // Border color
                          transition: "background-color 0.3s, transform 0.2s", // Transition effect
                          cursor:
                            isAddedToCart ||
                            quantityInCart + selectedQuantity > maxQuantity ||
                            !!error
                              ? "not-allowed"
                              : "pointer", // Change cursor
                          opacity:
                            isAddedToCart ||
                            quantityInCart + selectedQuantity > maxQuantity ||
                            !!error
                              ? 0.6
                              : 1, // Reduce opacity when disabled
                        }}
                        onClick={handleAddToCart}
                        loading={loading}
                        size="large"
                        disabled={!!error} // Disable if there's an error
                        onMouseEnter={(e) => {
                          if (
                            !(
                              isAddedToCart ||
                              quantityInCart + selectedQuantity > maxQuantity ||
                              !!error
                            )
                          ) {
                            e.currentTarget.style.backgroundColor = "red"; // Hover background color
                            e.currentTarget.style.color = "#FFFFFF"; // Hover text color
                            e.currentTarget.style.transform = "scale(1.05)"; // Hover scale
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (
                            !(
                              isAddedToCart ||
                              quantityInCart + selectedQuantity > maxQuantity ||
                              !!error
                            )
                          ) {
                            e.currentTarget.style.backgroundColor = "#FFFFFF"; // Reset background
                            e.currentTarget.style.color = "red"; // Reset text color
                            e.currentTarget.style.transform = "scale(1)"; // Reset scale
                          }
                        }}
                      >
                        <FaCartPlus style={{ marginRight: "8px" }} />
                        {isAddedToCart ? "Đã Thêm" : "Thêm Vào Giỏ Hàng"}
                      </Button>
                      {}
                    </div>
                  </Paragraph>
                </>
              )}
            </div>
          </div>
          <div>
            <div
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add box-shadow
                padding: "8px", // Add padding
                borderRadius: "4px", // Round the corners
                width: "100%", // Ensure it takes full width
                marginBottom: "10px", // Space below the text
                background: "#E4E0E1",
              }}
            >
              <Text
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                CHI TIẾT SẢN PHẨM
              </Text>
            </div>
            <Paragraph
              style={{
                fontSize: "20px",
                lineHeight: "1.5",
                background: "whitesmoke",
              }}
            >
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    Size:{" "}
                  </span>
                  {selectedItem.Size}
                </li>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    Loài:{" "}
                  </span>
                  {selectedItem.Breed}
                </li>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    Lượng thức ăn / ngày:{" "}
                  </span>
                  {selectedItem.DailyFoodAmount}
                </li>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    Tỷ lệ lọc:{" "}
                  </span>
                  {selectedItem.FilteringRatio}
                </li>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    Certificate ID:{" "}
                  </span>
                  {selectedItem.CertificateID}
                </li>
                <li
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  {selectedItem.Status === 4 && (
                    <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                      Status: Ký Gửi
                    </span>
                  )}
                  {selectedItem.Status === 1 && (
                    <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                      Status: Nhập Nhập Khẩu
                    </span>
                  )}
                  {selectedItem.Status === 2 && (
                    <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                      Status: F1
                    </span>
                  )}
                  {selectedItem.Status === 3 && (
                    <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                      Status: Việt
                    </span>
                  )}
                </li>
              </ul>
            </Paragraph>
          </div>
          <div>
            <div
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add box-shadow
                padding: "8px", // Add padding
                borderRadius: "4px", // Round the corners
                width: "100%", // Ensure it takes full width
                marginBottom: "10px", // Space below the text
                background: "#E4E0E1",
              }}
            >
              <Text
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                MÔ TẢ KOI
              </Text>
            </div>
            <Paragraph style={{ fontSize: "20px", background: "whitesmoke" }}>
              {selectedItem.Description}
              <br />
              <span style={{ fontWeight: "Bold", fontSize: "20px" }}>
                CHÍNH SÁCH BẢO HÀNH:
              </span>
              <ul>
                <li>
                  Bảo hành 01 năm cho tất cả các lỗi về cá Koi chính hãng tại
                  Ikoi.
                </li>
                <li>
                  Đảm bảo sức khỏe và chất lượng cá trong suốt thời gian bảo
                  hành.
                </li>
                <li>
                  Hỗ trợ tư vấn miễn phí về cách chăm sóc và nuôi dưỡng cá Koi.
                </li>
              </ul>
            </Paragraph>
          </div>
        </Container>

        {categoryName === "Kohaku" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Kohaku
            </h1>
            <Kohaku />
          </div>
        )}
        {categoryName === "Ogon" && (
          <div>
            {" "}
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Ogon
            </h1>
            <Ogon />
          </div>
        )}
        {categoryName === "Showa" && (
          <div>
            <hr />
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Showa
            </h1>
            <Showa />
          </div>
        )}
        {categoryName === "Tancho" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Tancho
            </h1>
            <Tancho />
          </div>
        )}
        {categoryName === "Bekko" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Bekko
            </h1>
            <Bekko />
          </div>
        )}
        {categoryName === "Ginrin" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Ginrin
            </h1>
            <Ginrin />
          </div>
        )}
        {categoryName === "Doitsu" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Doitsu
            </h1>
            <Doitsu />
          </div>
        )}
        {categoryName === "Goshiki" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Goshiki
            </h1>
            <Goshiki />
          </div>
        )}
        {categoryName === "Benigoi" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Benigoi
            </h1>
            <Benigoi />
          </div>
        )}
        {categoryName === "Asagi" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Asagi
            </h1>
            <Asagi />
          </div>
        )}
        {categoryName === "Platinum" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Platinum
            </h1>
            <Platinum />
          </div>
        )}
        {categoryName === "Shusui" && (
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "50px",
                color: "red",
              }}
            >
              Giới thiệu về Koi Shusui
            </h1>
            <Shusui />
          </div>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default OrderPage;
{
  /* <div
              style={{
                display: "flex",
                width: "80%",
                maxWidth: "1000px",

                margin: "0 auto",
                flexWrap: "wrap",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  flex: "1 1 50%",
                  textAlign: "center",
                  paddingRight: "10px",
                }}
              >
                {selectedItem ? (
                  <>
                    <img
                      src={selectedItem.Image}
                      alt={selectedItem.KoiName}
                      style={{
                        height: "400px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <video
                      controls
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <source src={selectedItem.Video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                ) : (
                  <Spin tip="Loading..." />
                )}
              </div>
              <div
                style={{
                  flex: "1 1 50%",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Title level={1} style={{ color: "red" }}>
                  {selectedItem.KoiName}
                </Title>
                {selectedItem && (
                  <>
                    <hr style={{ margin: "10px 0" }} />
                    <Paragraph style={{ paddingTop: "18px" }}>
                      <h3 style={{ fontSize: "25px", textAlign: "left" }}>
                        Price:{" "}
                        <span style={{ fontSize: "25px", color: "red" }}>
                          {" "}
                          {new Intl.NumberFormat("vi-VN").format(
                            selectedItem.Price
                          )}{" "}
                          VND
                        </span>
                      </h3>
                      <Text>
                        Tình trạng: Sẵn hàng, xem và lựa chọn cá trực tiếp tại
                        trại{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          IKoi
                        </span>
                        .
                      </Text>
                    </Paragraph>
                    <hr style={{ margin: "10px 0" }} />
                    <Paragraph>
                      <Text
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        Ưu đãi:
                      </Text>
                      <ul>
                        <li>
                          Mua nhiều tặng nhiều: Mua 20 tặng 5; Mua 12 tặng 3;
                          Mua 30 tặng 9 (áp dụng với cá Koi Việt , Koi F1 phụ
                          thuộc vào size).
                        </li>
                        <li>
                          Giá trị đơn hàng từ 1.500.000đ tặng kèm 1 chai vi sinh
                          (không hợp nhất với combo khác).
                        </li>
                        <li>Miễn phí ship từ trại ra các bến xe tại Hà Nội.</li>
                      </ul>
                    </Paragraph>
                    <Paragraph
                      style={{
                        fontSize: "20px",
                        textAlign: "left",
                        color: "red",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {selectedItem.Size > 20 && (
                          <label>
                            <strong>Quantity: </strong>
                            <input
                              type="number"
                              style={{
                                fontSize: "14px",
                                color: "red",
                                width: "48%",
                              }}
                              value={selectedQuantity}
                              onChange={(e) =>
                                setSelectedQuantity(e.target.value)
                              }
                              min="1"
                              max={maxQuantity}
                            />
                          </label>
                        )}
                        {selectedItem.Size < 20 && (
                          <label>
                            <strong>Quantity: </strong>
                            <input
                              type="number"
                              style={{
                                fontSize: "14px",
                                color: "red",
                                width: "48%",
                              }}
                              value={selectedQuantity}
                              onChange={(e) =>
                                setSelectedQuantity(e.target.value)
                              }
                              min="1"
                              max={maxQuantity}
                              disabled
                            />
                          </label>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {selectedItem.Size < 20 && (
                          <Paragraph
                            style={{
                              fontSize: "20px",
                              textAlign: "left",
                              color: "red",
                            }}
                          >
                            <strong>Combo: </strong>
                            <input
                              type="number"
                              style={{
                                fontSize: "14px",
                                color: "red",
                                width: "48%",
                              }}
                              value={comboQuantity}
                              onChange={(e) => {
                                const value = Math.max(e.target.value, 1);
                                setComboQuantity(value);
                                setSelectedQuantity(value * 25);
                              }}
                              min="1"
                            />
                          </Paragraph>
                        )}
                      </div>
                    </Paragraph>
                    <Paragraph style={{ fontSize: "20px", textAlign: "left" }}>
                      <strong>Certificate ID: </strong>
                      <Text style={{ fontSize: "20px", color: "red" }}>
                        {selectedItem.CertificateID}
                      </Text>
                    </Paragraph>
                    <Paragraph>
                      <div
                        style={{
                          display: "flex",
                          paddingTop: "20px",
                          gap: "10px",
                        }}
                      >
                        <Button
                          type="primary"
                          danger
                          size="large"
                          onClick={handleOrderPlacement}
                          disabled={isAddedToCart}
                          style={{
                            flex: "0 1 40%", // Đặt width nhỏ hơn
                            padding: "10px", // Giảm padding
                            borderRadius: "8px",
                            fontSize: "18px", // Giảm font size
                            fontWeight: "bold",
                          }}
                        >
                          Mua Ngay
                        </Button>
                        <Button
                          style={{
                            flex: "1 1 60%", // Đặt width lớn hơn
                            padding: "20px", // Tăng padding
                            borderRadius: "8px",
                            fontSize: "22px", // Tăng font size
                            fontWeight: "bold",
                            backgroundColor: "#ffffff", // Màu nền trắng
                            color: "red", // Màu chữ cam
                            border: "2px solid red", // Viền cam
                            transition: "background-color 0.3s, transform 0.2s", // Hiệu ứng chuyển đổi
                          }}
                          onClick={handleAddToCart}
                          loading={loading}
                          size="large"
                          disabled={
                            isAddedToCart ||
                            quantityInCart + selectedQuantity > maxQuantity
                          }
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "red"; // Màu nền khi hover
                            e.currentTarget.style.color = "#FFFFFF"; // Màu chữ trắng khi hover
                            e.currentTarget.style.transform = "scale(1.05)"; // Phóng to nút khi hover
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#FFFFFF"; // Màu nền lại khi không hover
                            e.currentTarget.style.color = "red"; // Màu chữ lại khi không hover
                            e.currentTarget.style.transform = "scale(1)"; // Trở lại kích thước ban đầu
                          }}
                        >
                          <FaCartPlus style={{ marginRight: "8px" }} />
                          {isAddedToCart ? "Đã Thêm" : "Thêm Vào Giỏ Hàng"}
                        </Button>
                      </div>
                    </Paragraph>
                    {isAddedToCart && (
                      <Paragraph
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                      >
                        Hàng đã vào giỏ hàng của bạn!
                      </Paragraph>
                    )}
                  </>
                )}
              </div>
            </div>
          </div> */
}
