import { Modal, Avatar, Upload } from "antd";
import { HiLink } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Button, Form, Input, AutoComplete, DatePicker, message } from "antd";
import "../../../Css/Modal.css";
import React from 'react';
import axiosInstance from "../../../Utils/axiosJS";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import useAddress from "../useAddress";
import dayjs from "dayjs";
export default function ViewProfile({ actions, setactions, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [form] = Form.useForm();

  const handleClose = () => {
    setactions(false);
  };

  const { searchText, setSearchText, recommendations } = useAddress();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSubmitting(true);
        const res = await axiosInstance.get(`/manager/manage-user/${id}`);
        const { _id, name, email, created_at, address, picture } = res.data.result;
        
        
        setUser({ _id, name, email, created_at, address, picture });
        form.setFieldsValue({
          name,
          email,
          created_at: dayjs(created_at),
          address,
          user_id: _id,
        });
        setPreviewAvatar(picture);
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsSubmitting(false);
      }
    };
    fetchData();
  }, [id]);

  const savedToClipboard = () => {
    message.success("ID đã được sao chép vào clipboard!");
    navigator.clipboard.writeText(user._id);
  };

  const handleAvatarChange = (info) => {
    const { file } = info;
    setSelectedAvatar(file)
  
   
      setPreviewAvatar(URL.createObjectURL(file));
    
  };
  

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const updatedData = await form.validateFields();
      
      if (selectedAvatar) {
        console.log(selectedAvatar);
        const imgRef = ref(storage, `images/${selectedAvatar}`);
        await uploadBytes(imgRef, selectedAvatar);
        updatedData.picture = await getDownloadURL(imgRef);
      }
      console.log(updatedData);
      
      const response = await axiosInstance.post(`manager/manage-user/updateUser/${user._id}`, updatedData);
      if (response.data.result.success) {
        message.success('Cập nhật hồ sơ thành công');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title={'Hồ Sơ Người Dùng'} open={actions} onCancel={handleClose} footer={null} centered>
      

      <div className="modal-body">
        <div className="d-flex align-items-center justify-content-between profile-row">
          <Avatar src={previewAvatar || "https://via.placeholder.com/80"} size={80} />
          <div className="d-flex flex-column align-items-end">
            <h5>{user.name || 'Amélie Laurent'}</h5>
            <span className="text-muted">{user.email || 'amelie@untitledui.com'}</span>
            <div className="user-id-container mt-2" onClick={savedToClipboard}>
              <HiLink />
              <span className="ms-1 fw-bold">Sao chép ID Người dùng</span>
            </div>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Ảnh hồ sơ">
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
            >
              <Button>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <AutoComplete
              options={recommendations.map((address) => ({ value: address }))}
              onSearch={setSearchText}
            />
          </Form.Item>

          <Form.Item label="Ngày Tạo Hồ Sơ" name="created_at">
            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Địa chỉ email" name="email">
            <Input readOnly />
          </Form.Item>

          <Form.Item label="ID Người dùng" name="user_id">
            <Input readOnly />
          </Form.Item>
        </Form>
      </div>

      <div className="modal-footer">
        <Button onClick={handleClose}>Hủy</Button>
        <Button type="primary" loading={isLoading} onClick={() => form.submit()}>
          Lưu thay đổi
        </Button>
      </div>
    </Modal>
  );
}
