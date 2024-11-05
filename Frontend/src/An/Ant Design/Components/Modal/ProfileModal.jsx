import { Container, Modal, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { HiLink } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import message from "antd/lib/message";
import "../../../Css/Modal.css";
import React from 'react'
import { SelfCheckContext } from '../../../Ant Design/Components/ANTDTopbar';
import axiosInstance from "../../../Utils/axiosJS";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
export default function ViewProfile({ actions, setactions, id }) {
  const setIsCheckingSelf = React.useContext(SelfCheckContext);
  const handleClose = () => {
    setactions(false);
    setIsCheckingSelf(false);
  }
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const savedToClipboard = () => {
    message.success("ID đã được sao chép vào clipboard!");
    navigator.clipboard.writeText(user._id);
  };

  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    date_of_birth: '',
    email: '',
    user_id: '',
    selectedAvatar: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSubmitting(true);
        const res = await axiosInstance.get(`manager/manage-user/user${id}`);
        console.log(res.data.result);
        const { _id, name, email, date_of_birth, verify, bio, location, website, username, Image, cover_photo, address, picture } = res.data.result;
        const formattedDateOfBirth = date_of_birth ? date_of_birth.split('T')[0] : '';
        setUser({ _id, name, email, date_of_birth, verify, bio, location, website, username, Image, cover_photo, address, picture });
        setFormData({
          name: name || '',
          address: address || '',
          date_of_birth: formattedDateOfBirth || '',
          email: email || '',
          user_id: _id || '',
          selectedAvatar: Image || ''
        });
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsSubmitting(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: formData.name,
        role: formData.role,
        date_of_birth: formData.date_of_birth,
        email: formData.email,
        address: formData.address,
        Image: formData.selectedAvatar
      };
      if (selectedAvatar) {
        const imgRef = ref(storage, `images/${selectedAvatar.name}`);
        await uploadBytes(imgRef, selectedAvatar);
        updatedData.picture = await getDownloadURL(imgRef);
      }

      if (selectedAvatar) {
        const imgRef = ref(storage, `images/${selectedAvatar.name}`);
        await uploadBytes(imgRef, selectedAvatar);
      }
  

      const response = await axiosInstance.post(`manager/manage-user/updateUser/${id}`, updatedData);
      console.log(response.data);
      if (response.data.result.success == true) {
        console.log('Cập nhật thành công');
        message.success('Cập nhật hồ sơ thành công');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }
      
    //  alert('Cập nhật hồ sơ thành công');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={actions} onHide={handleClose} centered dialogClassName="modal-30w">
      <Modal.Header className="bg-light">
        <Modal.Title>Hồ sơ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex align-items-center justify-content-between profile-row">
          {previewAvatar ? (
            <Image src={previewAvatar} roundedCircle className="profile-avatar" />
          ) : (
            <Image src={user.picture || "https://via.placeholder.com/80"} roundedCircle className="profile-avatar" />
          )}
          <div className="d-flex flex-column align-items-end">
            <h5>{user.name || 'Amélie Laurent'}</h5>
            <span className="text-muted">{user.email || 'amelie@untitledui.com'}</span>
            <div className="user-id-container mt-2" onClick={savedToClipboard}>
              <HiLink />
              <span className="ms-1 fw-bold">Sao chép ID Người dùng</span>
            </div>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Ảnh hồ sơ</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </Form.Group>

          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Address*/}
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* Date of Birth */}
          <Form.Group className="mb-3">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              readOnly
            />
          </Form.Group>

          {/* User ID */}
          <Form.Group className="mb-3">
            <Form.Label>ID Người dùng</Form.Label>
            <Form.Control
              type="text"
              name="user_id"
              value={formData.user_id}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}