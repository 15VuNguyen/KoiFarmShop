import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../An/Utils/axiosJS";
import Container from "react-bootstrap/Container";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Upload,
  Typography,
  Spin,
  Select,
  AutoComplete,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Footer from "../../Footer";
import Navbar from "../../Navbar/Navbar";
import dayjs from "dayjs";
import moment from "moment";
import useAddress from "../../../An/Ant Design/Components/useAddress";
const { Title } = Typography;
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

export default function Chitietconsignpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { consign } = location.state || {}; // Access the passed state
  const { setSearchText, recommendations } = useAddress();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedIn = !!accessToken; // Kiểm tra nếu có accessToken
    setIsLoggedIn(loggedIn);
    // Check localStorage for toast state
  }, [isLoggedIn]);
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
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    phone_number: "",
    ShipAddress: "",
    PositionCare: "",
    Method: "",
    ShippedDate: null,
    ReceiptDate: null,
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
    PhoneNumberConsignKoi: "",
    DailyFoodAmount: 0,
    FilteringRatio: 0,
    CertificateID: "",
    Image: null,
    Video: null,
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [consignData, setConsignData] = useState([]);
  const [koiData, setKoiData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const navigate = useNavigate();
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

  const imageFileList1 = koiData?.Image
    ? [
        {
          uid: "-1", // Unique ID, can be any unique value
          name: "image.png", // You can set a default name or extract from the URL
          status: "done", // Set the status to 'done' to indicate the file is uploaded
          url: koiData.Image, // URL from Firebase
        },
      ]
    : [];

  const videoFileList1 = koiData?.Video
    ? [
        {
          uid: "-2", // Unique ID for video
          name: "video.mp4", // Default name for the video
          status: "done",
          url: koiData.Video, // URL from Firebase
        },
      ]
    : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userResponse = await axiosInstance.get("users/me");
        if (userResponse.data) {
          setUserData(userResponse.data.result);
          console.log("Fetched user data:", userResponse.data.result); // Debug log
        }

        // Fetch consign data
        const consignResponse = await axiosInstance.get(
          `/users/tat-ca-don-ki-gui/${consign._id}`
        );
        if (consignResponse.status === 200) {
          const { koi, consign } = consignResponse.data.result; // Extract koi and consign data
          setConsignData(consign);
          setKoiData(koi);
          console.log("Fetched consign data:", consign); // Debug log
          console.log("Fetched koi data:", koi); // Debug log
        }
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateTrigger]); // Add updateTrigger to the dependency array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:4000/getAllKoi"
        );
        if (Array.isArray(response.data.result)) {
          setCategoryData(response.data.categoryList);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("Consign Data:", consignData);
  }, [consignData]);
  useEffect(() => {
    console.log("Koi Data:", koiData);
  }, [koiData]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formatDateToISO = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
      };

      const shippedDateObj = formData.ShippedDate
        ? new Date(formatDateToISO(formData.ShippedDate) + "T00:00:00Z")
        : consignData?.ShippedDate
        ? new Date(consignData.ShippedDate)
        : null;
      const receiptDateObj = formData.ReceiptDate
        ? new Date(formatDateToISO(formData.ReceiptDate) + "T00:00:00Z")
        : consignData?.ReceiptDate
        ? new Date(consignData.ReceiptDate)
        : null;
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0); // Đặt currentDate về UTC 00:00:00
      // Log the dates for debugging
      console.log("Shipped Date:", shippedDateObj);
      console.log("Receipt Date:", receiptDateObj);
      console.log("Current Date:", currentDate);
      // Kiểm tra ngày tháng trước khi gửi
      if (shippedDateObj && receiptDateObj && shippedDateObj > receiptDateObj) {
        toast.error("Ngày gửi không được sau ngày nhận!");
        setLoading(false);
        return; // Dừng lại nếu ngày không hợp lệ
      }
      if (
        shippedDateObj &&
        receiptDateObj &&
        receiptDateObj <
          new Date(shippedDateObj.getTime() + 30 * 24 * 60 * 60 * 1000) // Kiểm tra ngày nhận phải sau ngày gửi ít nhất 1 tháng
      ) {
        toast.error("Ngày nhận phải cách ngày gửi ít nhất 30 ngày!");
        setLoading(false);
        return; // Dừng lại nếu ngày không hợp lệ
      }

      // Kiểm tra và lấy tệp hình ảnh
      let imageFile =
        formData.Image && formData.Image.length > 0 ? formData.Image[0] : null;

      if (!imageFile) {
        console.warn("No new image file selected. Using original.");
        imageFile = koiData.Image; // Khôi phục giá trị ban đầu
      }

      if (!imageFile) {
        console.error("Image file is still undefined.");
        toast.error("Vui lòng chọn một hình ảnh.");
        setLoading(false);
        return; // Dừng lại nếu không có tệp hình ảnh
      }

      // Kiểm tra và lấy tệp video
      let videoFile =
        formData.Video && formData.Video.length > 0 ? formData.Video[0] : null;

      if (!videoFile) {
        console.warn("No new video file selected. Using original.");
        videoFile = koiData.Video; // Khôi phục giá trị ban đầu
      }

      if (!videoFile) {
        console.error("Video file is still undefined.");
        toast.error("Vui lòng chọn một video.");
        setLoading(false);
        return; // Dừng lại nếu không có tệp video
      }

      // Tạo tham chiếu đến vị trí lưu trữ
      const imageRef = ref(storage, `koiImages/${imageFile.name}`);
      const videoRef = ref(storage, `koiVideos/${videoFile.name}`);

      let imageUrl = koiData.Image ? koiData.Image.url : null; // Giữ URL cũ nếu không có tệp mới
      let videoUrl = koiData.Video ? koiData.Video.url : null; // Giữ URL cũ nếu không có tệp mới

      // Tải lên ảnh nếu có tệp mới
      if (formData.Image && formData.Image.length > 0) {
        await uploadBytes(imageRef, imageFile.originFileObj);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Tải lên video nếu có tệp mới
      if (formData.Video && formData.Video.length > 0) {
        await uploadBytes(videoRef, videoFile.originFileObj);
        videoUrl = await getDownloadURL(videoRef);
      }

      // Chuẩn bị dữ liệu để gửi
      const dataToSend = {
        ...values,
        ShippedDate: shippedDateObj ? shippedDateObj.toISOString() : null,
        ReceiptDate: receiptDateObj ? receiptDateObj.toISOString() : null,
        Image: imageUrl,
        Video: videoUrl,
      };
      console.log("Data to send:", dataToSend);
      // Gọi API để cập nhật dữ liệu
      const response = await axiosInstance.patch(
        `/users/tat-ca-don-ki-gui/${consign._id}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        setUpdateTrigger(!updateTrigger); // Trigger the useEffect to re-fetch data
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Error updating consign:", error);
      toast.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const initialKoiData = koiData || {}; // Ensure koiData is an object
  //lấy data khi người dùng đã điền đưa vào Form của ant design ( phải có loading để tránh tình trạng api chưa kịp load đã render hết)
  const initialValues = {
    email: userData?.email || "",
    name: userData?.name || "",
    address: userData?.address || "",
    phone_number: userData?.phone_number || "",
    PositionCare: consignData?.PositionCare || "",
    Method: consignData?.Method || "",
    ShippedDate: consignData?.ShippedDate
      ? dayjs(consignData.ShippedDate)
      : null,
    ReceiptDate: consignData?.ReceiptDate
      ? dayjs(consignData.ReceiptDate)
      : null,
    AddressConsignKoi: consignData?.AddressConsignKoi || "",
    PhoneNumberConsignKoi: consignData?.PhoneNumberConsignKoi || "",
    Detail: consignData?.Detail || "",
    CategoryID: koiData?.CategoryID || "",
    KoiName: koiData?.KoiName || "",
    Age: initialKoiData.Age ? initialKoiData.Age.toString() : "", // Use a safer check
    Origin: koiData?.Origin || "",
    Gender: koiData?.Gender || "",
    Size: initialKoiData.Size ? initialKoiData.Size.toString() : "",
    Breed: koiData?.Breed || "",
    DailyFoodAmount: initialKoiData.DailyFoodAmount
      ? initialKoiData.DailyFoodAmount.toString()
      : "",
    FilteringRatio: initialKoiData.FilteringRatio
      ? initialKoiData.FilteringRatio.toString()
      : "",
    CertificateID: koiData?.CertificateID || "",
    Image: koiData?.Image || "",
    Video: koiData?.Video || "",
    Description: koiData?.Description || "",
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
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <Container>
          <div>
            {loading ? (
              <Spin
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              />
            ) : consignData ? (
              <Form
                style={{ maxWidth: "800px", margin: "auto" }}
                onFinish={handleSubmit}
                initialValues={initialValues}
                onFinishFailed={handleFinishFailed}
              >
                <div style={{ color: "black" }}>
                  <Title level={3}>Thông tin khách hàng</Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "48%" }}>
                      <div>
                        <label
                          htmlFor="email"
                          style={{ fontWeight: "bold", fontSize: "15px" }}
                        >
                          <span style={{ color: "red" }}>* </span>
                          Địa chỉ email
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
                            value={initialValues?.email}
                            placeholder="Nhập địa chỉ email (name@example.com)"
                            disabled={initialValues?.email}
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
                              message: "Vui lòng nhập địa chỉ.",
                            },
                          ]}
                        >
                          <Input
                            value={initialValues?.address}
                            placeholder="Nhập địa chỉ"
                            disabled={initialValues?.address}
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
                            value={initialValues?.phone_number}
                            placeholder="Nhập số điện thoại"
                            disabled={initialValues?.phone_number}
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
                            {
                              required: true,
                              message: "Vui lòng nhập họ và tên.",
                            },
                          ]}
                        >
                          <Input
                            value={initialValues?.name}
                            placeholder="Nhập họ và tên"
                            disabled={initialValues?.name}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Title level={3}>Thông Tin Ký Gửi</Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "48%" }}>
                      <div>
                        <label
                          htmlFor="PositionCareHome"
                          style={{ fontWeight: "bold", fontSize: "15px" }}
                        >
                          <span style={{ color: "red" }}>* </span>
                          Nơi chăm sóc koi
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
                            value={initialValues.PositionCare}
                            onChange={handleChange}
                          >
                            <Radio id="PositionCareHome" value="Home">
                              Home
                            </Radio>
                            <Radio id="PositionCareIKoiFarm" value="IKoiFarm">
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
                            value={formData.Method}
                          >
                            <Radio id="MethodOnline" value="Online">
                              Online
                            </Radio>
                            <Radio id="MethodOffline" value="Offline">
                              Offline
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </div>
                    <div style={{ width: "48%" }}>
                      <div>
                        <label
                          htmlFor="ShippedDate"
                          style={{ fontWeight: "bold", fontSize: "15px" }}
                        >
                          Ngày Gửi
                        </label>
                        <Form.Item name="ShippedDate">
                          <DatePicker
                            style={{ width: "100%", height: "35px" }}
                            value={initialValues.ShippedDate}
                            onChange={(date) =>
                              handleDateChange("ShippedDate", date)
                            }
                            disabledDate={(current) =>
                              current && current < moment().startOf("day")
                            }
                            format="DD/MM/YYYY" // Thay đổi format ở đây
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <label
                          htmlFor="ReceiptDate"
                          style={{ fontWeight: "bold", fontSize: "15px" }}
                        >
                          Ngày Nhận
                        </label>
                        <Form.Item name="ReceiptDate">
                          <DatePicker
                            style={{ width: "100%", height: "35px" }}
                            value={initialValues.ReceiptDate}
                            onChange={(date) =>
                              handleDateChange("ReceiptDate", date)
                            }
                            disabledDate={(current) =>
                              current && current < moment().startOf("day")
                            }
                            format="DD/MM/YYYY" // Thay đổi format ở đây
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
                            message: "Vui lòng nhập SĐT người ký gửi",
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
                        value={formData.Detail}
                        onChange={handleChange}
                        placeholder="Nhập chi tiết về đơn ký gửi"
                        style={{ height: "150px", resize: "none" }}
                      />
                    </Form.Item>
                  </div>
                  <hr />
                  <Title level={3}>Thông Tin Koi Muốn Ký Gửi</Title>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%", paddingRight: "15px" }}>
                      <label
                        htmlFor="CategoryID"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Loại Cá
                      </label>
                      <Form.Item
                        name="CategoryID"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn danh mục.",
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
                          placeholder="Chọn danh mục..."
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
                    <div style={{ width: "50%" }}>
                      <label
                        htmlFor="KoiName"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Tên cá của bạn
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
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%", paddingRight: "15px" }}>
                      <label
                        htmlFor="Age"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Tuổi cá của bạn
                      </label>
                      <Form.Item
                        name="Age"
                        rules={[
                          { required: true, message: "Vui lòng nhập tuổi." },
                          {
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.resolve();
                              }
                              const numericValue = Number(value); // Convert to a number
                              if (isNaN(numericValue)) {
                                return Promise.reject(
                                  new Error("Tuổi phải là một số.")
                                );
                              }
                              if (numericValue < 1) {
                                return Promise.reject(
                                  new Error("Tuổi phải lớn hơn hoặc bằng 1.")
                                );
                              }
                              if (numericValue > 50) {
                                return Promise.reject(
                                  new Error("Tuổi phải nhỏ hơn hoặc bằng 50.")
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
                        Nguồn Gốc
                      </label>
                      <Form.Item
                        name="Origin"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập nguồn gốc.",
                          },
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
                          <Radio id="GenderMale" value="Male">
                            Male
                          </Radio>
                          <Radio id="GenderFemale" value="Female">
                            Female
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
                          {
                            required: true,
                            message: "Vui lòng nhập kích thước.",
                          },
                          {
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.resolve(); // If the value is empty, resolve the promise
                              }
                              const numericValue = Number(value); // Convert to a number
                              if (numericValue < 5) {
                                return Promise.reject(
                                  new Error(
                                    "Kích Thước phải lớn hơn hoặc bằng 1."
                                  )
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
                          addonAfter="cm"
                          placeholder="Nhập kích thước(cm)"
                          min={5}
                          max={150}
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
                            message: "Vui lòng chọn giống loài koi của bạn.",
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
                          <Radio
                            id="BreedF1"
                            value="F1"
                            style={{ width: "100px" }}
                          >
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
                        Nhập lượng thức ăn/ngày(đơn vị kg/ngày)
                      </label>
                      <Form.Item
                        name="DailyFoodAmount"
                        rules={[
                          {
                            required: true,
                            message:
                              "Vui lòng nhập lượng thức ăn/ngày koi của bạn.",
                          },
                          {
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.resolve(); // If the value is empty, resolve the promise
                              }
                              const numericValue = Number(value); // Convert to a number
                              if (numericValue < 1) {
                                return Promise.reject(
                                  new Error(
                                    "Lượng thức ăn phải lớn hơn hoặc bằng 1."
                                  )
                                );
                              }
                              if (numericValue > 100) {
                                return Promise.reject(
                                  new Error(
                                    "Lượng thức ăn phải nhỏ hơn bằng 200"
                                  )
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
                          addonAfter="kg/ngày"
                          placeholder="Nhập lượng thức ăn/ngày"
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
                        Nhập tỷ lệ lọc (%)
                      </label>
                      <Form.Item
                        name="FilteringRatio"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tỷ lệ lọc koi của bạn.",
                          },
                          {
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.resolve(); // If the value is empty, resolve the promise
                              }
                              const numericValue = Number(value); // Convert to a number
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
                          min={0.1} // Update min to 0.1
                          max={100}
                          addonAfter="%"
                          step={0.1}
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
                            message: "Vui lòng nhập CertificateID koi của bạn.",
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
                        rules={[
                          { required: true, message: "Vui lòng nộp ảnh." },
                        ]}
                        style={{ paddingRight: "15px", width: "80%" }}
                      >
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          onChange={({ fileList }) =>
                            handleUploadChange("Image", fileList)
                          }
                          // Add this line to bind the value to the Upload component
                          listType="picture"
                          fileList={imageFileList1}
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </div>
                    <div>
                      <label
                        htmlFor="Video"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        <span style={{ color: "red" }}>* </span>
                        Nộp video
                      </label>
                      <Form.Item
                        name="Video"
                        rules={[
                          { required: true, message: "Vui lòng nộp video." },
                        ]}
                        style={{ paddingRight: "15px", width: "80%" }}
                      >
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          onChange={({ fileList }) =>
                            handleUploadChange("Video", fileList)
                          }
                          listType="video"
                          fileList={videoFileList1} // Add this line to bind the value to the Upload component
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
                    Chi tiết về koi
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
                {consignData.State === 1 && (
                  <div>
                    {" "}
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                        style={{ marginBottom: "100px" }}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                )}
                {consignData.State === 2 ||
                  consignData.State === 3 ||
                  (consignData.State === 4 && (
                    <div>
                      <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          disabled={loading} // Keep this line to disable based on loading state
                          style={{ marginBottom: "100px" }}
                        >
                          Update
                        </Button>
                        <span>Đơn này không thể Update được</span>
                      </div>
                    </div>
                  ))}
              </Form>
            ) : (
              <div>
                <h2>Bạn chưa có đơn ký gửi nào</h2>
              </div>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
