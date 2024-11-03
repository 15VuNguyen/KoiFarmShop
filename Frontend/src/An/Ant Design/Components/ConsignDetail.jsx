import React from 'react';
import { Avatar, Form, Descriptions, Divider, Input, Button, Select, Row, Col, Tag, Carousel, message, Upload, Image, Space, Modal, InputNumber, DatePicker, Tooltip } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../Utils/axiosJS';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
dayjs.extend(utc);
import moment from 'moment';
import FormItem from 'antd/es/form/FormItem';

export default function ConsignDetail({ consignID }) {
  const [consignData, setConsignData] = React.useState({});
  const [imageList, setImageList] = React.useState([]);
  const [video, setVideo] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [catagoryList, setCatagoryList] = React.useState([]);
  const [validFieldForUpdate, setValidFieldForUpdate] = React.useState({
    name: "",
    address: "",
    phone_number: "",
    PositionCare: "",
    Method: "",
    CategoryID: "",
    KoiName: "",
    Age: 0,
    Origin: "",
    Gender: "",
    Size: 0,
    Breed: "",
    Description: "",
    DailyFoodAmount: 0,
    FilteringRatio: 0,
    CertificateID: "",
    Price: 0,
    Image: "",
    Video: "",
    State: 0,
    Detail: ''

  });
  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await axiosInstance.get('getAllKoi');
        const { categoryList } = response.data;
        setCatagoryList(categoryList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCatagory();
  }, []);
  const [editField, setEditField] = React.useState(null);
  const [editValue, setEditValue] = React.useState(null);
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);
  const [previewAvatar, setPreviewAvatar] = React.useState(null);
  const [trigger, setTrigger] = React.useState(0);
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
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`manager/manage-ki-gui/${consignID}`);
        const { user, consign, koi } = res.data.result;
        setConsignData({ user, consign, koi });
        setImageList(koi.Image ? [koi.Image] : []);
        setVideo(koi.Video);
      } catch (error) {
        console.error(error);
      }
    };

    if (consignID) {
      fetchData();
    }
  }, [consignID, trigger]);

  const handleImageUpload = async ({ file }) => {
    try {
      setIsLoading(true);
      const imgRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imgRef, file);
      const imgURL = await getDownloadURL(imgRef);
      setImageList((prev) => [...prev, imgURL]);
      const updatedFields = { ...validFieldForUpdate, Image: imgURL };
      try {
        const reponse = await axiosInstance.put(`manager/manage-ki-gui/${consignID}`, updatedFields);
        console.log(reponse)
        setTrigger(trigger + 1);
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Image upload failed');
      }
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Image upload failed');
    } finally {
      setIsLoading(false);
    }
  };
  // const handleImageUpload = async ({ file }) => {

  //   const files = Array.isArray(file) ? file : [file];
  //   const uploadedImages = [];

  //   for (const fileItem of files) {
  //     try {
  //       const imgRef = ref(storage, `images/${fileItem.name}`);
  //       await uploadBytes(imgRef, fileItem);
  //       const imgURL = await getDownloadURL(imgRef);
  //       uploadedImages.push(imgURL); 
  //       message.success(`${fileItem.name} uploaded successfully`);
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //       message.error('Image upload failed');
  //     }
  //   }


  //   setImageList((prev) => [...prev, ...uploadedImages]);
  //   console.log(uploadedImages);

  //   const updatedFields = { ...validFieldForUpdate, Images: [...uploadedImages] }; // Send all uploaded images
  //   try {
  //     console.log(updatedFields +"YOYOY ");
  //     const response = await axiosInstance.put(`manager/manage-ki-gui/${consignID}`, updatedFields);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error updating with images:', error);
  //     message.error('Image update failed');
  //   }
  // };

  const handleVideoUpload = async ({ file }) => {
    try {
      const videoRef = ref(storage, `videos/${file.name}`);
      await uploadBytes(videoRef, file);
      const videoURL = await getDownloadURL(videoRef);
      setVideo(videoURL);
      const updatedFields = { ...validFieldForUpdate, Video: videoURL };
      try {
        const reponse = await axiosInstance.put(`manager/manage-ki-gui/${consignID}`, updatedFields);
        console.log(reponse)
        message.success(`${file.name} uploaded successfully`);
        setVideo(videoURL);
        setTrigger(trigger + 1);

      } catch (error) {
        console.error('Error uploading video:', error);
        message.error('Video upload failed');
      }

      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading video:', error);
      message.error('Video upload failed');
    }
  };

  if (!consignData.user || !consignData.consign || !consignData.koi) {
    return <p>Loading...</p>;
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const { user, consign, koi } = consignData;

  const toggleEdit = (field, initialValue) => {
    if (field === 'ShippedDate' || field === 'ReceiptDate') {
      if (field === 'ShippedDate') {
        initialValue = dayjs(consign.ShippedDate).utc(true);
        setEditField(field);
        setEditValue(initialValue);
      }
      else if (field === 'ReceiptDate') {
        initialValue = dayjs(consign.ReceiptDate).utc(true);
        setEditField(field);
        setEditValue(initialValue);
      }
    }
    else {

      setEditField(field);
      setEditValue(initialValue);
    }
  };

  function StateMapping(State) {
    const stateMap = {
      1: 'Yêu cầu ký gửi',
      2: 'Đang kiểm tra Koi',
      3: 'Đang thương thảo hợp đồng',
      4: 'Đang tìm người mua',
      5: 'Đã bán thành công',
    };
    switch (State) {
      case 1:
        return <Tag color="blue">{stateMap[State]}</Tag>;
      case 2:
        return <Tag color="green">{stateMap[State]}</Tag>;
      case 3:
        return <Tag color="orange">{stateMap[State]}</Tag>;
      case 4:
        return <Tag color="purple">{stateMap[State]}</Tag>;
      case 5:
        return <Tag color="red">{stateMap[State]}</Tag>;
      default:
        return <Tag color="red">Unknown</Tag>;
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  function KoiStatusMapping(Status) {
    const KoiStatusMap = {
      0: 'Hết Hàng',
      1: 'Nhập Khẩu',
      2: "F1",
      3: "Việt Nam",
      4: "Ký Gửi",
    };
    return KoiStatusMap[Status];
  }

  const saveEdit = (field) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: `Are you sure you want to save changes to ${field}?`,
      onOk: async () => {
        try {
          let updatedFields 
          if (field === 'State' && editValue === 4 && koi.Price == 0 || consign.Price === null) {
            message.error("Please enter a price before updating the state to 'Đang tìm người mua'.");
            return;
          }
          if (field === 'Status') {
            updatedFields = { ...validFieldForUpdate, [field]: editValue.toString() };
          }
          else {
            updatedFields = { ...validFieldForUpdate, [field]: editValue };
          }
          // const updatedFields = { ...validFieldForUpdate, [field]: editValue };
          setValidFieldForUpdate(updatedFields);
          console.log(updatedFields)
          setEditField(null);
          const reponse = await axiosInstance.put(`manager/manage-ki-gui/${consignID}`, updatedFields);
          message.success(`${field} has been updated successfully`);
          setTrigger(trigger + 1);
          console.log(reponse)
        } catch (error) {
          console.error('Error saving changes:', error);
          message.error(`Failed to update ${field}`);
        }
      },
      onCancel: () => {
        setEditField(null);
        setEditValue(null);
      },
    });
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue(null);
  };

  const renderEditableItem = (label, value, field, inputType) => (
    <Descriptions.Item label={label}>
      {editField === field ? (
        <>
          {inputType === 'selectMethod' ? (
            <Select value={editValue} onChange={(value) => setEditValue(value)}>
              <Select.Option value="Online">Online</Select.Option>
              <Select.Option value="Offline">Offline</Select.Option>
            </Select>
          ) : inputType === 'selectState' ? (
            <Select value={editValue} onChange={(value) => setEditValue(value)}>
              <Select.Option value={1}>Yêu cầu ký gửi</Select.Option>
              <Select.Option value={2}>Đang kiểm tra Koi</Select.Option>
              <Select.Option value={3}>Đang thương thảo hợp đồng</Select.Option>
              <Select.Option value={4}>Đang tìm người mua</Select.Option>
              <Select.Option value={5}>Đã bán thành công</Select.Option>
            </Select>
          ) : inputType === 'SelectStatus' ? (
            <Select style={{ minWidth: '7rem' }} value={editValue} onChange={(value) => setEditValue(value)}>
              <Select.Option value={'0'}>Hết Hàng</Select.Option>
              <Select.Option value={'1'}>Nhập Khẩu</Select.Option>
              <Select.Option value={'2'}>F1</Select.Option>
              <Select.Option value={'3'}>Việt Nam</Select.Option>
              <Select.Option value={'4'}>Ký Gửi</Select.Option>
            </Select>
          )
            :
            inputType === 'selectSize' ? (
              <InputNumber min={0} max={200} required value={editValue} onChange={(value) => setEditValue(value)} />
            )



              : inputType === 'selectCommission' ? (
                <InputNumber min={0} max={99} required value={editValue} onChange={(value) => setEditValue(value)} suffix={"%"} />
              ) : inputType === 'selectPrice' ? (

                consign.State === 3 || consign.State === '3' ? (
                  <InputNumber min={1000} required value={editValue} onChange={(value) => setEditValue(value)} />
                ) : (
                  <InputNumber min={0} value={editValue} onChange={(value) => setEditValue(value)} />
                )

              ) : inputType === 'selectCategory' ? (
                <Select value={editValue} onChange={(value) => setEditValue(value)}>
                  {catagoryList.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.CategoryName}
                    </Select.Option>
                  ))}
                </Select>
              ) : inputType === 'selectAge' ? (
                <InputNumber min={1} max={50} required value={editValue} onChange={(value) => setEditValue(value)} />

              ) : inputType === 'selectReceivedDate' && field === 'ShippedDate' ? (
                <Form.Item label={
                  <Space>
                    <span>Shipped Date</span>
                    <Tooltip title="Ngày ship phải ở hiện tại hoặc tương lai">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </Space>
                }>
                  <DatePicker
                    // getValueProps={(value) => ({ value: value ? dayjs(value).format('YYYY-MM-DD') : "" })}
                    // onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                    value={editValue}
                    onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                    format={'YYYY-MM-DD'}
                    {
                      ...consign.State === 4 ? { disabled: true } : {}
                    }
                  />
                </Form.Item>
              ) :

                inputType === 'selectReceiptDate' && field === 'ReceiptDate' ? (
                  <Form.Item label={
                    <Space>
                      <span>Receipt Date</span>
                      <Tooltip title="Receipt Date must be at least 30 days after Shipped Date">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Space>
                  } >
                    <DatePicker

                      value={editValue}
                      onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                      disabledDate={(current) =>
                        current && current < moment(consign.ShippedDate).add(30, 'days').startOf('day')
                      }
                    />
                  </Form.Item>
                ) :

                  inputType === 'setGender' ? (
                    <Select value={editValue} onChange={(value) => setEditValue(value)} >
                      <Select.Option value={'Male'} >Male</Select.Option>
                      <Select.Option value={'Female'} > Female</Select.Option>
                    </Select>) :
                    inputType === 'SelectPositionCare' ? (
                      <Select value={editValue} onChange={(value) => setEditValue(value)} style={{ width: '10rem' }}>
                        <Select.Option value={'IKOI FARM'} >IKOI FARM</Select.Option>
                        <Select.Option value={'Home'} >Home</Select.Option>
                      </Select>) :

                      inputType === 'selectBreed' ? (
                        <Select value={editValue} onChange={(value) => setEditValue(value)}>
                          <Select.Option value={'Nhập Khẩu Nhật'} >Nhập Khẩu Nhật</Select.Option>
                          <Select.Option value={'Nhập Khẩu Việt'} >Nhập Khẩu Việt</Select.Option>
                          <Select.Option value={'Nhập Khẩu Trung'} >Nhập Khẩu Trung</Select.Option>
                          <Select.Option value={'Nhập Khẩu F1'} >Nhập Khẩu F1</Select.Option>
                        </Select>
                      ) : inputType === 'selectFood' ? (
                        <InputNumber min={0} max={100} required value={editValue} onChange={(value) => setEditValue(value)} />
                      ) : inputType === 'selectFilter' ? (
                        <InputNumber min={0} max={100} required value={editValue} onChange={(value) => setEditValue(value)} />
                      ) :



                        (
                          <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                        )}
          <Button icon={<CheckOutlined />} type="link" onClick={() => saveEdit(field)} />
          <Button icon={<CloseOutlined />} type="link" onClick={cancelEdit} />
        </>
      ) : (
        <>
          {field === 'State' ? StateMapping(value) : field === 'Status' ? KoiStatusMapping(value) : field === 'CategoryID' ? catagoryList.find((category) => category._id === value)?.CategoryName : value

          }
          {/* <Button icon={<EditOutlined />} type="link" onClick={() => toggleEdit(field, value)} /> */}
          {
            (field === 'ShippedDate' && consign.State == 4)? (
              <></>
            ) : (
              <Button icon={<EditOutlined />} type="link" onClick={() => toggleEdit(field, value)} />
            )
          }
        </>
      )}
    </Descriptions.Item>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Form layout="vertical">
        <Descriptions title="Thông tin người ký gửi" bordered>
          <Descriptions.Item label="Tên người dùng">{user.name}</Descriptions.Item>
          {renderEditableItem("Địa chỉ", user.address, "address")}
          {renderEditableItem("Số điện thoại", user.phone_number, "phone_number")}
          <Descriptions.Item label="Verified">
            {user.verify ? 'Yes' : 'No'}
          </Descriptions.Item>
          <Descriptions.Item label="Profile Picture">
            <Avatar src={user.picture} size={64} />
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Consign Information" bordered>
          {renderEditableItem("Method", consign.Method, "Method", "selectMethod")}
          {renderEditableItem("Position Care", consign.PositionCare, "PositionCare", 'SelectPositionCare')}
          {renderEditableItem("Trạng thái đơn ký gửi", consign.State, "State", "selectState")}
          {renderEditableItem("Shipped Date", dayjs(consign.ShippedDate).utc().format('YYYY-MM-DD'), "ShippedDate", "selectReceivedDate")}
          {renderEditableItem("Receipt Date", moment.utc(consign.ReceiptDate).format('YYYY-MM-DD'), "ReceiptDate", "selectReceiptDate")}


          {renderEditableItem("Hoa Hồng", consign.Commission, "Commission", "selectCommission")}
          {renderEditableItem("Chi tiết kí gửi", consign.Detail, "Detail")}
          <Descriptions.Item label="Total Price">
            {consign.TotalPrice == 0 ? (
              <Tag color="red">Not Provided</Tag>
            ) : (
              formatCurrency(consign.TotalPrice)
            )}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Koi Information" bordered>
          {renderEditableItem("Koi Name", koi.KoiName, "KoiName")}
          {renderEditableItem("Age", koi.Age, "Age", 'selectAge')}
          {renderEditableItem("Origin", koi.Origin, "Origin")}
          {renderEditableItem("Gender", koi.Gender, "Gender", 'setGender')}
          {renderEditableItem("Size (cm)", koi.Size, "Size", 'selectSize')}
          {renderEditableItem("Breed", koi.Breed, "Breed", 'selectBreed')}
          {renderEditableItem("Certificate ID", koi.CertificateID, "CertificateID")}
          {renderEditableItem("Price", formatCurrency(koi.Price), "Price", "selectPrice")}
          {renderEditableItem("đơn vị kg/ngày", koi.DailyFoodAmount, "DailyFoodAmount", 'selectFood')}
          {renderEditableItem("Filtering Ratio (%)", koi.FilteringRatio, "FilteringRatio", 'selectFilter')}
          {renderEditableItem("Status", koi.Status, "Status", "SelectStatus")}
          {renderEditableItem("Category ID", koi.CategoryID, "CategoryID", 'selectCategory')}
          {renderEditableItem("Description", koi.Description, "Description")}
        </Descriptions>
        <Divider />
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Upload

              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"

            >
              <Button loading={isLoading} icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageList.length > 0 && (
              <Carousel lazyLoad='anticipated'>
                {imageList.map((img) => (
                  <div key={img}>
                    <Image width="480px" height="360px" src={img} />
                  </div>
                ))}
              </Carousel>
            )}
          </Col>


          <Col xs={24} md={12} lg={8}>
            <Upload
              customRequest={handleVideoUpload}
              showUploadList={false}
              accept="video/*"

            >
              <Button loading={isLoading} icon={<UploadOutlined />}>Upload Video</Button>
            </Upload>
            {video && (
              <video style={{ display: 'block' }} width="480px" height='360px' controls >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
