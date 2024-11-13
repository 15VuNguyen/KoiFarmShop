import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Input, Button, Modal, Form, AutoComplete } from "antd";
import axiosInstance from "../An/Utils/axiosJS";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import useAddress from "../An/Ant Design/Components/useAddress";
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
  const [originalUserData, setOriginalUserData] = useState(null); // Lưu trữ dữ liệu gốc
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [websiteError, setWebsiteError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { searchText, setSearchText, recommendations } = useAddress();
  const [formData, setFormData] = useState(null);
  const handleAddressChange = (value) => {
    setSearchText(value);
    setUserData((prevData) => ({
      ...prevData,
      address: value,
    }));
  };
  const [form] = Form.useForm();
  // Handle select suggestion
  const handleSelect = (value) => {
    setUserData((prevData) => ({
      ...prevData,
      address: value,
    }));
  };
  const maskEmail = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex > 2) {
      const firstPart = email.slice(0, 2);
      const maskedPart = "*".repeat(atIndex - 2);
      return `${firstPart}${maskedPart}${email.slice(atIndex)}`;
    }
    return email;
  };
  const handleUpdateUser = async (values) => {
    setLoading(true);
    try {
      const dataToSend = {
        name: formData.name,
        address: formData.address,
        phone_number: formData.phone_number,
        ...(formData.website && { website: formData.website }), // Conditionally add website
      };
      if (formData.username !== originalUserData.username) {
        dataToSend.username = formData.username;
      }
      console.log("Data to send:", dataToSend); // In dữ liệu để kiểm tra
      const response = await axiosInstance.patch(
        `/users/me`,
        dataToSend, // Send dataToSend directly
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
    } finally {
      setLoading(false);
    }
  };
  //Lay UserData từ api
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("users/me");
        if (response.data) {
          setUserData(response.data.result);
          console.log(userData);
          setOriginalUserData(response.data.result);
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
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const maskedEmail =
    userData && userData.email ? maskEmail(userData.email) : "";

  //Update anh profile
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
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFinishFailed = ({ errorFields }) => {
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0].name[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  };
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        email: userData.email || "",
        username: userData.username || "",
        name: userData.name || "",
        address: userData.address || "",
        phone_number: userData.phone_number || "",
        website: userData.website || "",
      });
      setFormData({
        ...formData,
        email: userData.email || "",
        username: userData.username || "",
        name: userData.name || "",
        address: userData.address || "",
        phone_number: userData.phone_number || "",
        website: userData.website || "",
      });
    }
  }, [userData]);
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
              <Form
                layout="vertical"
                onFinish={handleUpdateUser}
                form={form}
                initialValues={userData} // Set initial values here
                onFinishFailed={handleFinishFailed}
              >
                <Form.Item label="Email">
                  <Input disabled value={maskedEmail} />
                </Form.Item>
                <div>
                  <label
                    htmlFor="username"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Tên đăng nhập
                  </label>
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên." },
                    ]}
                  >
                    <Input
                      name="username"
                      placeholder="Nhập họ và tên"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Tên
                  </label>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên." },
                      {
                        pattern: /^[a-zA-Z\s]+$/,
                        message: "Tên không được chứa ký tự đặc biệt.",
                      },
                    ]}
                  >
                    <Input
                      name="name"
                      placeholder="Nhập họ và tên"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Địa chỉ
                  </label>
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                      { max: 200, message: "Địa chỉ phải dưới 200 chữ cái." },
                    ]}
                  >
                    <AutoComplete
                      name="address"
                      onSearch={handleAddressChange}
                      onSelect={handleSelect}
                      placeholder="Nhập địa chỉ để IKoi đến lấy koi"
                      options={recommendations.map((address) => ({
                        value: address,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    SĐT
                  </label>
                  <Form.Item
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại.",
                      },
                      {
                        pattern: /^[0-9]{5,20}$/,
                        message: "Số điện thoại phải là chữ số có từ 5-20 số.",
                      },
                    ]}
                  >
                    <Input
                      name="phone_number"
                      placeholder="Nhập SĐT"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    Website
                  </label>
                  <Form.Item
                    name="website"
                    rules={[
                      {
                        type: "url",
                        message: "Website phải là link URL hợp lệ.",
                      },
                    ]}
                  >
                    <Input
                      name="website"
                      placeholder="Nhập website"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginBottom: "50px" }}
                >
                  Cập nhật
                </Button>
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
