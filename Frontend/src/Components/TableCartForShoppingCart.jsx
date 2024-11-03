import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Typography } from "antd";
import axiosInstance from "../An/Utils/axiosJS";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

export default function ShoppingCart() {
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/formfillinformation");
  };
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
        const response = await axiosInstance.get(
          "http://localhost:4000/order/detail",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
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
      }
    };

    fetchOrderDetails();
  }, []);

  const handleUpdateQuantity = async (koiId, newQuantity) => {
    // Validate newQuantity
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      setError("Invalid quantity.");
      return;
    }
    try {
      const response = await axiosInstance.post(
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
        const { TotalPrice } = response.data.result.orderDT;
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
  const handleDeleteKoi = async (koiId) => {
    console.log(`Deleting Koi with ID: ${koiId}`);
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/order/detail/remove",
        { KoiID: koiId.toString() },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert(response.data.message || "Deleted successfully");
        console.log(response);
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error(
        "Error during deletion:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div style={{ padding: "20px", width: "100%" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {koiList.length > 0 ? (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {koiList.map((koi, index) => (
                <tr
                  key={koi._id}
                  style={{
                    // marginBottom: '10px',
                    borderBottom:
                      index < koiList.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.1)"
                        : "none",
                  }}
                >
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "15px",
                      padding: "10px 0",
                    }}
                  >
                    <img
                      src={koi.Image}
                      alt="Koi"
                      style={{ maxWidth: "100px", marginRight: "15px" }}
                    />
                    <span style={{ fontSize: "15px", marginRight: "120px" }}>
                      {koi.KoiName}
                    </span>
                    <span style={{ fontSize: "15px", marginRight: "120px" }}>
                      {koi.Price.toLocaleString()}đ
                    </span>
                    <span style={{ fontSize: "15px", marginRight: "120px" }}>
                      <input
                        type="number"
                        min={1}
                        value={koi.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (!isNaN(newQuantity) && newQuantity >= 1) {
                            handleUpdateQuantity(koi._id, newQuantity);
                          } else {
                            handleUpdateQuantity(koi._id, 1);
                          }
                        }}
                        style={{ width: "70px" }}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Roboto, sans-serif",
                        color: "#FF6A00",
                        marginRight: "120px",
                      }}
                    >
                      {(koi.Price * koi.quantity).toLocaleString()}đ
                    </span>
                    <span>
                      <button
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          background: "none",
                          border: "none",
                          padding: "0",
                          outline: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.firstChild.style.color = "red")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.firstChild.style.color = "#D3D3D3")
                        }
                        onClick={() => handleDeleteKoi(koi._id)} // Use a function wrapper to avoid immediate invocation
                      >
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          style={{ fontSize: "20px", color: "#D3D3D3" }}
                        ></i>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: "0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                Tổng Tiền:{" "}
                <span style={{ color: "#FF6A00", fontSize: "20px" }}>
                  {totalPrice > 0
                    ? totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "0.00"}{" "}
                  VND
                </span>
              </h3>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button onClick={handlePayment} variant="danger">
              Mua Hàng
            </Button>
          </div>
        </>
      ) : (
        <Text style={{ color: "#FF6A00" }}>
          {error ||
            "Bạn chưa có thêm cá vào trong giỏ hàng. Xin vui lòng quay lại sau!."}
        </Text>
      )}
    </div>
  );
}
