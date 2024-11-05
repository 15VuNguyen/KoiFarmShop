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
  Button,
  Radio,
  DatePicker,
  Upload,
  Typography,
  Spin,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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

export default function Kyguikoi() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loggedIn = !!accessToken; // Kiểm tra nếu có accessToken
    setIsLoggedIn(loggedIn);

    // Check localStorage for toast state
  }, [isLoggedIn]);

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
    DailyFoodAmount: 0,
    FilteringRatio: 0,
    CertificateID: "",
    Image: null,
    Video: null,
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [form] = Form.useForm();
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
        toast.error("Ngày gửi không được ở quá khứ hoặc trước ngày nhận!");
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
        form.resetFields();
        toast.success(response.data.message);
        setTimeout(() => {
          if (isLoggedIn) {
            navigate("/donkyguipage");
          } else {
            navigate("/");
          }
        }, 3000);
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

  return (
    <Container>
      <div>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "auto" }} />
        ) : (
          <Form
            style={{ maxWidth: "800px", margin: "auto" }}
            onFinish={handleSubmit}
            form={form}
            initialValues={{
              email: userData?.email || "",
              name: userData?.name || "",
              address: userData?.address || "",
              phone_number: userData?.phone_number || "",
              ShipAddress: userData?.address || "",
            }}
          >
            <div style={{ color: "black" }}>
              <Title level={3}>Thông tin khách hàng</Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Địa chỉ email
                    </span>
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
                        placeholder="Nhập địa chỉ email (name@example.com)"
                        disabled={userData?.email}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Địa chỉ
                    </span>
                    <Form.Item
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
                </div>
                <div style={{ width: "48%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Số điện thoại
                    </span>
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
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Tên người ký gửi
                    </span>
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
              <Title level={3}>Thông Tin Ký Gửi</Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Nơi chăm sóc koi
                    </span>
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
                        <Radio value="Home">Home</Radio>
                        <Radio value="IKoiFarm">IKoiFarm</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Phương thức nhận koi
                    </span>
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
                        <Radio value="Online">Online</Radio>
                        <Radio value="Offline">Offline</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Ngày gửi
                    </span>
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
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Ngày nhận
                    </span>
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
              <div>
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  {" "}
                  <span style={{ color: "red" }}>* </span>
                  Chi tiết về đơn ký gửi
                </span>
                <Form.Item>
                  <Input.TextArea
                    name="Detail"
                    value={formData.Detail}
                    onChange={handleChange}
                    placeholder="Nhập chi tiết về cá koi của bạn"
                    style={{ height: "150px", resize: "none" }}
                  />
                </Form.Item>
              </div>
              <hr />
              <Title level={3}>Thông Tin Koi Muốn Ký Gửi</Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: "50%",
                    paddingRight: "10px",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Các loại cá
                    </span>
                  </div>
                  <Form.Item
                    name="CategoryID"
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
                      placeholder="Chọn loại cá"
                    >
                      {categoryData.map((category) => (
                        <Select.Option key={category._id} value={category._id}>
                          {category.CategoryName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {" "}
                      <span style={{ color: "red" }}>* </span>
                      Tên Koi của bạn
                    </span>
                  </div>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%", paddingRight: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Tuổi Koi của bạn
                  </span>
                  <Form.Item
                    name="Age"
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
                </div>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Nguồn gốc
                  </span>
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
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Giới Tính
                  </span>
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
                      <Radio value="Male" style={{ width: "100px" }}>
                        Male
                      </Radio>
                      <Radio value="Female" style={{ width: "100px" }}>
                        Female
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Kích Thước(cm)
                  </span>
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
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Giống loài
                  </span>
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
                      <Radio value="Nhat" style={{ width: "100px" }}>
                        Nhật
                      </Radio>
                      <Radio value="Viet" style={{ width: "100px" }}>
                        Việt
                      </Radio>
                      <Radio value="F1" style={{ width: "100px" }}>
                        F1
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Nhập lượng thức ăn/ngày (đơn vị g/ngày)
                  </span>
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
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", paddingRight: "15px" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Nhập tỷ lệ lọc(%)
                  </span>
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
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    CertificateID
                  </span>
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
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Nộp ảnh
                  </span>
                  <Form.Item
                    name="Image"
                    rules={[{ required: true, message: "Vui lòng nộp ảnh." }]}
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ fileList }) =>
                        handleUploadChange("Image", fileList)
                      }
                      listType="picture"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
                <div style={{ width: "50%" }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {" "}
                    <span style={{ color: "red" }}>* </span>
                    Nộp video
                  </span>
                  <Form.Item
                    name="Video"
                    rules={[{ required: true, message: "Vui lòng nộp video." }]}
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ fileList }) =>
                        handleUploadChange("Video", fileList)
                      }
                      listType="text"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {" "}
                <span style={{ color: "red" }}>* </span>
                Chi tiết về koi
              </span>
              <Form.Item>
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
