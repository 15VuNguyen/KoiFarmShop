import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Typography, Modal, Empty } from "antd";
import axiosInstance from "../An/Utils/axiosJS";
const { Text } = Typography;

export default function TableCartForm(props) {
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [koiIdToDelete, setKoiIdToDelete] = useState(null); // Store the KoiID to delete
  const {onUpdateQuantity} = props

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get("/order/detail", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log("koilist", response.data.result);
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
        "/order/detail/edit",
        {
          KoiID: koiId,
          Quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if(onUpdateQuantity){
          onUpdateQuantity()
        }
        const { result } = response.data;

        if (
          typeof result === "string" &&
          result.includes("Số lượng còn lại trong giỏ hàng")
        ) {
          const remainingQuantity = parseInt(result.match(/\d+/)[0]);
          setError(`Số lượng cá trong kho chỉ còn ${remainingQuantity}`);
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

  const showDeleteConfirm = (koiId) => {
    setKoiIdToDelete(koiId);
    setVisible(true);
  };

  const handleDeleteKoi = async () => {
    try {
      const response = await axiosInstance.post(
        "/order/detail/remove",
        { KoiID: koiIdToDelete.toString() },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error during deletion:",
        error.response ? error.response.data : error.message
      );
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div style={{ padding: "20px", width: "100%", minHeight: "50vh" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {koiList.length > 0 ? (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}>Hình ảnh</th>
                <th style={{ padding: "10px" }}>Tên sản phẩm</th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Đơn giá
                </th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Số lượng
                </th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Thành tiền
                </th>
                <th style={{ padding: "10px" }}>Xóa</th>
              </tr>
            </thead>
            <hr
              style={{
                width: "600%",
                height: "1px",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
                margin: "20px 0",
              }}
            />
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
                  </td>
                  <td
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
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                  >
                    {koi.Price.toLocaleString()}đ
                  </td>
                  <td
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
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      fontFamily: "Roboto, sans-serif",
                      color: "#FF6A00",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                  >
                    {(koi.Price * koi.quantity).toLocaleString()}đ
                  </td>
                  <td>
                    <button
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        background: "none",
                        border: "none",
                        padding: "0",
                        outline: "none",
                      }}
                      onClick={() => showDeleteConfirm(koi._id)}
                    >
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ fontSize: "20px", color: "#D3D3D3" }}
                      ></i>
                    </button>
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
        </>
      ) : (
        <Text style={{ color: "#FF6A00" }}>
          {error ||
            "Bạn chưa có thêm cá vào trong giỏ hàng. Xin vui lòng quay lại sau!."}
          <Empty style={{ marginTop: "60px" }} />
        </Text>
      )}

      <Modal
        title="Xác nhận xóa"
        visible={visible}
        onOk={handleDeleteKoi}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
      </Modal>
    </div>
  );
}
