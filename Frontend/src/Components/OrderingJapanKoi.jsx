import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Row, Col, Card, Carousel } from "react-bootstrap";
import axios from "axios";
import "./Css/OrderingKoi.css";

export default function OrderingJapanKoi() {
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const [selectedSize, setSelectedSize] = useState(selectedItem?.Size || "");
  const [selectedBreed, setSelectedBreed] = useState(selectedItem?.Breed || "");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);

  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value)); // Update price state
  };

  useEffect(() => {
    const sendOrderDetails = async () => {
      console.log(selectedSize);
      console.log(selectedBreed);
      try {
        const response = await axios.post("/order/detail/price/minmax", {
          Size: selectedSize,
          Breed: selectedBreed,
          CategoryID: selectedItem.CategoryID,
        });
        console.log(response.data);
        setMin(response.data.result.min);
        setMax(response.data.result.max);
      } catch (error) {
        console.error("Error sending order details:", error);
      }
    };

    sendOrderDetails();
  }, [selectedSize, selectedBreed, selectedItem.CategoryID]);

  // Generate price options based on min and max
  const priceOptions = [];
  for (let i = min; i <= max; i += 100000) {
    priceOptions.push(i);
  }

  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: "150px" }}>
        <h1 className="text-center mb-4">Order Page</h1>
        {selectedItem ? (
          <>
            <Row className="justify-content-center">
              <Col md={3} className="mb-4">
                <Card className="koi-card">
                  <Carousel>
                    <Carousel.Item>
                      <video
                        controls
                        className="koi-video"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <source src={selectedItem.Video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <Carousel.Caption>
                        <h5 className="koi-name">
                          {selectedItem.KoiName} Video
                        </h5>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={selectedItem.Image}
                        alt={selectedItem.KoiName}
                        style={{ height: "400px", objectFit: "cover" }}
                      />
                      <Carousel.Caption>
                        <h5 className="koi-name">{selectedItem.KoiName}</h5>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="details-card">
                  <Card.Body>
                    <Card.Title className="mb-3 koi-title">
                      {selectedItem.KoiName}
                    </Card.Title>
                    <div className="mb-3">
                      <strong>Origin:</strong> {selectedItem.Origin}
                    </div>
                    <div className="mb-3">
                      <strong>Gender:</strong> {selectedItem.Gender}
                    </div>
                    <div className="mb-3">
                      <strong>Tình Trạng:</strong> còn hàng
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Size:</strong>
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select Size</option>
                        <option value="2">bé hơn 15cm</option>
                        <option value="15">15cm - 18 cm</option>
                        <option value="18">18cm-20cm</option>
                        <option value="20">20cm-25cm</option>
                        <option value="30">30cm</option>
                        <option value="35">35cm</option>
                        <option value="40">40cm</option>
                        <option value="45">45cm</option>
                        <option value="50">50cm</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                        <option value="65">65</option>
                        <option value="70">70</option>
                        <option value="75">75</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Breed:</strong>
                      </label>
                      <select
                        value={selectedBreed}
                        onChange={(e) => setSelectedBreed(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select Breed</option>
                        <option value="Nhat">Nhật</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <strong>Price:</strong>
                      <select
                        value={price}
                        onChange={handlePriceChange}
                        className="form-control"
                        style={{ marginLeft: "10px", width: "150px" }}
                      >
                        <option value="">Select Price</option>
                        {priceOptions.map((priceOption) => (
                          <option key={priceOption} value={priceOption}>
                            {priceOption.toLocaleString()} VND
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <strong>Description:</strong> {description}
                    </div>
                    <div className="mb-3">
                      <strong>Quantity:</strong>
                      <select value={count} onChange={handleCountChange}>
                        {Array.from(
                          { length: selectedItem.count },
                          (_, index) => index + 1
                        ).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="danger"
                        onClick={() => alert("Order placed!")}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => alert("Added to cart!")}
                        className="ms-3"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-4">
                <Card className="contact-card">
                  <Card.Body>
                    <Card.Title className="text-center contact-title">
                      Liên Hệ
                    </Card.Title>
                    <div className="mb-3">
                      <strong>Điện Thoại:</strong> 0123-456-789
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong> contact@example.com
                    </div>
                    <div className="mb-3">
                      <strong>Địa Chỉ:</strong> 123 Đường ABC, Thành phố XYZ
                    </div>
                    <div className="text-center">
                      <Button variant="danger">Gửi Liên Hệ</Button>
                    </div>
                  </Card.Body>
                </Card>
                <Card style={{ marginTop: "20px" }}>
                  <Card.Body>
                    <div className="mb-3">
                      <strong>Giao Hàng Tận Nơi:</strong> Giao hàng tận nơi với
                      các khách hàng miền Bắc
                    </div>
                    <hr />
                    <div className="mb-3">
                      <strong>SẢN PHẨM CHẤT LƯỢNG:</strong> Cá có giấy tờ, nguồn
                      gốc xuất xứ rõ ràng. Cam kết body, màu sắc, khoang cắt của
                      cá chuẩn, đẹp
                    </div>
                    <hr />
                    <div className="mb-3">
                      <strong>CHÍNH SÁCH BẢO HÀNH</strong> Luôn luôn đồng hành
                      với khách hàng sau khi thả cá. Giải đáp thắc mắc, lên chế
                      độ ăn, phòng bệnh và chữa bệnh cho cá phố XYZ
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <p className="text-center">No item selected.</p>
        )}
        <div></div>
      </Container>

      <div style={{ marginTop: "50px" }}>
        <Footer />
      </div>
    </>
  );
}
