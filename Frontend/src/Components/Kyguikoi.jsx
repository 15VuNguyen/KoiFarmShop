import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../An/Utils/axiosJS";
import { Container } from "react-bootstrap";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Upload,
  Typography,
  Spin,
  Select,
  Button,
  Alert,
  AutoComplete,
} from "antd";
import useAddress from "../An/Ant Design/Components/useAddress";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
const { Title } = Typography;
const { Option } = Select;
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

export default function Kyguikoi() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedIn = !!accessToken; // Kiểm tra nếu có accessToken
    setIsLoggedIn(loggedIn);

    // Check localStorage for toast state
  }, [isLoggedIn]);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    phone_number: "",
    ShipAddress: "",
    PositionCare: "",
    Method: "",
    shippedDate: null,
    receiptDate: null,
    Description: "",
    Detail: "",
    CategoryID: "",
    KoiName: "",
    Age: 1,
    Origin: "",
    Gender: "",
    Size: 0,
    Breed: "",
    AddressConsignKoi: "",
    province: "",
    district: "",
    ward: "",
    PhoneNumberConsignKoi: "",
    DailyFoodAmount: 0,
    FilteringRatio: 0,
    CertificateID: "",
    Image: null,
    Video: null,
  });
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [error, setError] = useState(null);
  const { searchText, setSearchText, recommendations } = useAddress();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedIn = !!accessToken; // Kiểm tra nếu có accessToken
    setIsLoggedIn(loggedIn);

    // Điều hướng nếu người dùng đã đăng nhập
  }, [navigate]); // Chỉ phụ thuộc vào navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadChange = (type, fileList) => {
    setFormData((prevData) => ({ ...prevData, [type]: fileList }));
  };

  const handleDateChange = (key, date) => {
    // Kiểm tra nếu date không phải là null
    const formattedDate = date ? date.format("DD/MM/YYYY") : null;
    // In ra giá trị formattedDate để kiểm tra
    console.log(`${key} date:`, formattedDate);
    setFormData((prevData) => ({ ...prevData, [key]: formattedDate }));
  };

  const handleAddressChange = (value) => {
    setSearchText(value);
    setFormData((prevData) => ({
      ...prevData,
      AddressConsignKoi: value,
    }));
  };

  // Handle select suggestion
  const handleSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      AddressConsignKoi: value,
    }));
  };
  // Log formData whenever it changes
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formatDateToISO = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
      };

      const shippedDateObj = formData.shippedDate
        ? new Date(formatDateToISO(formData.shippedDate) + "T00:00:00Z")
        : null;

      const receiptDateObj = formData.receiptDate
        ? new Date(formatDateToISO(formData.receiptDate) + "T00:00:00Z")
        : null;

      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0); // Đặt currentDate về UTC 00:00:00

      // Kiểm tra ngày tháng trước khi gửi
      if (
        shippedDateObj &&
        (shippedDateObj < currentDate ||
          (receiptDateObj && shippedDateObj > receiptDateObj))
      ) {
        toast.error("Ngày gửi không được sau ngày nhận!");
        return; // Dừng lại nếu ngày không hợp lệ
      }
      if (
        shippedDateObj &&
        (shippedDateObj < currentDate ||
          (receiptDateObj &&
            (shippedDateObj > receiptDateObj ||
              receiptDateObj <
                new Date(shippedDateObj.getTime() + 30 * 24 * 60 * 60 * 1000)))) // Kiểm tra ngày nhận phải sau ngày gửi ít nhất 1 tháng
      ) {
        toast.error("Ngày nhận phải cách ngày gửi ít nhất 30 ngày!");
        return; // Dừng lại nếu ngày không hợp lệ
      }

      // Chuẩn bị dữ liệu để gửi
      const dataToSend = {
        ...values,
        PositionCare: formData.PositionCare.toString(),
        Method: formData.Method.toString(),
        CategoryID: formData.CategoryID.toString(),
        Gender: formData.Gender.toString(),
        Size: parseInt(formData.Size, 10),
        Breed: formData.Breed.toString(),
        Detail: formData.Detail.toString(),
        Description: formData.Description.toString(),
        DailyFoodAmount: parseFloat(formData.DailyFoodAmount),
        FilteringRatio: parseFloat(formData.FilteringRatio),
        Age: parseInt(formData.Age, 10),
        AddressConsignKoi: formData.AddressConsignKoi.toString() || "",
        PhoneNumberConsignKoi: formData.PhoneNumberConsignKoi || "",
        ShippedDate: shippedDateObj ? shippedDateObj.toISOString() : null,
        ReceiptDate: receiptDateObj ? receiptDateObj.toISOString() : null,
      };

      console.log("Data to send:", dataToSend); // In dữ liệu để kiểm tra

      // Tải lên hình ảnh và video
      const imageRef = ref(storage, `koiImages/${formData.Image[0].name}`);
      const videoRef = ref(storage, `koiVideos/${formData.Video[0].name}`);

      await uploadBytes(imageRef, formData.Image[0].originFileObj);
      const imageUrl = await getDownloadURL(imageRef);

      await uploadBytes(videoRef, formData.Video[0].originFileObj);
      const videoUrl = await getDownloadURL(videoRef);

      // Cập nhật dữ liệu với URL của hình ảnh và video
      dataToSend.Image = imageUrl;
      dataToSend.Video = videoUrl;
      // Gửi dữ liệu tới backend
      const response = await axiosInstance.post("/ki-gui", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setTimeout(() => {
          if (isLoggedIn) {
            navigate("/donkyguipage");
          }
        }, 3000);
        toast.success(response.data.message);
        setFormData({
          ...formData,
          Description: "",
          Detail: "",
          email: "",
          name: "",
          address: "",
          phone_number: "",
          ShipAddress: "",
          PositionCare: "",
          Method: "",
          shippedDate: null,
          receiptDate: null,
          AddressConsignKoi: "",
          PhoneNumberConsignKoi: "",
          CategoryID: "",
          KoiName: "",
          Age: 1,
          Origin: "",
          Gender: "",
          Size: 0,
          Breed: "",
          DailyFoodAmount: 0,
          FilteringRatio: 0,
          CertificateID: "",
          Image: null,
          Video: null,
        });
        form.resetFields();
        fetchUserData();
      } else {
        toast.error(`Có lỗi xảy ra: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("users/me");
      if (response.data) {
        setUserData(response.data.result);
        console.log("Fetched user data:", response.data.result); // Debug log
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        email: userData.email || "",
        name: userData.name || "",
        address: userData.address || "",
        phone_number: userData.phone_number || "",
        ShipAddress: userData.address || "",
        AddressConsignKoi: userData.address || "",
        PhoneNumberConsignKoi: userData.phone_number || "",
      });
      setFormData({
        ...formData,
        email: userData.email || "",
        name: userData.name || "",
        address: userData.address || "",
        phone_number: userData.phone_number || "",
        ShipAddress: userData.address || "",
        AddressConsignKoi: userData.address || "",
        PhoneNumberConsignKoi: userData.phone_number || "",
      });
    }
  }, [userData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getAllKoi");
        if (Array.isArray(response.data.result)) {
          setCategoryData(response.data.categoryList);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      />
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }
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
  return (
    <Container>
      <div>
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "auto", paddingBottom: "100px" }}
          />
        ) : (
          <Form
            style={{ maxWidth: "800px", margin: "auto" }}
            onFinish={handleSubmit}
            form={form}
            onFinishFailed={handleFinishFailed}
          >
            <div style={{ color: "black" }}>
              <Title level={3} style={{ color: "red" }}>
                Thông tin khách hàng
              </Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <div>
                    <label
                      htmlFor="email"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Email
                    </label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Vui lòng nhập email hợp lệ.",
                        },
                      ]}
                    >
                      <Input
                        id="email"
                        placeholder="Nhập địa chỉ email (name@example.com)"
                        disabled={userData?.email}
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
                        {
                          required: true,
                          type: "string",
                          message: "Vui lòng nhập địa chỉ",
                        },
                      ]}
                    >
                      <AutoComplete
                        name="address"
                        onSearch={handleAddressChange}
                        onSelect={handleSelect}
                        disabled={userData?.address}
                        value={formData.address}
                        placeholder="Nhập địa chỉ để IKoi đến lấy koi"
                        options={recommendations.map((address) => ({
                          value: address,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: "48%" }}>
                  <div>
                    <label
                      htmlFor="phone_number"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Số điện thoại
                    </label>
                    <Form.Item
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập số điện thoại"
                        disabled={userData?.phone_number}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Tên người ký gửi
                    </label>
                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên." },
                      ]}
                    >
                      <Input
                        placeholder="Nhập họ và tên"
                        disabled={userData?.name}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <hr />
              <Title level={3} style={{ color: "red" }}>
                Thông Tin Ký Gửi
              </Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                  <div>
                    <label
                      htmlFor="PositionCareHome"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Nơi chăm sóc cá koi
                    </label>
                    <Form.Item
                      name="PositionCare"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng Nơi chăm sóc koi.",
                        },
                      ]}
                    >
                      <Radio.Group
                        name="PositionCare"
                        value={formData.PositionCare}
                        onChange={handleChange}
                      >
                        <Radio
                          id="PositionCareHome"
                          value="Home"
                          style={{ width: "100px" }}
                        >
                          Home
                        </Radio>
                        <Radio
                          id="PositionCareIKoiFarm"
                          value="IKoiFarm"
                          style={{ width: "100px" }}
                        >
                          IKoiFarm
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <label
                      htmlFor="MethodOnline"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Phương thức nhận koi
                    </label>
                    <Form.Item
                      name="Method"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn phương thức nhận koi.",
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={handleChange}
                        name="Method"
                        value={formData.Method}
                      >
                        <Radio
                          id="MethodOnline"
                          value="Online"
                          style={{ width: "100px" }}
                        >
                          Online
                        </Radio>
                        <Radio
                          id="MethodOffline"
                          value="Offline"
                          style={{ width: "100px" }}
                        >
                          Offline
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div>
                    <label
                      htmlFor="shippedDate"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Ngày gửi
                    </label>
                    <Form.Item name="shippedDate">
                      <DatePicker
                        style={{ width: "100%", height: "35px" }}
                        onChange={(date) =>
                          handleDateChange("shippedDate", date)
                        }
                        disabledDate={(current) =>
                          current && current < moment().startOf("day")
                        }
                        format="DD/MM/YYYY"
                        inputReadOnly
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <label
                      htmlFor="receiptDate"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Ngày nhận
                    </label>
                    <Form.Item name="receiptDate">
                      <DatePicker
                        style={{ width: "100%", height: "35px" }}
                        onChange={(date) =>
                          handleDateChange("receiptDate", date)
                        }
                        disabledDate={(current) =>
                          current && current < moment().startOf("day")
                        }
                        format="DD/MM/YYYY"
                        inputReadOnly
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", paddingRight: "25px" }}>
                  <label
                    htmlFor="AddressConsignKoi"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Địa chỉ nhận koi
                  </label>
                  <Form.Item
                    name="AddressConsignKoi"
                    rules={[
                      {
                        required: true,
                        type: "string",
                        message: "Vui lòng nhập địa chỉ",
                      },
                    ]}
                  >
                    <AutoComplete
                      name="AddressConsignKoi"
                      onSearch={handleAddressChange}
                      onSelect={handleSelect}
                      value={formData.AddressConsignKoi}
                      placeholder="Nhập địa chỉ để IKoi đến lấy koi"
                      options={recommendations.map((address) => ({
                        value: address,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="PhoneNumberConsignKoi"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Số điện thoại người ký gửi
                  </label>
                  <Form.Item
                    name="PhoneNumberConsignKoi"
                    rules={[
                      {
                        required: true,
                        type: "string",
                        message: "Vui lòng nhập SĐT",
                      },
                    ]}
                  >
                    <Input
                      name="PhoneNumberConsignKoi"
                      type="text"
                      value={formData.PhoneNumberConsignKoi}
                      onChange={handleChange}
                      placeholder="Nhập số điên thoại"
                    />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label
                  htmlFor="Detail"
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Chi tiết về đơn ký gửi
                </label>
                <Form.Item name="Detail">
                  <Input.TextArea
                    name="Detail"
                    type="text"
                    value={formData.Detail}
                    onChange={handleChange}
                    placeholder="Nhập chi tiết về cá koi của bạn"
                    style={{ height: "150px", resize: "none" }}
                  />
                </Form.Item>
              </div>
              <hr />
              <Title level={3} style={{ color: "red" }}>
                Thông Tin Koi Muốn Ký Gửi
              </Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: "50%",
                    paddingRight: "10px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="CategoryID"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Các loại cá
                    </label>
                    <Form.Item
                      name="CategoryID"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại cá của bạn.",
                        },
                      ]}
                    >
                      <Select
                        value={formData.CategoryID}
                        onChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            CategoryID: value,
                          }))
                        }
                        placeholder="Chọn loại cá"
                      >
                        {categoryData.map((category) => (
                          <Select.Option
                            key={category._id}
                            value={category._id}
                          >
                            {category.CategoryName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div>
                    <label
                      htmlFor="KoiName"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <span style={{ color: "red" }}>* </span>
                      Tên Koi của bạn
                    </label>
                    <Form.Item
                      name="KoiName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên loại cá koi.",
                        },
                      ]}
                    >
                      <Input
                        name="KoiName"
                        value={formData.KoiName}
                        onChange={handleChange}
                        placeholder="Nhập KoiName (Category + Origin)"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%", paddingRight: "10px" }}>
                  <label
                    htmlFor="Age"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Năm sinh koi của bạn
                  </label>
                  <Form.Item
                    name="Age"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập năm sinh koi của bạn.",
                      },
                      {
                        validator: (_, value) => {
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 1900) {
                            return Promise.reject(
                              new Error("Năm sinh phải lớn hơn 1900.")
                            );
                          }
                          if (numericValue > 2024) {
                            return Promise.reject(
                              new Error("Năm sinh phải nhỏ hơn 2024")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      type="number"
                      placeholder="Nhập tuổi"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="Origin"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Nguồn gốc Koi của bạn
                  </label>
                  <Form.Item
                    name="Origin"
                    rules={[
                      { required: true, message: "Vui lòng nhập nguồn gốc." },
                    ]}
                  >
                    <Input
                      name="Origin"
                      value={formData.Origin}
                      onChange={handleChange}
                      placeholder="Nhập nguồn gốc"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="GenderMale"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Giới Tính
                  </label>
                  <Form.Item
                    name="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn giới tính.",
                      },
                    ]}
                  >
                    <Radio.Group
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                    >
                      <Radio
                        id="GenderMale"
                        value="Male"
                        style={{ width: "100px" }}
                      >
                        Đực
                      </Radio>
                      <Radio
                        id="GenderFemale"
                        value="Female"
                        style={{ width: "100px" }}
                      >
                        Cái
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="Size"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Kích Thước(cm)
                  </label>
                  <Form.Item
                    name="Size"
                    rules={[
                      { required: true, message: "Vui lòng nhập kích thước." },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve(); // If the value is empty, resolve the promise
                          }
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 5) {
                            return Promise.reject(
                              new Error("Kích Thước phải lớn hơn hoặc bằng 5.")
                            );
                          }
                          if (numericValue > 200) {
                            return Promise.reject(
                              new Error("Kích Thước phải nhỏ hơn bằng 200")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="Size"
                      value={formData.Size}
                      onChange={handleChange}
                      type="number"
                      placeholder="Nhập kích thước(cm)"
                      style={{ paddingRight: "40px" }} // Adjust padding to make space for the unit
                      addonAfter="cm"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="BreedNhat"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Giống loài
                  </label>
                  <Form.Item
                    name="Breed"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn trạng thái.",
                      },
                    ]}
                  >
                    <Radio.Group
                      name="Breed"
                      value={formData.Breed}
                      onChange={handleChange}
                    >
                      <Radio
                        id="BreedNhat"
                        value="Nhat"
                        style={{ width: "100px" }}
                      >
                        Nhật
                      </Radio>
                      <Radio
                        id="BreedViet"
                        value="Viet"
                        style={{ width: "100px" }}
                      >
                        Việt
                      </Radio>
                      <Radio id="BreedF1" value="F1" style={{ width: "100px" }}>
                        F1
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="DailyFoodAmount"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Nhập lượng thức ăn/ngày (đơn vị g/ngày)
                  </label>
                  <Form.Item
                    name="DailyFoodAmount"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lượng thức ăn.",
                      },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve(); // If the value is empty, resolve the promise
                          }
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 1) {
                            return Promise.reject(
                              new Error("Lượng thức ăn phải lớn hơn bằng 0")
                            );
                          }
                          if (numericValue > 100) {
                            return Promise.reject(
                              new Error("Lượng thức ăn phải nhỏ hơn bằng 100")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="DailyFoodAmount"
                      value={formData.DailyFoodAmount}
                      onChange={handleChange}
                      type="number"
                      placeholder="Nhập lượng thức ăn/ngày"
                      min={1}
                      step={1}
                      max={100}
                      addonAfter="g/ngày"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", paddingRight: "15px" }}>
                  <label
                    htmlFor="FilteringRatio"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Nhập tỷ lệ lọc(%)
                  </label>

                  <Form.Item
                    name="FilteringRatio"
                    rules={[
                      { required: true, message: "Vui lòng nhập tỷ lệ lọc." },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve(); // If the value is empty, resolve the promise
                          }
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 1) {
                            return Promise.reject(
                              new Error("Tỷ lệ lọc phải lớn hơn 0")
                            );
                          }
                          if (numericValue > 100) {
                            return Promise.reject(
                              new Error("Tỷ lệ lọc phải nhỏ hơn bằng 100")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="FilteringRatio"
                      value={formData.FilteringRatio}
                      onChange={handleChange}
                      type="number"
                      placeholder="Nhập tỷ lệ lọc"
                      max={100}
                      step={1}
                      min={1}
                      addonAfter="%"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="CertificateID"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    CertificateID
                  </label>
                  <Form.Item
                    name="CertificateID"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập CertificateID.",
                      },
                    ]}
                  >
                    <Input
                      name="CertificateID"
                      value={formData.CertificateID}
                      onChange={handleChange}
                      placeholder="Nhập CertificateID"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="Image"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Nộp ảnh
                  </label>
                  <Form.Item
                    name="Image"
                    rules={[{ required: true, message: "Vui lòng nộp ảnh." }]}
                    style={{ paddingRight: "15px", width: "80%" }}
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ fileList }) =>
                        handleUploadChange("Image", fileList)
                      }
                      listType="picture"
                      accept="image/*"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="Video"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <span style={{ color: "red" }}>* </span>
                    Nộp video
                  </label>

                  <Form.Item
                    name="Video"
                    rules={[{ required: true, message: "Vui lòng nộp video." }]}
                    style={{ paddingRight: "15px", width: "80%" }}
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ fileList }) =>
                        handleUploadChange("Video", fileList)
                      }
                      listType="picture"
                      accept="video/*"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="Description"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                Chi tiết về cá koi
              </label>
              <Form.Item name="Description">
                <Input.TextArea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Nhập chi tiết về cá koi của bạn"
                  style={{ height: "150px", resize: "none" }}
                />
              </Form.Item>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                style={{ marginBottom: "50px" }}
              >
                Ký Gửi
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
}
