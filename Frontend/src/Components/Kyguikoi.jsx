import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  Descriptions,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
    setFormData((prevData) => ({ ...prevData, [key]: date }));
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const shippedDateObj = formData.shippedDate
        ? new Date(Date.UTC(...formData.shippedDate.split("-"))) // Assuming shippedDate is in 'YYYY-MM-DD' format
        : null;

      const receiptDateObj = formData.receiptDate
        ? new Date(Date.UTC(...formData.receiptDate.split("-"))) // Assuming receiptDate is in 'YYYY-MM-DD' format
        : null;

      const currentDate = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate()
        )
      );

      // Check for shippedDate validity
      if (shippedDateObj) {
        if (shippedDateObj < currentDate) {
          toast.error("Ngày gửi không được ở quá khứ!");
          return;
        }
        if (receiptDateObj && shippedDateObj > receiptDateObj) {
          toast.error("Ngày gửi không được sau ngày nhận!");
          return;
        }
      }

      // Check for receiptDate validity
      if (receiptDateObj && receiptDateObj < currentDate) {
        toast.error("Ngày nhận không được ở quá khứ!");
        return;
      }
      if (shippedDateObj && receiptDateObj) {
        // Create a new date object for one month after the shipped date
        const oneMonthAfterShippedDate = new Date(shippedDateObj);
        oneMonthAfterShippedDate.setMonth(shippedDateObj.getMonth() + 1);

        // Check if the receipt date is before the one-month mark
        if (receiptDateObj < oneMonthAfterShippedDate) {
          toast.error("Ngày nhận phải lớn hơn ngày gửi ít nhất 1 tháng!");
          return;
        }
      }
      // Parse Size and Age as integers, DailyFoodAmount and FilteringRatio as floats
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
        shippedDate: shippedDateObj ? shippedDateObj.toISOString() : null,
        receiptDate: receiptDateObj ? receiptDateObj.toISOString() : null,
      };
      console.log(dataToSend);
      const imageRef = ref(storage, `koiImages/${formData.Image[0].name}`);
      const videoRef = ref(storage, `koiVideos/${formData.Video[0].name}`);

      await uploadBytes(imageRef, formData.Image[0].originFileObj);
      const imageUrl = await getDownloadURL(imageRef);

      await uploadBytes(videoRef, formData.Video[0].originFileObj);
      const videoUrl = await getDownloadURL(videoRef);

      // Update dataToSend with the URLs
      dataToSend.Image = imageUrl;
      dataToSend.Video = videoUrl;

      const response = await axiosInstance.post("/ki-gui", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          if (isLoggedIn) {
            // Nếu người dùng đã đăng nhập, điều hướng đến "/donkygui"
            navigate("/donkyguipage");
          } else {
            // Nếu chưa đăng nhập, điều hướng đến trang chính với thông điệp
            navigate("/");
          }
        }, 5000);
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
              <hr />
              <Title level={3}>Thông Tin Ký Gửi</Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                      name="Method"
                      value={formData.Method}
                    >
                      <Radio value="Online">Online</Radio>
                      <Radio value="Offline">Offline</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div style={{ width: "48%" }}>
                  <Form.Item label="Ngày Gửi">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date) => handleDateChange("shippedDate", date)}
                    />
                  </Form.Item>
                  <Form.Item label="Ngày Nhận">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date) => handleDateChange("receiptDate", date)}
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item label="Chi tiết về đơn ký gửi " name="Detail">
                <Input.TextArea
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
                rules={[{ required: true, message: "Vui lòng chọn danh mục." }]}
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
                  { required: true, message: "Vui lòng nhập tên loại cá koi." },
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
                  { required: true, message: "Vui lòng nhập lượng thức ăn." },
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
                          new Error("Lượng thức ăn phải lớn hơn hoặc bằng 1.")
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
                  placeholder="Nhập lượng thức ăn / ngày"
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
                  max={100}
                  step={0.1}
                />
              </Form.Item>

              <Form.Item
                name="CertificateID"
                label="CertificateID(*)"
                rules={[
                  { required: true, message: "Vui lòng nhập CertificateID." },
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
                  listType="picture"
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
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item label="Chi tiết về koi">
              <Input.TextArea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Nhập chi tiết về cá koi của bạn"
                style={{ height: "150px", resize: "none" }}
              />
            </Form.Item>

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
