import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Typography } from "antd";
import axiosInstance from "../An/Utils/axiosJS";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
import { message } from "antd";

export default function ShoppingCart() {
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const res = await axiosInstance.post("/order/checkCart", null, {
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate("/formfillinformation");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 410) {
          message.error(data.message || "Sản phẩm trong giỏ hàng đã hết hàng.");
        } else {
          message.error(data.message || "Đã có lỗi xảy ra.");
        }
      } else {
        message.error("An error occurred while processing your payment.");
      }
    }
  };

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
          setTotalPrice(TotalPrice);
          console.log("Order details fetched and stored in localStorage.");
        } else {
          console.error(`API request failed with status: ${response.status}`);
          setError("Failed to fetch order details.");
        }
      } catch (error) {
        console.error(
          "Error fetching order details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchOrderDetails();
  }, []);

  const handleUpdateQuantity = async (koiId, newQuantity) => {
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

        if (
          typeof result === "string" &&
          result.includes("available in stock")
        ) {
          setError(result);
          return;
        }
        const updatedKoiList = koiList.map((koi) =>
          koi._id === koiId ? { ...koi, quantity } : koi
        );

        const { TotalPrice } = response.data.result.orderDT;
        if (TotalPrice !== undefined) {
          setKoiList(updatedKoiList);
          setTotalPrice(TotalPrice);
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
        window.location.reload();
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
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={koi.Image}
                      alt="Koi"
                      style={{
                        maxWidth: "100px",
                        marginRight: "15px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        flex: 1,
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {koi.KoiName}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        minWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      {koi.Price.toLocaleString()}đ
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        minWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      {koi.Status !== 4 && (
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
                      )}
                      {koi.Status === 4 && (
                        <input
                          type="number"
                          min={1}
                          value={1}
                          style={{ width: "70px" }}
                          disabled
                        />
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Roboto, sans-serif",
                        color: "#FF6A00",
                        minWidth: "120px",
                        textAlign: "center",
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
                  {totalPrice && totalPrice > 0
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)
                    : "Chờ bên shop định giá"}
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
