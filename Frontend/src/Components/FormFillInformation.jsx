import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";
import TableCartForm from "./TableCartForm";
import { toast } from "react-toastify";
import "./FormFillInformation.css"
import { useAuth } from "../Context/AuthContext";
import { Spin, message, Descriptions } from "antd";
import { checkDiscountPrice, getCard, getCardList } from "../services/loyaltyCardService";
import { createOrder, getOrderDetail } from "../services/orderService";
import { AutoComplete } from "antd";
import useAddress from "../An/Ant Design/Components/useAddress";
export default function FormFillInformation() {
  // const orderDetail = useOrder(); // Đảm bảo rằng hàm này trả về giá trị hợp lệ
  const { searchText,
    setSearchText,
    recommendations,
  } = useAddress();
  const navigate = useNavigate();
  const location = useLocation()
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [applyDiscountLoading, setApplyDiscountLoading] = useState(false);
  const { currentUser } = useAuth()
  const [orderDetail, setOrderDetail] = useState(null)
  const [userCard, setUserCard] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const [isApplyDiscount, setIsApplyDiscount] = useState(false)
  const [isShowDiscount, setIsShowDiscount] = useState(false)
  const [loyaltyCardList, setLoyaltyCardList] = useState([])
  const [discount, setDiscount] = useState(null)
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);


  // const handleSubmit = async (values) => {
  //   const dataToSend = {
  //     ...values,
  //   };

  //   console.log(dataToSend); // Kiểm tra dữ liệu

  //   try {
  //     const response = await axiosInstance.post(`order/create/`, dataToSend, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       message.success(response.data.message);
  //       toast.success("Đặt hàng thành công!");
  //       navigate("/paymentmethod");
  //     } else {
  //       message.error(`Có lỗi xảy ra: ${response.data.message}`);
  //     }
  //   } catch (error) {
  //     message.error("Có lỗi xảy ra khi gửi thông tin.");
  //     console.error(error);
  //   }
  // };

  // const fetchUserData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/users/me");
  //     if (response.data) {
  //       setUserData(response.data.result);
  //     } else {
  //       console.error("Dữ liệu không hợp lệ:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleOpenUpdateForm = () => {
    setIsShow(!isShow)
  }

  // const handleClose = () => {
  //   setIsShow(false)
  // }
  const fetchCardInfo = async () => {
    setLoading(true);
    try {
      const { data } = await getCard()
      console.log("API Response:", data);

      if (data && data.result) {
        setUserCard(data.result.loyaltyCard);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching card information:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoyaltyCardList = async () => {
    setVoucherLoading(true)
    try {
      const { data } = await getCardList()
      if (data && data.result) {
        console.log("all above: ", data.result.allRank)
        setLoyaltyCardList(data.result.allRank)
        setVoucherLoading(false)
      }else{
        console.error(data.message)
        setVoucherLoading(false)
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  const fetchOrderDetail = async () => {
    try {
      const { data } = await getOrderDetail()
      if (data) {
        console.log("order detail: ", data.result)
        setOrderDetail(data.result.orderDT)
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  const handleOpenVoucherList = async () => {
    const newIsShowDiscount = !isShowDiscount;
    setIsShowDiscount(newIsShowDiscount);
    if (newIsShowDiscount) {
      await fetchLoyaltyCardList();
    }
  }

  const handleChangeMethod = () => {
    setIsShowPaymentMethod(!isShowPaymentMethod)
  }

  const handleApplyDiscount = async () => {
    setApplyDiscountLoading(true)
    try {
      console.log("is Apply? ", isApplyDiscount)
      const { data } = await checkDiscountPrice(isApplyDiscount)
      if (data) {
        console.log("check price: ", data)
        setDiscount(data.result)
        setApplyDiscountLoading(false)
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  useEffect(() => {
    fetchOrderDetail()
  }, [isApplyDiscount])

  useEffect(() => {
    handleApplyDiscount();
  }, [isApplyDiscount]);


  useEffect(() => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('termUserInfo')) ? JSON.parse(localStorage.getItem('termUserInfo')) : JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      console.log("authUser: ", user)
      setUserData(user)
      fetchCardInfo()
      setLoading(false)
    }
  }, [currentUser]);

  const handleUpdateUserData = (field, value) => {
    // Hàm này sẽ cập nhật dữ liệu người dùng trong state
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Nếu muốn update thông tin user ở trang này và cả ở trong db thì xử lí ở đây
  // const handleUpdate = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const updatedUserData = userData
  //     if(updatedUserData){
  //       console.log("updated user data: ", updatedUserData)
  //     }
  //   } catch (error) {
  //     console.error({message: error.message})
  //   }
  // }

  const handlePayment = async (e) => {
    try {
      const orderData = {
        Name: name ? name : userData?.name,
        PhoneNumber: phoneNumber ? phoneNumber : userData?.phone_number,
        ShipAddress: address ? address : userData?.address,
        Description: description
      }
      console.log("order data: ",orderData)
      if(orderData){
        const {data} = await createOrder(orderData, isApplyDiscount, paymentMethod)
        if(data && data.result){
          console.log("order detail info: ", data.result.order)
          localStorage.setItem('order', JSON.stringify(data.result.order))
          if(paymentMethod == "online"){
            navigate('/paymentmethod')
            toast.success('Đặt hàng thành công')
          }else{
            navigate('/')
            toast.success('Đặt hàng thành công')
          }
        }
      }
    } catch (error) {
      console.error({ message: error.message })
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px", paddingTop: "100px", backgroundColor: "rgb(245, 245, 245)" }}>
        <div className="common-css title">
          <h2>Đơn hàng của bạn</h2>
        </div>
        <Container className="white-board">
          <div className="common-css user-info">
            <div className="user-info-form">
              <h4>Thông tin người nhận</h4>
              <div className="u-content">
                <div className="content">
                  <div className="header-content">
                    <p>Anh/Chị: {userData?.name}</p>
                    <p>Số Điện Thoại: {userData?.phone_number}</p>
                  </div>
                  <p>Địa chỉ: {userData?.address ? userData.address : "N/A"}</p>
                  <span></span>
                </div>
                <Button className="change-btn" variant={`${isShow ? "danger" : "success"}`} onClick={() => handleOpenUpdateForm()}>{isShow ? <span>Đóng</span> : <span>Thay đổi</span>}</Button>
              </div>
            </div>

            {/* {isShow && */}
            <div className={`update-form ${isShow ? 'show' : ''}`}>
              <Container>
                <h2 className="mt-4 mb-4">Update Your Information</h2>
                <Form >
                  <Form.Group as={Row} controlId="formEmail" className="mb-3">
                    <Form.Label column sm={3}>
                      Email
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="email" placeholder="Nhập email của bạn" disabled required
                        style={{ cursor: "not-allowed" }}
                        value={userData?.email}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formName" className="mb-3">
                    <Form.Label column sm={3}>
                      Tên
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="text" placeholder="Nhập tên của bạn" required
                        value={userData?.name}
                        onChange={(e) => {
                          handleUpdateUserData('name', e.target.value)
                          setName(e.target.value)
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPhoneNumber" className="mb-3">
                    <Form.Label column sm={3}>
                      Số điện thoại
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="tel" placeholder="Nhập số điện thoại của bạn" required 
                        value={userData?.phone_number}
                        onChange={(e) => {
                          handleUpdateUserData('phone_number', e.target.value)
                          setPhoneNumber(e.target.value)
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formShipAddress" className="mb-3">
                    <Form.Label column sm={3}>
                      Địa chỉ nhận hàng
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="text" placeholder="Nhập địa chỉ nhận hàng"  required 
                        value={userData?.address}
                        onChange={(e) => {
                          handleUpdateUserData('address', e.target.value)
                          setAddress(e.target.value)
                        }}
                      /> 
                      <AutoComplete style={{width:'100%'}} value={userData?.address} onChange={e=>{
                        handleUpdateUserData('address', e)
                        setAddress(e)
                        setSearchText(e)
                      }} options={recommendations.map((address) => ({ value: address }))} placeholder="Enter your shipping address" />
                    </Col>
                  </Form.Group>
                  {/* <div className="text-center">
                    <Button className="save-btn" variant="primary" type="submit" >
                      Lưu
                    </Button>
                  </div> */}

                </Form>
              </Container>
            </div>
            {/* } */}

          </div>
          <div className="common-css product-info">
            <h4 className="bb">Sản phẩm</h4>
            <TableCartForm setTotalPrice = {setTotalPrice} />

          </div>
          <div className="common-css voucher">
            <div className="bb voucher-header d-flex justify-content-between">
              <h4 className=" d-flex align-items-center m-0">Mã giảm giá</h4>
              {/* <span className="voucher-select d-flex align-items-center fs-6">Chọn voucher</span> */}
              <Button className="discount-btn" variant={`${isShowDiscount ? "danger" : "warning"}`} onClick={() => handleOpenVoucherList()}>{isShowDiscount ? "Đóng" : "Chọn Phiếu Giảm Giá"}</Button>
            </div>
            <div className={`voucher-info-form ${isShowDiscount ? 'show' : ''}`}>
              {!voucherLoading ? (
                isShowDiscount ? (
                  <div className={`voucher-container`}>
                    <p className="voucher-title">Thẻ Thành Viên</p>
                    <div className="voucher-list">
                      {loyaltyCardList && loyaltyCardList.length > 0 ? (
                        loyaltyCardList.map((card, index) => (
                          <div
                            className={`voucher-detail ${card.name !== userCard?.RankName ? "disable" : ""} ${card.name === userCard?.RankName && isApplyDiscount ? "active" : ""}`}
                            key={index}
                            onClick={() => {
                              if (card.name === userCard.RankName) {
                                setIsApplyDiscount((prev) => !prev); // Cập nhật trạng thái
                              }
                            }}

                          >
                            <span className="rank-name">Thành viên {card?.name}</span>
                            <span className="discount">Tổng  giảm: {card?.salePercent}%</span>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p>Bạn chưa có thẻ thành viên của IKOI</p>
                          <p>Đăng kí ngay <Link to={'/profile'} style={{color:"blue", textDecoration:"underline"}}>tại đây</Link></p>
                        </div>
                        
                      )}
                    </div>
                  </div>
                ) : null
              ) : (
                <Spin size="large" />
              )}
            </div>

          </div>
          <div className="common-css total">
            <div className="payment-method bb">
              <h4 className="">Phương thức thanh toán</h4>
              <div className="payment-detail">
                <p className="m-0">{paymentMethod == "cash" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}</p>
                <Button 
                  className="change-btn" 
                  variant={`${isShowPaymentMethod ? "danger" : "success"}`}
                  onClick={()=>handleChangeMethod()}  
                >{isShowPaymentMethod ? <span>Đóng</span> : <span>Thay đổi</span>}</Button>
              </div>
                <div className={`payment-selector ${isShowPaymentMethod ? "show" : ""}`}>
                  <div className="empty"></div>
                  <div className="selector">
                    <p 
                      className={`${paymentMethod == "cash" ? "active" : ""}`}
                      onClick={()=>{
                        if(isShowPaymentMethod)
                          setPaymentMethod("cash")
                        }
                      }
                    >Thanh toán khi nhận hàng</p>              
                    <p 
                      className={`${paymentMethod != "cash" ? "active" : ""}`}
                      onClick={()=>{
                        if(isShowPaymentMethod)
                          setPaymentMethod("online")
                        }
                      }
                    >Thanh toán online</p>    
                  </div>
                </div>

            </div>
            <div className="total-info-form">
              <div className="empty">
                <Form.Group as={Row} controlId="formName" className="mb-3">
                  <Form.Label className="" column sm={2}>
                    Lưu ý cho người bán:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Mô tả"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} />
                  </Col>
                </Form.Group>
              </div>
              <div className="total-detail">
                <div className="total-product-price price-content">
                  <h5 className="price-title">Tổng tiền hàng</h5>
                  <p className="price">₫{totalPrice.toLocaleString('vi-VN')}</p>
                </div>
                {discount && discount.totalDiscount > 0 && (
                  <div className="voucher price-content">
                    <h5 className="price-title">Tổng mã giảm</h5>
                    <p className="price"><span className="discount-note">({userCard?.RankName + " thành viên " + userCard?.SalePercent}%)</span> -₫{discount.totalDiscount.toLocaleString("vi-VN")}</p>
                  </div>
                )}
                {orderDetail?.TotalPrice  && (
                  <div className="total-price price-content">
                    <h5 className="price-title">Tổng thanh toán</h5>
                    <p className="totalPrice price">₫{(orderDetail.TotalPrice - (discount?.totalDiscount || 0)).toLocaleString("vi-VN")}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-end">
              <button className="pay-btn" onClick={()=>handlePayment()} >Thanh Toán</button>
            </div>
          </div>
          {/* <div style={{ flex: 1, padding: "20px" }}>
              <h4 style={{ textAlign: "center" }}>Đơn hàng của bạn</h4>
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
              <h4 style={{ textAlign: "center" }}>
                Form điền thông tin người dùng
              </h4>
              {loading ? (
                <Spin size="large" />
              ) : (
                <></>
                // <Form
                //   style={{ maxWidth: 600, margin: "auto" }}
                //   onFinish={handleSubmit} // Thay đổi ở đây
                //   initialValues={{
                //     email: userData?.email || "",
                //     name: userData?.name || "",
                //     address: userData?.address || "",
                //     phone_number: userData?.phone_number || "",
                //     ShipAddress: userData?.address || "",
                //   }}
                // >
                //   <Form.Item
                //     name="email"
                //     label="Email"
                //     rules={[
                //       {
                //         required: true,
                //         type: "email",
                //         message: "Vui lòng nhập email hợp lệ.",
                //       },
                //     ]}
                //   >
                //     <Input placeholder="Nhập email" />
                //   </Form.Item>

                //   <Form.Item
                //     name="name"
                //     label="Họ và tên"
                //     rules={[
                //       { required: true, message: "Vui lòng nhập họ và tên." },
                //     ]}
                //   >
                //     <Input placeholder="Nhập họ và tên" />
                //   </Form.Item>

                //   <Form.Item
                //     name="address"
                //     label="Địa chỉ"
                //     rules={[
                //       { required: true, message: "Vui lòng nhập địa chỉ." },
                //     ]}
                //   >
                //     <Input placeholder="Nhập địa chỉ" />
                //   </Form.Item>

                //   <Form.Item
                //     name="phone_number"
                //     label="Số điện thoại"
                //     rules={[
                //       {
                //         required: true,
                //         message: "Vui lòng nhập số điện thoại.",
                //       },
                //     ]}
                //   >
                //     <Input placeholder="Nhập số điện thoại" />
                //   </Form.Item>
                //   <Form.Item
                //     name="ShipAddress"
                //     label="Địa chỉ giao hàng"
                //     rules={[
                //       {
                //         required: true,
                //         message: "Vui lòng nhập địa chỉ giao hàng.",
                //       },
                //     ]}
                //   >
                //     <Input placeholder="Nhập địa chỉ giao hàng" />
                //   </Form.Item>

                //   <Form.Item style={{ textAlign: "center" }}>
                //     <Button type="primary" htmlType="submit">
                //       Gửi
                //     </Button>
                //   </Form.Item>
                // </Form>
              )} 
            </div> */}
        </Container>
      </div>

      <Footer />
    </div>
  );
}
