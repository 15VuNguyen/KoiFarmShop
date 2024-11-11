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
const isValidPhoneNumber = (phone) => /^\d{10,20}$/.test(phone);
const isValidURL = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
};

export default function UpdateProfile() {
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
        `/users/me`,
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
    if (selectedFile) {
      const imageUrl = await handleUploadImage(selectedFile);
      setUserData({ ...userData, avatar: imageUrl });
      await updateUser("picture", imageUrl); // Cập nhật URL hình ảnh lên server
      setTimeout(
        () => toast.success("Cập nhật ảnh đại diện thành công!"),
        5000
      ); // Tải lại trang sau 1 giây
      window.location.reload();
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

    const updatePromises = fieldsToUpdate.map((field) =>
      updateUser(field, userData[field])
    );
    await Promise.all(updatePromises);

    // Reload page after update
    window.location.reload();
  };
  const handleClick = (componentName) => {
    setCurrentComponent(componentName);
    setActiveButton(componentName);
  };
  return (
    <Col
      span={16}
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        paddingLeft: "5%",
      }}
    >
      <div>
        <h2
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: "30px",
          }}
        >
          Hồ Sơ Của Tôi
        </h2>
        <h4
          style={{
            fontWeight: "360",
            fontSize: "20px",
            marginBottom: "30px",
          }}
        >
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </h4>
        <hr
          style={{
            border: "0.1px solid rgba(0, 0, 0, 0.3)",
            marginBottom: "25px",
          }}
        />
        {userData ? (
          <Row gutter={16}>
            <Col span={12}>
              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input disabled value={maskedEmail} />
                </Form.Item>
                <Form.Item label="Tên đăng nhập">
                  <Input
                    value={userData.username}
                    onChange={(e) => {
                      const updatedUserData = {
                        ...userData,
                        username: e.target.value,
                      };
                      setUserData(updatedUserData);

                      // Kiểm tra ngay lập tức khi giá trị thay đổi
                      const errors = validateField("username");
                      setValidationErrors((prev) => ({
                        ...prev,
                        ...errors,
                      }));
                    }}
                  />
                  {validationErrors.username && (
                    <p style={{ color: "red" }}>{validationErrors.username}</p>
                  )}
                </Form.Item>

                <Form.Item label="Tên">
                  <Input
                    value={userData.name}
                    onChange={(e) => {
                      const updatedUserData = {
                        ...userData,
                        name: e.target.value,
                      };
                      setUserData(updatedUserData);

                      // Kiểm tra ngay lập tức khi giá trị thay đổi
                      const errors = validateField("name");
                      setValidationErrors((prev) => ({
                        ...prev,
                        ...errors,
                      }));
                    }}
                  />
                  {validationErrors.name && (
                    <p style={{ color: "red" }}>{validationErrors.name}</p>
                  )}
                </Form.Item>

                <Form.Item label="Address">
                  <Input
                    value={userData.address}
                    onChange={(e) => {
                      const updatedUserData = {
                        ...userData,
                        address: e.target.value,
                      };
                      setUserData(updatedUserData);

                      // Kiểm tra ngay lập tức khi giá trị thay đổi
                      const errors = validateField("address");
                      setValidationErrors((prev) => ({
                        ...prev,
                        ...errors,
                      }));
                    }}
                  />
                  {validationErrors.name && (
                    <p style={{ color: "red" }}>{validationErrors.name}</p>
                  )}
                </Form.Item>

                <Form.Item label="Số điện thoại">
                  <Input
                    value={userData.phone_number}
                    onChange={(e) => {
                      const updatedUserData = {
                        ...userData,
                        phone_number: e.target.value,
                      };
                      setUserData(updatedUserData);

                      // Kiểm tra ngay lập tức khi giá trị thay đổi
                      const errors = validateField("phone_number");
                      setValidationErrors((prev) => ({
                        ...prev,
                        ...errors,
                      }));
                    }}
                  />
                  {validationErrors.phone_number && (
                    <p style={{ color: "red" }}>
                      {validationErrors.phone_number}
                    </p>
                  )}
                </Form.Item>

                <Form.Item label="Website">
                  <Input
                    value={userData.website}
                    onChange={(e) => {
                      const updatedUserData = {
                        ...userData,
                        website: e.target.value,
                      };
                      setUserData(updatedUserData);

                      // Kiểm tra ngay lập tức khi giá trị thay đổi
                      const errors = validateField("website");
                      setValidationErrors((prev) => ({
                        ...prev,
                        ...errors,
                      }));
                    }}
                  />
                  {websiteError && (
                    <p style={{ color: "red" }}>{websiteError}</p>
                  )}
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={handleUpdateAll}>
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              span={12}
              className="d-flex justify-content-center align-items-center"
            >
              {userData.picture ? (
                <img
                  src={userData.picture}
                  alt="Profile"
                  onClick={() => setShowImageModal(true)}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "2px dashed #007bff", // Màu viền
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowImageModal(true)}
                >
                  <span>Chưa có ảnh</span>
                </div>
              )}
            </Col>
          </Row>
        ) : (
          <p>Không có thông tin người dùng.</p>
        )}
        {showImageModal && (
          <Modal
            title="Thay đổi ảnh đại diện"
            visible={showImageModal}
            onOk={handleImageChange}
            onCancel={() => setShowImageModal(false)}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Modal>
        )}
        {showVerificationModal && (
          <Modal
            title="Xác nhận"
            visible={showVerificationModal}
            onOk={handleResendVerification}
            onCancel={() => setShowVerificationModal(false)}
          >
            <p>
              Tài khoản của bạn chưa được xác minh. Bạn có muốn gửi lại email
              xác minh không?
            </p>
          </Modal>
        )}
      </div>
    </Col>
  );
}
