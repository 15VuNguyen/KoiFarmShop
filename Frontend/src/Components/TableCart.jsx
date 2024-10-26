import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";
import axios from "axios";
import { Empty } from "antd"; // Import only Empty from Ant Design
import Cookies from "js-cookie";
import { Table, Input, Typography } from "antd";

const { Title, Text } = Typography;
export default function ShoppingCart() {
  const orderDetail = useOrder();
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0

  // useEffect(() => {
  //   const storedKoiList = JSON.parse(localStorage.getItem("koiList")) || [];
  //   const storedTotalPrice =
  //     parseFloat(localStorage.getItem("totalPrice")) || 0;

  //   const updatedKoiList = storedKoiList.map((koi) => ({
  //     ...koi,
  //     quantity: koi.quantity || 1,
  //   }));

  //   setKoiList(updatedKoiList);
  //   setTotalPrice(storedTotalPrice);

  //   // Check if the koi list is empty and orderId is available
  //   if (updatedKoiList.length === 0 && orderDetail?.orderId) {
  //     fetchOrderDetails(orderDetail.orderId);
  //   }
  // }, [orderDetail]);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/order/detail", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response);
        if (response.status === 200) {
          const { koiList, orderDT } = response.data.result;
          const { Items, TotalPrice } = orderDT;
          const koiMap = new Map(koiList.map((koi) => [koi._id, koi]));
          const updatedKoiList = Items.map((item) => {
            const koi = koiMap.get(item.KoiID);
            return koi ? { ...koi, quantity: item.Quantity } : null;
          }).filter((koi) => koi !== null);
          setKoiList(updatedKoiList);
          // Save to localStorage
          // localStorage.setItem("koiList", JSON.stringify(updatedKoiList));
          setTotalPrice(TotalPrice);
          console.log("Order details fetched and stored in localStorage.");
        } else {
          console.error(`API request failed with status: ${response.status}`);
          setError("Failed to fetch order details.");
        }
      } catch (error) {
        // Log thêm thông tin lỗi
        console.error(
          "Error fetching order details:",
          error.response ? error.response.data : error.message
        );
        setError("Error fetching order details.");
      }
    };
    fetchOrderDetails();
  }, [orderDetail]);
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order/detail", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        const { koiList, orderDT } = response.data.result;
        const { Items, TotalPrice } = orderDT;
        const koiMap = new Map(koiList.map((koi) => [koi._id, koi]));
        const updatedKoiList = Items.map((item) => {
          const koi = koiMap.get(item.KoiID);
          return koi ? { ...koi, quantity: item.Quantity } : null;
        }).filter((koi) => koi !== null);
        setKoiList(updatedKoiList);
        // Save to localStorage
        // localStorage.setItem("koiList", JSON.stringify(updatedKoiList));
        const orderDetails = JSON.parse(Cookies.get("orderDT") || "{}");
        const totalPriceFromCookies = orderDetails.TotalPrice || 0;
        setTotalPrice(totalPriceFromCookies);
        console.log("Order details fetched and stored in localStorage.");
      } else {
        console.error(`API request failed with status: ${response.status}`);
        setError("Failed to fetch order details.");
      }
    } catch (error) {
      // Log thêm thông tin lỗi
      console.error(
        "Error fetching order details:",
        error.response ? error.response.data : error.message
      );
      setError("Error fetching order details.");
    }
  };

  const handleQuantityChange = async (koiId, newQuantity) => {
    // Validate newQuantity
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      setError("Invalid quantity.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/order/detail/edit",
        {
          KoiID: koiId,
          Quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { result } = response.data;

        // Kiểm tra nếu có thông báo về số lượng không đủ
        if (
          typeof result === "string" &&
          result.includes("available in stock")
        ) {
          setError(result); // Hiển thị thông điệp từ phản hồi
          return;
        }
        const updatedKoiList = koiList.map((koi) =>
          koi._id === koiId ? { ...koi, quantity } : koi
        );

        // Kiểm tra cấu trúc phản hồi để lấy totalPrice
        const { Items, TotalPrice } = response.data.result.orderDT;
        if (TotalPrice !== undefined) {
          setKoiList(updatedKoiList);
          setTotalPrice(TotalPrice);
          // Lưu dữ liệu đã cập nhật vào localStorage
          // localStorage.setItem("koiList", JSON.stringify(updatedKoiList));
          // localStorage.setItem("totalPrice", newTotalPrice.toString());
        } else {
          setError("Failed to retrieve updated total price.");
        }
      }
    } catch (error) {
      setError("Error updating quantity: " + error.message);
    }
  };
  const columns = [
    {
      title: "Koi Name",
      dataIndex: "KoiName",
      key: "KoiName",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (image) => (
        <img src={image} alt="Koi" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, koi) => (
        <Input
          type="number"
          min={1}
          value={text}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
              handleQuantityChange(koi._id, newQuantity);
            } else {
              handleQuantityChange(koi._id, 1);
            }
          }}
          style={{ width: "80px" }}
        />
      ),
    },
  ];
  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <Title level={2}>Koi Order Details</Title>

      {error && <Text type="danger">{error}</Text>}
      {koiList.length > 0 ? (
        <>
          <Table
            dataSource={koiList}
            columns={columns}
            rowKey="_id"
            pagination={false}
            style={{ marginTop: "20px" }}
          />
          <Title level={3} style={{ marginTop: "20px" }}>
            Total Price:{" "}
            {totalPrice > 0
              ? totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              : "0.00"}{" "}
            VND
          </Title>
        </>
      ) : (
        <Text>{error || "No Koi items in this order."}</Text>
      )}
    </div>
  );
}
