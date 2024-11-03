import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../An/Utils/axiosJS";
import { Container } from "react-bootstrap";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Footer from "../../Footer";
import Navbar from "../../Navbar/Navbar";
import dayjs from "dayjs";
import moment from "moment";

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
  console.log(consign);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedIn = !!accessToken; // Kiểm tra nếu có accessToken
    setIsLoggedIn(loggedIn);

    // Check localStorage for toast state
  }, [isLoggedIn]);
  const [initialFormData, setInitialFormData] = useState({
    Image: null, // Hoặc giá trị ban đầu nếu có
    Video: null, // Hoặc giá trị ban đầu nếu có
  });
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
  useEffect(() => {
    fetchData();
  }, []);

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
  const handleSubmit = async (values) => {
    console.log("Submitting form with values:", values); // Log the form values being submitted
    try {
      const formatDateToISO = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
      };

      const shippedDateObj = formData.ShippedDate
        ? new Date(formatDateToISO(formData.ShippedDate) + "T00:00:00Z")
        : null;

      const receiptDateObj = formData.ReceiptDate
        ? new Date(formatDateToISO(formData.ReceiptDate) + "T00:00:00Z")
        : null;

      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0); // Đặt currentDate về UTC 00:00:00

      // Kiểm tra ngày tháng trước khi gửi
      if (
        shippedDateObj &&
        (shippedDateObj < currentDate ||
          (receiptDateObj && shippedDateObj > receiptDateObj))
      ) {
        toast.error("Ngày gửi không được ở sau ngày nhận!");
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
        toast.error(
          "Ngày gửi không được ở quá khứ, trước ngày nhận, hoặc ngày nhận phải cách ngày gửi ít nhất 1 tháng!"
        );
        return; // Dừng lại nếu ngày không hợp lệ
      }
      const originalImageFile = koiData.Image; // Giá trị ban đầu
      console.log(originalImageFile);
      const originalVideoFile = koiData.Video; // Giá trị ban đầu
      console.log(originalVideoFile);
      // Kiểm tra và lấy tệp hình ảnh
      let imageFile =
        formData.Image && formData.Image.length > 0 ? formData.Image[0] : null;

      if (!imageFile) {
        console.warn("No new image file selected. Using original.");
        imageFile = originalImageFile; // Khôi phục giá trị ban đầu
      }

      if (!imageFile) {
        console.error("Image file is still undefined.");
        toast.error("Vui lòng chọn một hình ảnh.");
        return;
      }

      // Kiểm tra và lấy tệp video
      let videoFile =
        formData.Video && formData.Video.length > 0 ? formData.Video[0] : null;

      if (!videoFile) {
        console.warn("No new video file selected. Using original.");
        videoFile = originalVideoFile; // Khôi phục giá trị ban đầu
      }

      if (!videoFile) {
        console.error("Video file is still undefined.");
        toast.error("Vui lòng chọn một video.");
        return;
      }

      // Tạo tham chiếu đến vị trí lưu trữ
      const imageRef = ref(storage, `koiImages/${imageFile.name}`);
      const videoRef = ref(storage, `koiVideos/${videoFile.name}`);

      let imageUrl = originalImageFile ? originalImageFile.url : null; // Giữ URL cũ nếu không có tệp mới
      let videoUrl = originalVideoFile ? originalVideoFile.url : null; // Giữ URL cũ nếu không có tệp mới

      // Tải lên ảnh nếu có tệp mới
      if (formData.Image && formData.Image.length > 0) {
        await uploadBytes(imageRef, imageFile.originFileObj);
        imageUrl = await getDownloadURL(imageRef); // Nhận URL mới
      }

      // Tải lên video nếu có tệp mới
      if (formData.Video && formData.Video.length > 0) {
        await uploadBytes(videoRef, videoFile.originFileObj);
        videoUrl = await getDownloadURL(videoRef); // Nhận URL mới
      }

      // Cập nhật formData với URL
      const updatedFormData = {
        ...values,
        Image: imageUrl, // Chọn URL mới hoặc giữ URL cũ
        Video: videoUrl, // Chọn URL mới hoặc giữ URL cũ
        Description: formData.Description.toString(),
        ShippedDate: shippedDateObj ? shippedDateObj.toISOString() : null,
        ReceiptDate: receiptDateObj ? receiptDateObj.toISOString() : null,
      };

      console.log("Updated form data:", updatedFormData);
      console.log(updatedFormData);
      // Call the API with the entire form values
      const response = await updateConsign(updatedFormData);
      console.log(response);
      console.log("Update response from updateConsign:", response.data); // Log response from API
    } catch (error) {
      console.error("Error updating consign:", error); // Log the error object
      toast.error("Cập nhật thất bại.");
    }
  };
  const updateConsign = async (formData) => {
    console.log("Updating consign with data:", formData);
    try {
      console.log("Updated form data:", formData);
      const response = await axiosInstance.patch(
        `/users/tat-ca-don-ki-gui/${consign._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response.data);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      console.error("Error during upload or API update:", error);
      toast.error("Cập nhật thất bại.");
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
              >
                <div style={{ color: "black" }}>
                  <Title level={3}>Thông tin khách hàng</Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "48%" }}>
                      <Form.Item
                        label="Địa chỉ email (*)"
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
                          placeholder="Nhập địa chỉ email (name@example.com)"
                          disabled={userData?.email}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Địa chỉ (*)"
                        name="address"
                        rules={[
                          { required: true, message: "Vui lòng nhập địa chỉ." },
                        ]}
                      >
                        <Input
                          placeholder="Nhập địa chỉ"
                          disabled={userData?.address}
                        />
                      </Form.Item>
                    </div>
                    <div style={{ width: "48%" }}>
                      <Form.Item
                        label="Số điện thoại (*)"
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
                      <Form.Item
                        label="Tên người ký gửi (*)"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập họ và tên.",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập họ và tên"
                          disabled={userData?.name}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <hr />
                  <Title level={3}>Thông Tin Ký Gửi</Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "48%" }}>
                      <Form.Item
                        label="Nơi chăm sóc koi (*)"
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
                          <Radio value="Home">Home</Radio>
                          <Radio value="IKoiFarm">IKoiFarm</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="Phương thức nhận koi (*)"
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
                          <Radio value="Online">Online</Radio>
                          <Radio value="Offline">Offline</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div style={{ width: "48%" }}>
                      <Form.Item label="Ngày Gửi" name="ShippedDate">
                        <DatePicker
                          style={{ width: "100%" }}
                          value={initialValues.ShippedDate}
                          onChange={(date) =>
                            handleDateChange("ShippedDate", date)
                          }
                          format="DD/MM/YYYY" // Thay đổi format ở đây
                        />
                      </Form.Item>
                      <Form.Item label="Ngày Nhận" name="ReceiptDate">
                        <DatePicker
                          style={{ width: "100%" }}
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

                  <Form.Item label="Chi tiết về đơn ký gửi " name="Detail">
                    <Input.TextArea
                      name="Detail"
                      value={formData.Detail}
                      onChange={handleChange}
                      placeholder="Nhập chi tiết về đơn ký gửi"
                      style={{ height: "150px", resize: "none" }}
                    />
                  </Form.Item>

                  <hr />

                  <Title level={3}>Thông Tin Koi Muốn Ký Gửi</Title>

                  <Form.Item
                    name="CategoryID"
                    label="Loại Cá (*)"
                    rules={[
                      { required: true, message: "Vui lòng chọn danh mục." },
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
                        <Select.Option key={category._id} value={category._id}>
                          {category.CategoryName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="KoiName"
                    label="Tên Loại Cá Koi (*)"
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

                  <Form.Item
                    name="Age"
                    label="Tuổi (*)"
                    rules={[
                      { required: true, message: "Vui lòng nhập tuổi." },
                      {
                        type: "string",
                        min: 1,
                        max: 50,
                        message: "Tuổi phải từ 1 đến 50.",
                      },
                      {
                        validator: (_, value) => {
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 1) {
                            return Promise.reject(
                              new Error("Tuổi phải lớn hơn hoặc bằng 1.")
                            );
                          }
                          if (numericValue > 50) {
                            return Promise.reject(
                              new Error("Tuổi phải nhỏ hơn bằng 50")
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

                  <Form.Item
                    name="Origin"
                    label="Nguồn Gốc (*)"
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

                  <Form.Item
                    label="Giới Tính (*)"
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
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name="Size"
                    label="Kích Thước (*) (cm)"
                    rules={[
                      { required: true, message: "Vui lòng nhập kích thước." },
                      {
                        type: "string",
                        min: 1,
                        max: 200,
                        message: "Kích thước phải từ 1 đến 200.",
                      },
                      {
                        validator: (_, value) => {
                          const numericValue = Number(value); // Convert to a number
                          if (numericValue < 1) {
                            return Promise.reject(
                              new Error("Kích Thước phải lớn hơn hoặc bằng 1.")
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
                      min={5}
                      max={150}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Xuất xứ(*)"
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
                      <Radio value="Nhật">Nhật</Radio>
                      <Radio value="Việt">Việt</Radio>
                      <Radio value="F1">F1</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name="DailyFoodAmount"
                    label="Nhập lượng thức ăn / ngày(*) (đơn vị kg/ngày)"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lượng thức ăn.",
                      },
                      {
                        type: "string",
                        min: 1,
                        max: 100,
                        message: "Lượng thức ăn / ngày(*) phải từ 1 đến 100.",
                      },
                      {
                        validator: (_, value) => {
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
                              new Error("lượng thức ăn phải nhỏ hơn bằng 200")
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
                      placeholder="Nhập lượng thức ăn / ngày"
                      step="1"
                      min={1}
                      max={100}
                    />
                  </Form.Item>

                  <Form.Item
                    name="FilteringRatio"
                    label="Nhập tỷ lệ lọc(*) (%)"
                    rules={[
                      { required: true, message: "Vui lòng nhập tỷ lệ lọc." },
                      {
                        type: "string",
                        min: 0, // Update min to 0.1 as per your requirement
                        max: 100,
                        message: "Tỷ lệ lọc phải từ 0.1 đến 100.",
                      },
                      {
                        validator: (_, value) => {
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
                      step={0.1}
                    />
                  </Form.Item>

                  <Form.Item
                    name="CertificateID"
                    label="CertificateID(*)"
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

                  <Form.Item
                    name="Image"
                    label="Nộp ảnh (*)"
                    rules={[{ required: true, message: "Vui lòng nộp ảnh." }]}
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

                  <Form.Item
                    name="Video"
                    label="Nộp video (*)"
                    rules={[{ required: true, message: "Vui lòng nộp video." }]}
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ fileList }) =>
                        handleUploadChange("Video", fileList)
                      }
                      listType="text"
                      fileList={videoFileList1} // Add this line to bind the value to the Upload component
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
                <Form.Item label="Chi tiết về koi" name="Description">
                  <Input.TextArea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    placeholder="Nhập chi tiết về cá koi của bạn"
                    style={{ height: "150px", resize: "none" }}
                  />
                </Form.Item>
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
              <div>No consign data available.</div>
            )}
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
// other fields...
