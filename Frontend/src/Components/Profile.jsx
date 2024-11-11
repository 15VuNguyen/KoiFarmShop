import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Input, Button, Modal, Form, Spin } from "antd";
import axiosInstance from "../An/Utils/axiosJS";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import {
  EditOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  LockOutlined,
} from "@ant-design/icons"; // Import icon bút chì
import DonKyGuiPage from "./Donkygui";
import ChangePassword from "./ChangePassword";
import TrackingOrderPage from "./trackingOrderPage";
import UpdateProfile from "./UpdateProfile";
import LoyaltyCardInfo from "./LoyaltyCardInfo";
// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Hàm kiểm tra tính hợp lệ (giữ nguyên)
const isValidUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);
const isValidNameOrAddress = (input) =>
  /^[\w\s]+$/.test(input) && !/\s{2,}/.test(input);
const isValidPhoneNumber = (phone) => /^\d{10,11}$/.test(phone);
const isValidURL = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
};

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null); // Lưu trữ dữ liệu gốc
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [websiteError, setWebsiteError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const toastIdRef = useRef(null);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const navigate = useNavigate();

  const maskEmail = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex > 2) {
      const firstPart = email.slice(0, 2);
      const maskedPart = "*".repeat(atIndex - 2);
      return `${firstPart}${maskedPart}${email.slice(atIndex)}`;
    }
    return email;
  };

  // const validateField = (field) => {
  //   const newErrors = {};
  //   switch (field) {
  //     case "username":
  //       if (!isValidUsername(userData.username)) {
  //         newErrors.username = "Tên đăng nhập không được có ký tự đặc biệt.";
  //       }
  //       break;
  //     case "name":
  //       if (!isValidNameOrAddress(userData.name)) {
  //         newErrors.name =
  //           "Tên không được có ký tự đặc biệt và khoảng cách liên tiếp.";
  //       }
  //       break;
  //     case "address":
  //       if (!isValidNameOrAddress(userData.address)) {
  //         newErrors.address =
  //           "Địa chỉ không được có ký tự đặc biệt và khoảng cách liên tiếp.";
  //       }
  //       break;
  //     case "phone_number":
  //       if (!isValidPhoneNumber(userData.phone_number)) {
  //         newErrors.phone_number = "Số điện thoại phải từ 10 đến 11 chữ số.";
  //       }
  //       break;
  //     case "website":
  //       if (userData.website && !isValidURL(userData.website)) {
  //         setWebsiteError(
  //           "Website không hợp lệ. Vui lòng nhập một URL hợp lệ."
  //         );
  //         return;
  //       }
  //       setWebsiteError(""); // Reset lỗi nếu URL hợp lệ
  //       break;
  //     default:
  //       break;
  //   }
  //   return newErrors;
  // };

  const handleUpdate = async (field) => {
    const errors = validateField(field);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({}); // Reset lỗi nếu tất cả đều hợp lệ

    if (userData.verify !== 1) {
      setShowVerificationModal(true);
      return;
    } else {
      await updateUser(field, userData[field]);
      // Reload page after update
      window.location.reload();
    }
  };

  const updateUser = async (field, value) => {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:4000/users/me`,
        { [field]: String(value) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response.data);
      toast.success("Cập nhật thành công.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Cập nhật thất bại.");

      if (error.response) {
        console.error("Error response data:", error.response.data);

        // Check for specific validation errors
        if (error.response.status === 422 && error.response.data.errors) {
          // Loop through errors to display specific messages
          const errorMessages = Object.values(error.response.data.errors).join(
            ", "
          );
          toast.error(`Lỗi: ${errorMessages}`);
        } else {
          toast.error(
            `Lỗi: ${error.response.data.message || "Vui lòng thử lại."}`
          );
        }
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("users/me");
        if (response.data) {
          setUserData(response.data.result);
          setOriginalUserData(response.data.result); // Lưu trữ dữ liệu gốc
        } else {
          console.error("Dữ liệu không hợp lệ:", response.data);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const maskedEmail =
    userData && userData.email ? maskEmail(userData.email) : "";

  const handleUploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleImageChange = async () => {
    if (userData.verify !== 1) {
      setShowVerificationModal(true);
      return;
    }
    if (selectedFile) {
      const imageUrl = await handleUploadImage(selectedFile);
      setUserData({ ...userData, avatar: imageUrl });
      await updateUser("picture", imageUrl); // Cập nhật URL hình ảnh lên server
      toast.success("Cập nhật ảnh đại diện thành công!");
      setShowImageModal(false); // Đóng modal sau khi tải ảnh thành công
    } else {
      toast.error("Vui lòng chọn một tệp ảnh.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleResendVerification = async () => {
    try {
      await axiosInstance.post("users/resend-verify-email", {});
      toast.success(
        "Email xác minh đã được gửi lại. Sau khi xác nhận vui lòng đăng nhập lại để update"
      );
      setShowVerificationModal(false);
    } catch (error) {
      console.error("Lỗi khi gửi lại email xác minh:", error);
      toast.error("Gửi lại email xác minh thất bại.");
    }
  };

  const handleUpdateAll = async () => {
    const newErrors = {};
    const fieldsToUpdate = []; // Lưu trữ các trường cần cập nhật

    // Kiểm tra tên đăng nhập
    if (userData.username !== originalUserData.username) {
      if (!isValidUsername(userData.username)) {
        newErrors.username = "Tên đăng nhập không được có ký tự đặc biệt.";
      } else {
        fieldsToUpdate.push("username");
      }
    }

    // Kiểm tra tên
    if (userData.name !== originalUserData.name) {
      if (!isValidNameOrAddress(userData.name)) {
        newErrors.name =
          "Tên không được có ký tự đặc biệt và khoảng cách liên tiếp.";
      } else {
        fieldsToUpdate.push("name");
      }
    }

    // Kiểm tra địa chỉ
    if (userData.address !== originalUserData.address) {
      if (!isValidNameOrAddress(userData.address)) {
        newErrors.address =
          "Địa chỉ không được có ký tự đặc biệt và khoảng cách liên tiếp.";
      } else {
        fieldsToUpdate.push("address");
      }
    }

    // Kiểm tra số điện thoại
    if (userData.phone_number !== originalUserData.phone_number) {
      if (!isValidPhoneNumber(userData.phone_number)) {
        newErrors.phone_number = "Số điện thoại phải từ 10 đến 11 chữ số.";
      } else {
        fieldsToUpdate.push("phone_number");
      }
    }

    // Kiểm tra website chỉ nếu có giá trị và khác với giá trị gốc
    if (userData.website && userData.website !== originalUserData.website) {
      if (!isValidURL(userData.website)) {
        setWebsiteError("Website không hợp lệ. Vui lòng nhập một URL hợp lệ.");
        return;
      }
      fieldsToUpdate.push("website");
    }

    // Nếu có lỗi, lưu lại và không thực hiện cập nhật
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    // Nếu không có lỗi, thực hiện cập nhật
    setValidationErrors({}); // Reset lỗi nếu tất cả đều hợp lệ

    if (userData.verify !== 1) {
      setShowVerificationModal(true);
      return;
    } else {
      const updatePromises = fieldsToUpdate.map((field) =>
        updateUser(field, userData[field])
      );
      await Promise.all(updatePromises);

      // Reload page after update
      window.location.reload();
    }
  };
  const handleClick = (componentName) => {
    setCurrentComponent(componentName);
    setActiveButton(componentName);
  };
  if (loading) {
    return (
      <div>
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        ></Spin>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", paddingTop: "50px" }}>
        <Row justify="center" style={{ paddingTop: "50px" }}>
          <Col
            span={6}
            style={{
              paddingLeft: "70px",
            }}
          >
            <div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "40%" }}>
                  {userData && userData.picture ? (
                    <img
                      src={userData.picture}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        border: "2px dashed #007bff", // Màu viền
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <span>Chưa có ảnh</span>
                    </div>
                  )}
                </div>

                <div style={{ width: "50%", textAlign: "left" }}>
                  <h4
                    style={{
                      margin: 0,
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "100px",
                    }}
                  >
                    {userData ? userData.name : "Tài khoản"}
                  </h4>
                  <h6
                    style={{
                      color: "gray",
                      opacity: 0.6,
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></h6>
                </div>
              </div>
              <hr
                style={{
                  border: "0.1px solid rgba(0, 0, 0, 0.3)",
                  width: "60%",
                  margin: "10px auto",
                }}
              />
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Button
                    type="link"
                    onClick={() => handleClick("profile")}
                    style={{
                      color: activeButton === "profile" ? "orange" : "black",
                      marginTop: "15px",
                    }}
                  >
                    <UserOutlined style={{ marginRight: "5px" }} />
                    Hồ sơ
                  </Button>
                </li>
                <li>
                  <Button
                    type="link"
                    onClick={() => handleClick("changepassword")}
                    style={{
                      color:
                        activeButton === "changepassword" ? "orange" : "black",
                      marginTop: "15px",
                    }}
                  >
                    <LockOutlined style={{ marginRight: "5px" }} />{" "}
                    {/* Change to LockOutlined icon */}
                    Đổi mật khẩu
                  </Button>
                </li>
                <li>
                  <Button
                    type="link"
                    onClick={() => handleClick("trackingorder")}
                    style={{
                      color:
                        activeButton === "trackingorder" ? "orange" : "black",
                      marginTop: "15px",
                    }}
                  >
                    <ShoppingCartOutlined style={{ marginRight: "5px" }} />
                    Đơn mua
                  </Button>
                </li>
                <li>
                  <Button
                    type="link"
                    onClick={() => handleClick("kygui")}
                    style={{
                      color: activeButton === "kygui" ? "orange" : "black",
                      marginTop: "15px",
                    }}
                  >
                    <ShopOutlined style={{ marginRight: "5px" }} />
                    Đơn ký gửi
                  </Button>
                </li>
                <li>
                  <Button
                    type="link"
                    onClick={() => handleClick("loyaltycard")}
                    style={{
                      color:
                        activeButton === "loyaltycard" ? "orange" : "black",
                      marginTop: "15px",
                    }}
                  >
                    <ShopOutlined style={{ marginRight: "5px" }} />
                    Thẻ tích điểm
                  </Button>
                </li>
                {/* Bạn có thể thêm các liên kết khác ở đây */}
              </ul>
            </div>
          </Col>
          {currentComponent === "profile" && (
            <Col span={16}>
              <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                <UpdateProfile />
              </div>
            </Col>
          )}
          {currentComponent === "kygui" && (
            <Col span={16}>
              <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                <DonKyGuiPage />
              </div>
            </Col>
          )}
          {currentComponent === "changepassword" && (
            <Col span={16}>
              <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                <ChangePassword />
              </div>
            </Col>
          )}
          {currentComponent === "trackingorder" && (
            <Col span={16}>
              <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                <TrackingOrderPage />
              </div>
            </Col>
          )}
          {currentComponent === "loyaltycard" && (
            <Col span={16}>
              <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                <LoyaltyCardInfo />
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}
