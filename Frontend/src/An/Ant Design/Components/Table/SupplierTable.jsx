import { Table, Avatar, Tag, Tooltip, message, Button, Dropdown, Menu, Checkbox, Input, Modal, Form, Select, Image, Upload, Space, Result, Col, Row, AutoComplete } from "antd";
import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react';
import axiosInstance from "../../../Utils/axiosJS";
import moment from 'moment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import useAddress from "../useAddress";
export default function SupplierTable({ data, showCreate, setCreate, ResetTable }) {
  const [selectedColumns, setSelectedColumns] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentSupplier, setCurrentSupplier] = React.useState(null);
  const [currentCountry, setCurrentCountry] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = React.useState(false);
  const { searchText, setSearchText, recommendations } = useAddress();
  // const { allVietnameseAddress, getAllDistrictOfACity, getALLWardOfADistrict } = useAddress();
  // console.log(allVietnameseAddress);
  // console.log(getAllDistrictOfACity('Thành phố Hồ Chí Minh'));
  const handleCityChange = (value) => {
    setSelectedDistrict(null); 
    setSelectedCity(value);
    setSelectedDistrict(null); 


  };








  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard(null); 
    form.setFieldsValue({ District: value, Ward: null });

  };
  const handleWardChange = (value) => {
    setSelectedWard(value);
    form.setFieldsValue({ Ward: value });

  };

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };
  useEffect(() => {
    console.log(currentCountry)
  }, [currentCountry])
  useEffect(() => {
    if (showCreate) {
      console.log("showCreate", showCreate);
      showCreateModal();
    }
  }, [showCreate]);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const showUpdateModal = (supplier) => {
    setCreate(false);
    form.resetFields();
    setCurrentSupplier(supplier);
    console.log("supplier", supplier);
    setIsModalVisible(true);
    form.setFieldsValue(supplier);
    console.log("form", form.getFieldValue());
  };
  const handleSetContry = (value) => {
    setCurrentCountry(value);
  }
  const showCreateModal = () => {
    setCurrentSupplier(null);
    setIsModalVisible(true);
  }
  const handleUpdate = async (values) => {

    setUploading(true);
    if (showCreate == false) {
      try {
        const updatedData = { ...currentSupplier, ...values };
        if (values.SupplierImage && typeof values.SupplierImage === 'object' && values.SupplierImage.name) {
          const imageFile = values.SupplierImage;
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(imageRef);
          updatedData.SupplierImage = downloadURL;
        }
        if (values.SupplierVideo) {
          const videoFile = values.SupplierVideo;
          console.log("videoFile", videoFile);
          const videoRef = ref(storage, `videos/${videoFile.name}`);
          await uploadBytes(videoRef, videoFile);
          const downloadURL = await getDownloadURL(videoRef);
          console.log("downloadURL", downloadURL);
          updatedData.SupplierVideo = downloadURL;
        }
        console.log("updatedData", updatedData);
        // updatedData.Address = `${selectedWard}, ${selectedDistrict}, ${selectedCity}`;
        await axiosInstance.put(`/manager/manage-supplier/${currentSupplier._id}`, updatedData);
        message.success(`Nhà cung cấp "${values.SupplierName}" đã được cập nhật.`);
        ResetTable()
        setIsModalVisible(false);
        setCreate(false);
        form.resetFields();
      } catch (error) {
        console.error(error);
        message.error("Cập nhật thất bại. Vui lòng thử lại.");
      } finally {
        setUploading(false);
        ResetTable(),
          form.resetFields();
      }
    }
    else {
      try {
        const newSupplier = { ...values };
        if (values.SupplierImage) {
          const imageFile = values.SupplierImage;
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(imageRef);
          newSupplier.SupplierImage = downloadURL;
        }
        if (values.SupplierVideo) {
          const videoFile = values.SupplierVideo;
          console.log("videoFile", videoFile);
          const videoRef = ref(storage, `videos/${videoFile.name}`);
          await uploadBytes(videoRef, videoFile);
          const downloadURL = await getDownloadURL(videoRef);
          console.log("downloadURL", downloadURL);
          newSupplier.SupplierVideo = downloadURL;
        }
        //  
        await axiosInstance.post(`/manager/manage-supplier/create-new-supplier`, newSupplier);
        message.success(`Nhà cung cấp "${values.SupplierName}" đã được tạo.`);
        form.resetFields();
        setSelectedCity(null);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setIsModalVisible(false);
        ResetTable()
      } catch (error) {
        console.error(error);
        message.error("Tạo mới thất bại. Vui lòng thử lại.");
      } finally {
        setUploading(false);
      }
    }
  }
  const handleFileUpload = (file) => {
    const isSupportedFormat = ["image/jpeg", "image/png"].includes(file.type);
    if (!isSupportedFormat) {
      message.error("Chỉ hỗ trợ tệp JPEG và PNG!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCreate(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success("ID đã được sao chép vào bộ nhớ tạm!");
  };

  const handleColumnVisibility = (columnKey, isVisible) => {
    setSelectedColumns((prevState) => ({
      ...prevState,
      [columnKey]: !isVisible
    }));
  };

  const resetColumns = () => {
    setSelectedColumns({});
  };

  const searchFunction = (item) => {
    const searchFields = ['_id', 'SupplierName', 'Address', 'Country'];
    return searchFields.some(field =>
      item[field]?.toString()?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = searchTerm ? data.filter(searchFunction) : data;

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <>
          <Tag color="blue">{text}</Tag>
          <Tooltip title="Sao chép ID">
            <CopyOutlined
              style={{ marginLeft: 8, cursor: 'pointer', float: 'right' }}
              onClick={() => copyToClipboard(text)}
            />
          </Tooltip>
        </>
      ),
    },
    {
      title: 'Tên Nhà Cung Cấp',
      dataIndex: 'SupplierName',
      key: 'SupplierName',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'SupplierImage',
      key: 'SupplierImage',
      render: (url) => <Avatar src={url} />,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'Address',
      key: 'Address',
      render: (text) => text || <Tag color="red">Không Cung Cấp</Tag>,
    },
    {
      title: 'Quốc Gia',
      dataIndex: 'Country',
      key: 'Country',
      filters: [
        { text: 'Nhật', value: 'Nhật' },
        { text: 'Việt Nam', value: 'Việt Nam' },
      ],
      onFilter: (value, record) => record.Country === value,
      filterMultiple: false,
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'SupplierDescription',
      key: 'SupplierDescription',
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Trang Web',
      dataIndex: 'SupplierWebsite',
      key: 'SupplierWebsite',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Cập Nhật
          </Button>
        </>
      ),
    },
  ].map(col => ({ ...col, visible: !selectedColumns[col.key] }));

  const filteredColumns = columns.filter(col => col.visible);

  const columnSelectionMenu = (
    <Menu>
      {columns.map((col) => (
        <Menu.Item key={col.key}>
          <Checkbox
            checked={!selectedColumns[col.key]}
            onChange={(e) => handleColumnVisibility(col.key, e.target.checked)}
          >
            {col.title}
          </Checkbox>
        </Menu.Item>
      ))}
      <Menu.Item>
        <Button type="link" onClick={resetColumns}>
          Đặt Lại Tất Cả
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="_id" />

      <Modal
        width={700}
        title={
          showCreate ? "Tạo Nhà Cung Cấp Mới" : `Cập Nhật Nhà Cung Cấp: ${currentSupplier?.SupplierName}`
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          showCreate ? (
            <Button key="create" type="primary" onClick={() => form.submit()} loading={uploading}>
              {uploading ? "Đang Tạo..." : "Tạo"}
            </Button>
          ) : (
            <Button key="update" type="primary" onClick={() => form.submit()} loading={uploading}>
              {uploading ? "Đang Cập Nhật..." : "Cập Nhật"}
            </Button>
          )

        ]}
      >
        {
          showCreate ? null : (
            <Space>
              <Image
                width={300}
                src={currentSupplier?.SupplierImage}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcY jsx0TyjF_GLISODks8)"
              />
              <video width="300" controls>
                <source src={currentSupplier?.SupplierVideo} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </Space>
          )
        }

        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Tên Nhà Cung Cấp"
            name="SupplierName"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp' }]}
          >
            <Input />
          </Form.Item>



          <Form.Item
            label="Quốc Gia"
            name="Country"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}
            initialValue={"Việt Nam"}

          >
            <Select
              onChange={handleSetContry}
              placeholder="Chọn Quốc Gia"
            >
              <Select.Option value="Nhật Bản">Nhật Bản</Select.Option>
              <Select.Option value="Việt Nam">Việt Nam</Select.Option>

            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Địa Chỉ"
            name="Address"
            rules={[
              {
                required: true,
                // validator: (_, value) => {
                //   if (!selectedCity) {
                //     return Promise.reject('Vui lòng chọn Tỉnh/Thành Phố.');
                //   }
                //   if (!selectedDistrict) {
                //     return Promise.reject('Vui lòng chọn Quận/Huyện.');
                //   }
                //   if (!selectedWard) {
                //     return Promise.reject('Vui lòng chọn Phường/Xã.');
                //   }
                //   return Promise.resolve();
                // }
              }
            ]}
          >
            <Input />
            {/* <Row gutter={16}>
              <Col span={8}>
                <Select
                  value={selectedCity}
                  placeholder="Chọn Tỉnh/Thành Phố"
                  onChange={handleCityChange}
                >
                  {allVietnameseAddress.map((city) => (
                    <Select.Option key={city.name} value={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>

              {selectedCity && (
                <Col span={8}>
                  <Select
                    value={selectedDistrict}
                    placeholder="Chọn Quận/Huyện"
                    onChange={handleDistrictChange}
                  >
                    {getAllDistrictOfACity(selectedCity)?.map((district) => (
                      <Select.Option key={district.name} value={district.name}>
                        {district.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              )}

              {selectedDistrict && (
                <Col span={8}>
                  <Select
                    value={selectedWard}
                    placeholder="Chọn Phường/Xã"
                    onChange={handleWardChange}
                  >
                    {getALLWardOfADistrict(selectedCity, selectedDistrict)?.map((ward) => (
                      <Select.Option key={ward.name} value={ward.name}>
                        {ward.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row> 
          </Form.Item> */}
            <Form.Item label="Address"
              name="Address"
              rules={ [{ required: true, message: 'Vui lòng nhập địa chỉ' }] }
            >
                <AutoComplete
                  allowClear
                    value={searchText}
                    onChange={setSearchText}
                    options={recommendations.map(address => ({ value: address }))}
                    placeholder= "Nhập địa chỉ"
                    
                />
            </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            name="PhoneNumber"
            rules={[

              () => ({
                validator(_, value) {
                  if (typeof value === 'undefined' || value === '') {
                    return Promise.reject('Số điện thoại không được để trống');
                  }

                  if (typeof value === 'string') {
                    const attepmtToParseInt = parseInt(value);
                    if (isNaN(attepmtToParseInt)) {
                      return Promise.reject('Số điện không được chứa chữ cái');
                    }
                  }


                  // const phoneNumberVN = parsePhoneNumberFromString(value, 'VN');
                  // const phoneNumberJP = parsePhoneNumberFromString(value, 'JP');

                  // if ((!phoneNumberVN || !phoneNumberVN.isValid()) && (!phoneNumberJP || !phoneNumberJP.isValid())) {
                  //   return Promise.reject('Số điện thoại phải là số điện thoại Nhật hoặc Việt');
                  // }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="SupplierDescription"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Trang Web"
            name="SupplierWebsite"
            rules={[{
              required: false,
              type: 'url',
              message: 'Vui lòng nhập URL hợp lệ',
              pattern: "^(https?|ftp):\/\/[^\s\/$.?#]+(?:\/[^/\s]*)*(?:\?[^#\s]*)?(?:#[^\s]*)?$"
            }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hình Ảnh Nhà Cung Cấp"
            name="SupplierImage"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList ? e.fileList[0].originFileObj : null)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button>Click để Tải Lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Video Nhà Cung Cấp"
            name="SupplierVideo"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList ? e.fileList[0].originFileObj : null)}
          >
            <Upload

              beforeUpload={() => false}
              maxCount={1}
            >
              <Button>Click để Tải Lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
