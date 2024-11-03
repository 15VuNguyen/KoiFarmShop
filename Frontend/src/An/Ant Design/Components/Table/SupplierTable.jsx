import { Table, Avatar, Tag, Tooltip, message, Button, Dropdown, Menu, Checkbox, Input, Modal, Form, Select, Image, Upload,Space} from "antd";
import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react';
import axiosInstance from "../../../Utils/axiosJS";
import moment from 'moment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

export default function SupplierTable({ data, showCreate, setCreate,ResetTable }) {
  const [selectedColumns, setSelectedColumns] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentSupplier, setCurrentSupplier] = React.useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = React.useState(false);
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };
  useEffect(() => {
    if (showCreate) {
      console.log("showCreate", showCreate);
      showCreateModal();
    }
  }, [showCreate]);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const showUpdateModal = (supplier) => {
    setCurrentSupplier(supplier);
    console.log("supplier", supplier);
    setIsModalVisible(true);
    form.setFieldsValue(supplier);
    console.log("form", form.getFieldValue());
  };
  const showCreateModal = () => {
    setCurrentSupplier(null);
    setIsModalVisible(true);
  }
  const handleUpdate = async (values) => {

    setUploading(true);
    if (showCreate == false) {
      try {
        const updatedData = { ...currentSupplier, ...values };
        if (values.SupplierImage && typeof values.SupplierImage === 'object' && values.SupplierImage.name){
          const imageFile = values.SupplierImage;
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(imageRef);
          updatedData.SupplierImage = downloadURL;
        }
        if (values.SupplierVideo){
          const videoFile = values.SupplierVideo;
          console.log("videoFile", videoFile);
          const videoRef = ref(storage, `videos/${videoFile.name}`);
          await uploadBytes(videoRef, videoFile);
          const downloadURL = await getDownloadURL(videoRef);
          console.log("downloadURL", downloadURL);
          updatedData.SupplierVideo = downloadURL;
        }
        console.log("updatedData", updatedData);
        await axiosInstance.put(`/manager/manage-supplier/${currentSupplier._id}`, updatedData);
        message.success(`Supplier "${values.SupplierName}" has been updated.`);
        ResetTable()
        setIsModalVisible(false);
        setCreate(false);
        form.resetFields();
      } catch (error) {
        console.error(error);
        message.error("Update failed. Please try again.");
      } finally {
        setUploading(false);
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
        if (values.SupplierVideo){
          const videoFile = values.SupplierVideo;
          console.log("videoFile", videoFile);
          const videoRef = ref(storage, `videos/${videoFile.name}`);
          await uploadBytes(videoRef, videoFile);
          const downloadURL = await getDownloadURL(videoRef);
          console.log("downloadURL", downloadURL);
          newSupplier.SupplierVideo = downloadURL;
        }
        await axiosInstance.post(`/manager/manage-supplier/create-new-supplier`, newSupplier);
        message.success(`Supplier "${values.SupplierName}" has been created.`);
        setIsModalVisible(false);
        ResetTable()
      } catch (error) {
        console.error(error);
        message.error("Create failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  }
  const handleFileUpload = (file) => {
    const isSupportedFormat = ["image/jpeg", "image/png"].includes(file.type);
    if (!isSupportedFormat) {
      message.error("Only JPEG and PNG files are supported!");
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
    message.success("ID copied to clipboard!");
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
          <Tooltip title="Copy ID">
            <CopyOutlined
              style={{ marginLeft: 8, cursor: 'pointer', float: 'right' }}
              onClick={() => copyToClipboard(text)}
            />
          </Tooltip>
        </>
      ),
    },
    {
      title: 'Supplier Name',
      dataIndex: 'SupplierName',
      key: 'SupplierName',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    },
    {
      title: 'Image',
      dataIndex: 'SupplierImage',
      key: 'SupplierImage',
      render: (url) => <Avatar src={url} />,
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      render: (text) => text || <Tag color="red">Not Provided</Tag>,
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      key: 'Country',
      filters: [
        { text: 'Nhật', value: 'Nhật' },
        { text: 'Trung Quốc', value: 'Trung Quốc' },
        { text: 'Việt Nam', value: 'Việt Nam' },
      ],
      onFilter: (value, record) => record.Country === value,
      filterMultiple: false,
    },
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
    },
    {
      title: 'Description',
      dataIndex: 'SupplierDescription',
      key: 'SupplierDescription',
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Website',
      dataIndex: 'SupplierWebsite',
      key: 'SupplierWebsite',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Update
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
          Reset All
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
          showCreate ? "Create New Supplier" : `Update Supplier: ${currentSupplier?.SupplierName}`
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          showCreate ? (
            <Button key="create" type="primary" onClick={() => form.submit()} loading={uploading}>
              {uploading ? "Creating..." : "Create"}
            </Button>
          ) : (
            <Button key="update" type="primary" onClick={() => form.submit()} loading={uploading}>
              {uploading ? "Updating..." : "Update"}
            </Button>
          )
          
        ]}
      >
        {
          showCreate ? null : (
          <Space>  <Image  width={300} src={currentSupplier?.SupplierImage}
          fallback="data:image/png;base64,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"
        />
        <video width="300" controls>
          <source src={currentSupplier?.SupplierVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </Space>
      )
        }

        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Supplier Name"
            name="SupplierName"
            rules={[{ required: true, message: 'Please enter the supplier name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="Country"
            rules={[{ required: true, message: 'Please enter the country' }]}
          >
            <Select>
              <Select.Option value="Nhật Bản">Nhật bản</Select.Option>
              <Select.Option value="Việt Nam">Việt Nam</Select.Option>
              <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="PhoneNumber"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="SupplierDescription"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Website"
            name="SupplierWebsite"
            rules={[{ required: false,
            type: 'url',
            message: 'Please enter a valid URL',
            pattern: "^(https?|ftp):\/\/[^\s\/$.?#]+(?:\/[^/\s]*)*(?:\?[^#\s]*)?(?:#[^\s]*)?$"
             }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Supplier Image"
            name="SupplierImage"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList ? e.fileList[0].originFileObj : null)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Supplier Video"
            name="SupplierVideo"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList ? e.fileList[0].originFileObj : null)}
            >
            <Upload
              
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button>Click to Upload</Button>
            </Upload>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
