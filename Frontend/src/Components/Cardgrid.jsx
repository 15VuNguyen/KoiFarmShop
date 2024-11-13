import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const CardGrid = ({ cardData }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All"); // State for category switch

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // Group Koi fish by Size, Breed, and Status
  const groupCards = (status) => {
    return cardData
      .filter((card) => card.Status === status)
      .reduce((acc, card) => {
        const key = `${card.Size}-${card.Breed}-${card.Status}-${card.Price}`; // Include price in the unique key
        if (!acc[key]) {
          acc[key] = { count: 0, card }; // Initialize if key doesn't exist
        }
        acc[key].count += 1; // Increment count
        return acc;
      }, {});
  };
  const groupCards2 = (status) => {
    return cardData.filter((card) => card.Status === status);
  };
  // const groupedKygui = groupCards(4); // Grouping for Cá Ký Gửi
  const groupedKyGui = groupCards2(4);

  const groupedNhat = groupCards(1); // Grouping for Cá Koi Nhật
  const groupedIkoi = cardData
    .filter((card) => card.Status === 2 || card.Status === 3) // Include both statuses
    .reduce((acc, card) => {
      const key = `${card.Size}-${card.Breed}-${card.Status}`; // Create a unique key
      if (!acc[key]) {
        acc[key] = { count: 0, card }; // Initialize if key doesn't exist
      }
      acc[key].count += 1; // Increment count
      return acc;
    }, {});
  const groupAll = cardData
    .filter(
      (card) =>
        card.Status === 1 ||
        card.Status === 2 ||
        card.Status === 3 ||
        card.Status === 4
    )
    .reduce((acc, card) => {
      if (card.Status === 4) {
        // Nếu Status là 4, thêm thẻ vào mảng riêng
        acc.push({ card }); // Chỉ lưu thẻ mà không có count
      } else {
        // Nếu không phải Status 4, nhóm theo Size, Breed, Status
        const key = `${card.Size}-${card.Breed}-${card.Status}`; // Tạo khóa duy nhất
        if (!acc[key]) {
          // Khởi tạo nếu khóa chưa tồn tại
          acc[key] = { card, count: 0 }; // Khởi tạo với count = 0
        }
        acc[key].count += 1; // Tăng count cho nhóm
      }
      return acc;
    }, []);
  return (
    <div className="container" style={{ padding: "0" }}>
      <Divider
        orientation="left"
        style={{ margin: "0", marginBottom: "40px", cursor: "pointer" }}
      >
        <Text
          style={{ fontSize: "24px", fontWeight: "bold", color: "#920202" }}
        >
          {category === "kygui"
            ? "Cá Ký Gửi"
            : category === "ikoi"
            ? "Cá Ikoi"
            : category === "nhat"
            ? "Cá Koi Nhật"
            : "Tất cả"}
        </Text>
      </Divider>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col>
          <Text
            style={{ cursor: "pointer", marginRight: "20px", color: "#920202" }}
            onClick={() => handleCategoryChange("All")}
          >
            Tất cả
          </Text>
        </Col>
        <Col>
          <Text
            style={{ cursor: "pointer", marginRight: "20px", color: "#920202" }}
            onClick={() => handleCategoryChange("kygui")}
          >
            Cá Ký Gửi
          </Text>
        </Col>
        <Col>
          <Text
            style={{ cursor: "pointer", marginRight: "20px", color: "#920202" }}
            onClick={() => handleCategoryChange("ikoi")}
          >
            Cá Ikoi
          </Text>
        </Col>
        <Col>
          <Text
            style={{ cursor: "pointer", color: "#920202" }}
            onClick={() => handleCategoryChange("nhat")}
          >
            Cá Koi Nhật
          </Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {category === "All" &&
          Object.values(groupAll).map(({ count, card }) => (
            <Col
              key={card._id}
              xs={12}
              sm={8}
              md={4}
              lg={4}
              xl={4}
              className="mb-4"
            >
              <Card
                size="default"
                hoverable
                style={{ width: "100%", borderRadius: "8px", height: "100%" }}
                cover={
                  <img
                    alt={card.KoiName}
                    src={card.Image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                onClick={() =>
                  navigate("/order", { state: { selectedItem: card } })
                }
              >
                <Text strong style={{ color: "#920202" }}>
                  {card.KoiName || "Cá Koi chưa được đặt tên"}
                </Text>
                <br />
                {card.Status === 1 && <Text strong>Số lượng : {count}</Text>}
                {card.Status === 2 && <Text strong>Số lượng : {count}</Text>}
                {card.Status === 3 && <Text strong>Số lượng : {count}</Text>}
                {card.Status === 4 && <Text strong>Số lượng : 1 </Text>}
                <br />
                <Text strong>Kích thước : {card.Size} cm</Text>
                <br />
                <Text strong> Giống loài : {""}</Text>
                {card.Status === 1 && <Text strong>Nhật Nhập Khẩu</Text>}
                {card.Status === 2 && <Text strong>F1</Text>}
                {card.Status === 3 && <Text strong>Việt</Text>}
                {card.Status === 4 && <Text strong>Ký Gửi</Text>}
                <br />
                <Text strong style={{ color: "red" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                      fontSize: "16px",
                    }}
                  ></span>
                  {card.Price
                    ? `Giá: ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(card.Price)}`
                    : "Liên hệ"}
                </Text>
              </Card>
            </Col>
          ))}
        {category === "kygui" &&
          Object.values(groupedKyGui).map((card) => (
            <Col
              key={card._id}
              xs={12}
              sm={8}
              md={4}
              lg={4}
              xl={4}
              className="mb-4"
            >
              <Card
                hoverable
                style={{ width: "100%", borderRadius: "8px", height: "100%" }}
                cover={
                  <img
                    alt={card.KoiName}
                    src={card.Image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                onClick={() =>
                  navigate("/order", { state: { selectedItem: card } })
                }
              >
                <Text strong style={{ color: "#920202" }}>
                  {" "}
                  {card.KoiName || "N/A"}
                </Text>
                <br />
                <Text strong>
                  Kích thước:{""}
                  {card.Size}
                </Text>
                <br />
                <Text strong>Số lượng : 1</Text>
                <br />
                {card.Status === 4 && <Text strong> Cá Ký Gửi</Text>}
                <br />
                {card.Breed === "Viet" && (
                  <Text strong> Giống loài : {""}Việt</Text>
                )}
                {card.Breed === "F1" && (
                  <Text strong> Giống loài : {""}F1</Text>
                )}
                {card.Breed === "Nhat" && (
                  <Text strong> Giống loài : {""}Nhật</Text>
                )}
                <br />
                <Text strong style={{ color: "red" }}>
                  {card.Price
                    ? `Giá: ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(card.Price)}`
                    : "Liên hệ"}
                </Text>
              </Card>
            </Col>
          ))}

        {category === "ikoi" &&
          Object.values(groupedIkoi).map(({ count, card }) => (
            <Col
              key={card._id}
              xs={12}
              sm={8}
              md={4}
              lg={4}
              xl={4}
              className="mb-4"
            >
              <Card
                hoverable
                style={{ width: "100%", borderRadius: "8px", height: "100%" }}
                cover={
                  <img
                    alt={card.KoiName}
                    src={card.Image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                onClick={() =>
                  navigate("/order", { state: { selectedItem: card } })
                }
              >
                <Text strong style={{ color: "#920202" }}>
                  {card.KoiName || "Cá Koi chưa được đặt tên"}
                </Text>
                <br />
                <Text strong>Số lượng : {count}</Text>
                <br />
                <Text strong style={{}}>
                  Kích thước : {card.Size} cm
                </Text>
                <br />
                {card.Breed === "Nhat" && (
                  <Text strong> Giống loài : {""}Nhật</Text>
                )}
                {card.Breed === "Viet" && (
                  <Text strong> Giống loài : {""}Việt</Text>
                )}
                {card.Breed === "F1" && (
                  <Text strong> Giống loài : {""}F1</Text>
                )}
                <br />
                <Text strong style={{ color: "red" }}>
                  {card.Price
                    ? `Giá: ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(card.Price)}`
                    : "Liên hệ"}
                </Text>
              </Card>
            </Col>
          ))}

        {category === "nhat" &&
          Object.values(groupedNhat).map(({ count, card }) => (
            <Col
              key={card._id}
              xs={12}
              sm={8}
              md={4}
              lg={4}
              xl={4}
              className="mb-4"
            >
              <Card
                hoverable
                style={{ width: "100%", borderRadius: "8px", height: "100%" }}
                cover={
                  <img
                    alt={card.KoiName}
                    src={card.Image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                onClick={() =>
                  navigate("/order", { state: { selectedItem: card } })
                }
              >
                <Text strong style={{ color: "#920202" }}>
                  {card.KoiName || "Cá Koi chưa được đặt tên"}
                </Text>
                <br />
                <Text strong>Số lượng {count}</Text>
                <br />
                <Text strong style={{}}>
                  Kích thước : {card.Size} cm
                </Text>
                <br />
                <Text strong>Giống loài : </Text>
                {card.Status === 1 && <Text strong>Nhật Nhập Khẩu</Text>}
                <br />
                <Text strong style={{ color: "red" }}>
                  {card.Price
                    ? `Giá: ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(card.Price)}`
                    : "Liên hệ"}
                </Text>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

CardGrid.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      CategoryID: PropTypes.string.isRequired,
      KoiName: PropTypes.string.isRequired,
      Age: PropTypes.number.isRequired,
      Origin: PropTypes.string.isRequired,
      Gender: PropTypes.string.isRequired,
      Size: PropTypes.number.isRequired,
      Price: PropTypes.number,
      Breed: PropTypes.string.isRequired,
      Description: PropTypes.string,
      DailyFoodAmount: PropTypes.number.isRequired,
      FilteringRatio: PropTypes.number.isRequired,
      Image: PropTypes.string.isRequired,
      Video: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardGrid;
