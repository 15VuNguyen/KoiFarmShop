import React from 'react';
import { Avatar, Form, Descriptions, Divider, Input, Button, Select, Row, Col, Tag, Carousel, message, Upload, Image, Space, Modal, InputNumber, DatePicker, Tooltip, Typography, AutoComplete } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../Utils/axiosJS';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import utc from 'dayjs/plugin/utc';
import useAddress from './useAddress';
import dayjs from 'dayjs';
dayjs.extend(utc);
import moment from 'moment';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
export default function ConsignDetail({ consignID, reset }) {
  const [consignData, setConsignData] = React.useState({});
  const [imageList, setImageList] = React.useState([]);
  const [video, setVideo] = React.useState(null);
  const { searchText, setSearchText, recommendations } = useAddress();

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
        message.error('Tải ảnh lên thất bại');
      }
      message.success(`${file.name} đã tải lên thành công`);
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Tải ảnh lên thất bại');
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
        message.success(`${file.name} đã tải lên thành công`);
        setVideo(videoURL);
        setTrigger(trigger + 1);

      } catch (error) {
        console.error('Error uploading video:', error);
        message.error('Tải video lên thất bại');
      }

      message.success(`${file.name} đã tải lên thành công`);
    } catch (error) {
      console.error('Error uploading video:', error);
      message.error('Tải video lên thất bại');
    }
  };

  if (!consignData.user || !consignData.consign || !consignData.koi) {
    return <p>Đang tải...</p>;
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const { user, consign, koi } = consignData;

  const toggleEdit = (field, initialValue) => {
    if (field === 'ShippedDate' || field === 'ReceiptDate' || field === 'ConsignCreateDate') {
      if (field === 'ShippedDate') {
        if (consign.ShippedDate === null || consign.ShippedDate === undefined || consign.ShippedDate === '') {
          initialValue = dayjs().utc(true);
          setEditField(field);
          setEditValue(initialValue);
        } else {
          initialValue = dayjs(consign.ShippedDate).utc(true);
          setEditField(field);
          setEditValue(initialValue);
        }
      }
      else if (field === 'ReceiptDate') {
        if (consign.ReceiptDate === null || consign.ReceiptDate === undefined || consign.ReceiptDate === '') {
          initialValue = dayjs().utc(true);
          setEditField(field);
          setEditValue(initialValue);
        }

        else {
          initialValue = dayjs(consign.ReceiptDate).utc(true);
          setEditField(field);
          setEditValue(initialValue);
        }
      }
      else if (field === 'ConsignCreateDate') {
        if (consign.ConsignCreateDate === null || consign.ConsignCreateDate === undefined || consign.ConsignCreateDate === '') {
          initialValue = dayjs().utc(true);
          setEditField(field);
          setEditValue(initialValue);
        }

        else {
          initialValue = dayjs(consign.ConsignCreateDate).utc(true);
          setEditField(field);
          setEditValue(initialValue);
        }
      }
    }
    else if (field === 'Price') {
      setEditField(field);
      setEditValue(koi.Price);
    } else if (field === 'address') {
      console.log('Address');
      setSearchText(editValue);
      setEditField(field);
      setEditValue(initialValue);

    }
    else if (field === 'Age'){
      setEditField(field);
      setEditValue(koi.Age);
    }
    else {

      setEditField(field);
      setEditValue(initialValue);
    }
  };

  function StateMapping(State) {
    const stateMap = {
      '-1': 'Đã hủy',
      1: 'Yêu cầu ký gửi',
      2: 'Đang kiểm tra Koi',
      3: 'Đang thương thảo hợp đồng',
      4: 'Đang tìm người mua',
      5: 'Đã bán thành công',
    };
    switch (State) {
      case -1:
        return <Tag color="red">{stateMap[State]}</Tag>;
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
        return <Tag color="red">Không xác định</Tag>;
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
  function isAtLeast30Days(date1, date2) {
    return dayjs(date1).utc().diff(dayjs(date2), 'days') >= 30;
  }

  function add30Days(date) {
    const targetDate = dayjs(date).add(30, 'days');
    return targetDate.format('YYYY-MM-DD');
  }

  const fieldMapping = {
    address: 'Địa chỉ',
    phone_number: 'Số điện thoại',
    PositionCare: 'Vị trí chăm sóc',
    Method: 'Phương thức',
    CategoryID: 'ID Danh mục',
    KoiName: 'Tên Koi',
    Age: 'Tuổi',
    Origin: 'Nguồn gốc',
    ShippingDate: 'Ngày vận chuyển',
    ReceiptDate: 'Ngày nhận',
    Price: 'Giá',
    State: 'Trạng thái',
    Commission: 'Hoa Hồng',
    Breed: 'Giống',
    Description: 'Mô tả',
    DailyFoodAmount: 'Lượng thức ăn đơn vị g/ngày',
    FilteringRatio: 'Tỉ lệ lọc (%)',
    CertificateID: 'ID Chứng chỉ',
    Size: 'Kích thước (cm)',
    consignCreateDate: 'Ngày tạo đơn',
    AddressConsignKoi: 'Địa chỉ đơn ký gửi',
    PhoneNumberConsignKoi: 'Số điện thoại đơn ký gửi',
    Detail: 'Chi tiết kí gửi',
    Gender: 'Giới tính',

  }
  const saveEdit = (field) => {
    Modal.confirm({
      title: 'Bạn có chắc không?',
      content: `Bạn có chắc chắn muốn lưu thay đổi cho ${fieldMapping[field]}?`,
      onOk: async () => {
        try {
          let updatedFields
          if (field === 'State' && editValue === 4 && koi.Price == 0 || consign.Price === null) {
            message.error("Vui lòng nhập giá trước khi cập nhật trạng thái thành 'Đang tìm người mua'.");
            return;
          }
          if (field === 'phone_number' || field === 'PhoneNumberConsignKoi') {
            if (typeof editValue === 'undefined' || editValue === '') {
              message.error('Số điện thoại không được để trống');
              return;
            }
            if (editValue.length < 10) {
              message.error('Số điện thoại không hợp lệ');
              return;
            }
            if (editValue.length > 20) {
              message.error('Số điện thoại không hợp lệ');
              return;
            }
            
          
          
            const attemptToParseInt = parseInt(editValue);
            console.log(attemptToParseInt);
          }
          
          if (field === 'ShippedDate' && !isAtLeast30Days(editValue, consign.ReceiptDate)) {
            const newReceiptDate = add30Days(editValue);
            console.log(newReceiptDate);
            updatedFields = { ...validFieldForUpdate, [field]: editValue, ReceiptDate: newReceiptDate };
          }
          else if (field === 'Status') {
            updatedFields = { ...validFieldForUpdate, [field]: editValue.toString() };
          }

          else {
            updatedFields = { ...validFieldForUpdate, [field]: editValue };
          }
          // const updatedFields = { ...validFieldForUpdate, [field]: editValue };
          await setValidFieldForUpdate(updatedFields);
          console.log(updatedFields)
          setEditField(null);
          const reponse = await axiosInstance.put(`manager/manage-ki-gui/${consignID}`, updatedFields);
          message.success(`${fieldMapping[field]} đã được cập nhật thành công`);
          setTrigger(trigger + 1);
          console.log(reponse)
          reset();
        } catch (error) {
          console.error('Error saving changes:', error);
          message.error(`Cập nhật ${field} thất bại`);
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
          ) :
            inputType === 'selectPhone'? (
              <Input
              placeholder="Số điện thoại không được để trống"
              value={editValue}
              onChange={(e) => {
                const value = e.target.value;
               
                if (/^[\d]*$/.test(value)) {
                  setEditValue(value);
                }
              }}
              maxLength={20}
              style={{ width: '100%' }}
            />
            

            ) :
              inputType === 'selectState' ? (
                <Select style={{ minWidth: '9rem' }} value={editValue} onChange={(value) => setEditValue(value)}>
                  <Select.Option value={-1}>Đã Hủy</Select.Option>
                  <Select.Option value={1}>Yêu cầu ký gửi</Select.Option>
                  <Select.Option value={2}>Đang kiểm tra Koi</Select.Option>
                  <Select.Option value={3}>Đang thương thảo hợp đồng</Select.Option>
                  <Select.Option value={4}>Đang tìm người mua</Select.Option>
                  <Select.Option value={5}>Đã bán thành công</Select.Option>
                </Select>
              ) :

                inputType === 'selectConsignCreateDate' ? (
                  <DatePicker
                    value={editValue}
                    onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                    format={'DD-MM-YYYY'}

                  />
                ) :
                  inputType === 'SelectStatus' ? (
                    <Select style={{ minWidth: '9rem' }} value={editValue} onChange={(value) => setEditValue(value)}>

                      <Select.Option value={'0'}>Hết Hàng</Select.Option>
                      <Select.Option value={'1'}>Nhập Khẩu</Select.Option>
                      <Select.Option value={'2'}>F1</Select.Option>
                      <Select.Option value={'3'}>Việt Nam</Select.Option>
                      <Select.Option value={'4'}>Ký Gửi</Select.Option>
                    </Select>
                  )
                    :
                    inputType === 'selectSize' ? (
                      <InputNumber min={5} max={200} required value={editValue} onChange={(value) => setEditValue(value)} />
                    )



                      : inputType === 'selectCommission' ? (
                        <InputNumber min={0} max={99} required value={editValue} onChange={(value) => setEditValue(value)} suffix={"%"} />
                      ) : inputType === 'selectPrice' ? (

                        consign.State === 3 || consign.State === '3' ? (
                          <InputNumber min={1000} required value={editValue} onChange={(value) => setEditValue(value)}
                            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} style={{ width: '25%' }} suffix={"đ"}
                          />
                        ) : (
                          <InputNumber min={0} value={editValue} onChange={(value) => setEditValue(value)} formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} style={{ width: '20%' }} suffix={"đ"}
                          />
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
                        <Tooltip title="Tuổi phải phải nằm từ năm 1700 đến năm hiện tại">
                        <InputNumber
                          
                        min={1700} max={()=>{
                          return new Date().getFullYear();
                        }} required value={editValue} onChange={(value) => setEditValue(value)} />
                        </Tooltip>
                      ) : inputType === 'selectReceivedDate' && field === 'ShippedDate' ? (
                        <Form.Item label={
                          <Space>
                            <span>Ngày vận chuyển</span>
                            <Tooltip title="Ngày vận chuyển phải ở hiện tại hoặc nhỏ hơn ngày nhận hàng">
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </Space>
                        }>
                          <DatePicker
                            // getValueProps={(value) => ({ value: value ? dayjs(value).format('YYYY-MM-DD') : "" })}
                            // onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                            value={editValue}
                            onChange={(date) => setEditValue(date ? date.utc(true) : null)}
                            disabledDate={(current) => current && current > dayjs(consign.ReceiptDate).startOf('day')}
                            format={'DD-MM-YYYY'}
                            {
                            ...consign.State === 4 ? { disabled: true } : {}
                            }
                          />
                        </Form.Item>
                      ) :

                        inputType === 'selectReceiptDate' && field === 'ReceiptDate' ? (
                          <Form.Item label={
                            <Space>
                              <span>Ngày nhận</span>
                              <Tooltip title="Ngày nhận phải ít nhất 30 ngày sau ngày vận chuyển">
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
                              format={'DD-MM-YYYY'}
                            />
                          </Form.Item>
                        ) : inputType === 'selectAddress' ? (
                          <AutoComplete
                            allowClear
                            value={editValue}
                            onChange={(value) => {
                              setSearchText(value);
                              setEditValue(value);
                            }}
                            options={recommendations.map((address) => ({ value: address }))}
                            style={{ width: '100%' }}
                          />
                        ) :

                          inputType === 'setGender' ? (
                            <Select value={editValue} onChange={(value) => setEditValue(value)} >
                              <Select.Option value={'Male'} >Nam</Select.Option>
                              <Select.Option value={'Female'} > Nữ</Select.Option>
                            </Select>) :
                            inputType === 'SelectPositionCare' ? (
                              <Select value={editValue} onChange={(value) => setEditValue(value)} style={{ width: '10rem' }}>
                                <Select.Option value={'IKOI FARM'} >IKOI FARM</Select.Option>
                                <Select.Option value={'Home'} >Home</Select.Option>
                              </Select>) :

                              inputType === 'selectBreed' ? (
                                <Select value={editValue} onChange={(value) => setEditValue(value)}>
                                  <Select.Option value={'Nhat'} >Nhập Khẩu Nhật</Select.Option>
                                  <Select.Option value={'Viet'} >IKOI Việt</Select.Option>
                                  <Select.Option value={'F1'} >IKOIF1</Select.Option>
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
            (consign.State == 5 || consign.State == -1) ? (
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
          {renderEditableItem("Địa chỉ", user.address, "address", "selectAddress")}
          {renderEditableItem("Số điện thoại", user.phone_number, "phone_number", 'selectPhone')}
          <Descriptions.Item label="Đã xác minh">
            {user.verify ? <Tag color="green">Đã xác minh</Tag> : <Tag color="red">Chưa xác minh</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh đại diện">
            <Avatar src={user.picture} size={64} />
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Thông tin ký gửi" bordered>
          {renderEditableItem("Ngày tạo đơn ", consign.ConsignCreateDate ? dayjs(consign.ConsignCreateDate).utc().format('DD-MM-YYYY') : <Tag color='red'>Chưa có dữ liệu</Tag>, "ConsignCreateDate", 'selectConsignCreateDate')}
          {renderEditableItem("Ngày vận chuyển", consign.ShippedDate ? dayjs(consign.ShippedDate).utc().format('DD-MM-YYYY') : <Tag color='red'>Chưa có dữ liệu</Tag>, "ShippedDate", "selectReceivedDate")}
          {renderEditableItem("Ngày nhận", consign.ReceiptDate ? moment.utc(consign.ReceiptDate).format('DD-MM-YYYY') : <Tag color='red'>Chưa có dữ liệu</Tag>, "ReceiptDate", "selectReceiptDate")}
          {renderEditableItem("Phương thức", consign.Method, "Method", "selectMethod")}
          {renderEditableItem("Vị trí chăm sóc", consign.PositionCare, "PositionCare", 'SelectPositionCare')}
          {renderEditableItem("Số điện thoại đơn ký gửi", consign.PhoneNumberConsignKoi, "PhoneNumberConsignKoi", 'selectPhone')}
          {renderEditableItem("Chi tiết kí gửi", consign.Detail, "Detail")}
          {renderEditableItem("Trạng thái đơn ký gửi", consign.State, "State", "selectState")}
          {renderEditableItem("Địa chỉ đơn ký gửi", consign.AddressConsignKoi, "AddressConsignKoi", 'selectAddress')}




          {renderEditableItem("Hoa Hồng(%)", consign.Commission == 0 || isNaN(consign.Commission) ? (
            <Tag color="red">Chưa cung cấp</Tag>
          ) : (
            consign.Commission
          ), "Commission", "selectCommission")}

          <Descriptions.Item label="Tổng Giá">
            {consign.TotalPrice == 0 ? (
              <Tag color="red">Chưa cung cấp</Tag>
            ) : (
              formatCurrency(consign.TotalPrice)
            )}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Thông tin Koi" bordered>
          {renderEditableItem("Tên Koi", koi.KoiName, "KoiName")}
          {renderEditableItem("Tuổi",  new Date().getFullYear() - koi.Age, "Age", 'selectAge')}
          {renderEditableItem("Nguồn gốc", koi.Origin, "Origin")}
          {renderEditableItem("Giới tính", koi.Gender, "Gender", 'setGender')}
          {renderEditableItem("Kích thước (cm)", koi.Size, "Size", 'selectSize')}
          {renderEditableItem("Giống", koi.Breed, "Breed", 'selectBreed')}
          {renderEditableItem("ID Chứng chỉ", koi.CertificateID, "CertificateID")}
          {renderEditableItem("Giá", formatCurrency(koi.Price), "Price", "selectPrice")}
          {renderEditableItem("Lượng thức ăn đơn vị g/ngày", koi.DailyFoodAmount, "DailyFoodAmount", 'selectFood')}
          {renderEditableItem("Tỉ lệ lọc (%)", koi.FilteringRatio, "FilteringRatio", 'selectFilter')}
          {renderEditableItem("Trạng thái", koi.Status, "Status", "SelectStatus")}
          {renderEditableItem("ID Danh mục", koi.CategoryID, "CategoryID", 'selectCategory')}
          {renderEditableItem("Mô tả", koi.Description, "Description")}
        </Descriptions>
        <Divider />
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Upload

              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"

            >
              <Button loading={isLoading} icon={<UploadOutlined />}>Tải ảnh lên</Button>
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
              <Button loading={isLoading} icon={<UploadOutlined />}>Tải video lên</Button>
            </Upload>
            {video && (
              <video style={{ display: 'block' }} width="480px" height='360px' controls >
                <source src={video} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
