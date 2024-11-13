import React, { useState } from 'react';
import { Card, Col, Row, Input, Button, Badge, Space, Typography, Image, Empty, Modal, Form, Select, InputNumber, message, Upload, Tooltip } from 'antd';
import { useManageKoi } from '../../Hooks/useManageKoi';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { PlusOutlined, LoadingOutlined, UploadOutlined, CheckOutlined, PlusCircleOutlined, EditOutlined, StopOutlined, PlusCircleFilled } from '@ant-design/icons'
import axiosInstance from '../../Utils/axiosJS';
export default function Kois() {

    const [video, setVideo] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalKoi, setModalKoi] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imgList, setImgList] = useState();
    const [videoList, setVideoList] = useState();
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
    function resetLeModal() {
        setIsModalVisible(false);

        setIsCreating(false);
        form.resetFields();
    }
    React.useEffect(() => {
        if (imgList) console.log("Updated imgList:", imgList);
    }, [imgList]);

    React.useEffect(() => {
        if (videoList) console.log("Updated videoList:", videoList);
    }, [videoList]);

    const {
        result,
        filteredCategories,
        handleDisableEnable,
        Refreshing
    } = useManageKoi();
    const handleImageUpload = async ({ file }) => {
        try {
            setIsLoading(true);
            const imgRef = ref(storage, `images/${file.name}`);
            await uploadBytes(imgRef, file);
            const imgURL = await getDownloadURL(imgRef);
            //   setImageList((prev) => [...prev, imgURL]);
            //   const updatedFields = { ...validFieldForUpdate, Image: imgURL };
            console.log(imgURL);
            const { CategoryID, KoiName, Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Image } = modalKoi;
            let updatedKoi = { CategoryID, KoiName, Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Image }
            updatedKoi.Image = imgURL;
            if (isCreating) {
                form.setFieldsValue({ Image: imgURL });
                setModalKoi(prev => ({ ...prev, Image: imgURL }));
                setImgList(imgURL);
            }
            else {
                setModalKoi(updatedKoi);

                try {
                    console.log(modalKoi)
                    const reponse = await axiosInstance.put(`/manager/manage-koi/updateKoi/${modalKoi._id}`, updatedKoi);
                    console.log(reponse)
                    Refreshing();
                    // 
                    // console.log(reponse)
                    // setTrigger(trigger + 1);    
                    message.success(`${file.name} uploaded successfully`)
                } catch (error) {
                    console.error('Error uploading image:', error);
                    message.error('Image upload failed');
                }
            }

            ;
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Image upload failed');
        } finally {
            setIsLoading(false);
        }
    };
    const handleVideoUpload = async ({ file }) => {
        try {
            setIsLoading(true);
            const videoRef = ref(storage, `videos/${file.name}`);
            await uploadBytes(videoRef, file);
            const videoURL = await getDownloadURL(videoRef);
            setVideo(videoURL);
            const { CategoryID, KoiName, Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Video } = modalKoi;
            let updatedKoi = { CategoryID, KoiName, Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Video }
            updatedKoi.Video = videoURL;
            if (isCreating) {
                setModalKoi(prev => ({ ...prev, Video: videoURL }));
                form.setFieldsValue({ Video: videoURL });
                const vidobj = {
                    uid: '-1',
                    name: videoURL,
                    status: 'done',
                    url: videoURL,
                }
                setVideoList([]);
                setVideoList(videoURL);
            }
            else {
                try {
                    const reponse = await axiosInstance.put(`manager/manage-koi/updateKoi/${modalKoi._id}`, updatedKoi);
                    console.log(reponse)
                    message.success(`${file.name} uploaded successfully`);
                    // setTrigger(trigger + 1);
                    Refreshing();

                } catch (error) {
                    console.error('Error uploading video:', error);
                    message.error('Video upload failed');
                }
            }


            message.success(`${file.name} uploaded successfully`);
        } catch (error) {
            console.error('Error uploading video:', error);
            message.error('Video upload failed');
        }
        finally {
            setIsLoading(false);
        }

    };
    const KoiStatusMap = {
        0: 'Hết Hàng',
        1: 'Nhập Khẩu',
        2: 'F1',
        3: 'Việt',
        4: 'Ký Gửi',
    };

    const handleEditClick = (koi) => {
        // koi.Price = koi.Price.toLocaleString();
        setModalKoi(koi);
        console.log(koi);
        setIsCreating(false);
        setIsModalVisible(true);
        form.setFieldsValue(koi);
    };

    const handleCreateClick = (category) => {
        console.log(category)
        form.resetFields();
        form.setFieldsValue({ CategoryID: category._id });
        console.log(form.getFieldsValue());
        setModalKoi({ CategoryID: category._id });
        console.log(modalKoi);
        setIsModalVisible(true);
        setIsCreating(true);

    };
    const BREEDMAPTOSTATUS = {
        'Nhat': 1,
        'Viet': 3,
        'F1': 2
    }
    const [form] = Form.useForm();
    const beforeSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log(values);
            handleModalSubmit(values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
        // const formValues = await form.validateFields(); 

        // await handleModalSubmit(formValues);

    };

    const handleModalSubmit = async (values) => {

        if (isCreating) {
            try {
                setIsLoading(true);
                console.log(values);
                console.log(imgList);
                console.log(videoList);
                let theDATA = { ...values, Image: imgList, Video: videoList };
                const breedValue = values.Breed;
                const KOISTATUS = BREEDMAPTOSTATUS[breedValue];
                console.log(KOISTATUS + ' ' + breedValue);
                console.log(theDATA);
                theDATA = { ...theDATA, Status: KOISTATUS };
                console.log(theDATA);
                const reponse = await axiosInstance.post('/manager/manage-koi/create-new-koi', theDATA);
                message.success('Create Koi Success');
                console.log(reponse);
                setImgList(null);
                setVideoList(null);
            } catch (error) {
                console.log(error.response)
                message.error('Create Koi Failed Reason is' + error.response.data.message);
            } finally {
                setIsLoading(false);
                Refreshing();
                resetLeModal();
            }
        } else {

            try {
                setIsLoading(true);
                // const breedValue = values.Breed;
                // const KOISTATUS = BREEDMAPTOSTATUS[breedValue];
                // values = { ...values, Status: KOISTATUS };
                console.log(values);
                const reponse = await axiosInstance.put(`/manager/manage-koi/updateKoi/${modalKoi._id}`, values);
                message.success('Update Koi Success');
                console.log(reponse);
            } catch (error) {
                console.log(error)
                console.log(error.response)
                message.error('Update Koi Failed Reason is' + error.response.data.message);
            } finally {
                setIsLoading(false);
                Refreshing();
                resetLeModal();

            }

        }
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: '20px', background: '#f0f2f5' }}>
            <Typography.Title level={2}>
                Quản Lý Koi
            </Typography.Title>
            {filteredCategories.map((category) => {
                const koiItems = result.filter(koi => koi.CategoryID === category._id);

                return (
                    <div key={category._id} style={{ marginBottom: '20px', padding: '20px', background: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                            <Col>
                                <Typography.Title level={4} style={{ display: 'inline-block', marginRight: '10px' }}>
                                    {category.CategoryName}
                                </Typography.Title>
                                <Badge count={koiItems.length} showZero style={{ backgroundColor: '#52c41a' }} />
                            </Col>
                            <Col>
                                <Space>
                                    <Button icon={<PlusCircleFilled />} onClick={() => handleCreateClick(category)} style={{ borderColor: '#b7eb8f', color: '#389e0d' }}>Tạo Koi Mới</Button>
                                </Space>
                            </Col>
                        </Row>

                        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px' }}>
                            {koiItems.length > 0 ? (
                                koiItems.map((koi) => (
                                    <Card key={koi._id} hoverable style={{ minWidth: 360, background: '#fafafa' }} cover={<Image alt="Koi" src={koi.Image || 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='} style={{ maxHeight: '180px', objectFit: 'cover' }} />}>
                                        <Card.Meta title={koi.KoiName} description={` Trạng Thái : ${KoiStatusMap[koi.Status]}`} />
                                        <div style={{ marginTop: '10px' }}>
                                            <Button icon={<EditOutlined />} onClick={() => handleEditClick(koi)} style={{ marginRight: '8px' }}>Chỉnh Sửa</Button>
                                            {koi.Status === 0 ? (
                                                <Button icon={<CheckOutlined />} onClick={() => handleDisableEnable(koi._id, 1)}>Kích Hoạt</Button>
                                            ) : koi.Status === 2 || koi.Status === 3 ? (
                                                <Tooltip title="Koi có nguồn gốc F1 hoặc thuần việt không thể cập nhật">
                                                    <Button danger icon={<StopOutlined />} disabled>Vô Hiệu Hóa</Button>
                                                </Tooltip>
                                            ) : (
                                                <Button danger icon={<StopOutlined />} onClick={() => handleDisableEnable(koi._id)}>Vô Hiệu Hóa</Button>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '20px 0' }}>
                                    <Empty description="Không có Koi nào trong danh mục này" />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            <Modal width={800} title={isCreating ? "Tạo Koi Mới" : "Cập Nhật Koi"} visible={isModalVisible} onCancel={() => resetLeModal()} onOk={beforeSubmit} footer={null}>
                <Form form={form} onFinish={handleModalSubmit} layout="vertical" autoComplete="off">
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        {/* Image Section */}
                        {modalKoi?.Image ? (
                            <Image
                                hoverable
                                src={modalKoi.Image}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                        ) : (
                            <Upload
                                maxCount={1}
                                customRequest={handleImageUpload}
                                showUploadList={false}
                                accept="image/*"
                                fileList={imgList ? [imgList] : []}
                            >
                                <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>
                                    {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div>Nhấn để tải ảnh lên</div>
                                </div>
                            </Upload>
                        )}

                        {/* Video Section */}
                        {modalKoi?.Video ? (
                            <video style={{ display: 'block', maxWidth: '480px', height: '200px' }} controls>
                                <source src={modalKoi.Video} type="video/mp4" />

                            </video>
                        ) : (
                            <Upload
                                customRequest={handleVideoUpload}
                                showUploadList={false}
                                accept="video/*"
                                maxCount={1}
                                fileList={videoList ? [videoList] : []}
                            >
                                <div style={{ width: '480px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>
                                    {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div>Nhấn để tải video lên </div>
                                </div>
                            </Upload>
                        )}
                    </div>


                    {/* <Form.Item
                        label="KOI ID"
                        name="_id"
                        rules={[{ required: true, message: 'KOI ID is required!' }]}>
                        <Input />
                    </Form.Item> */}

                    <Form.Item
                        hidden
                        label="Category ID"
                        name="CategoryID"
                        rules={[{ required: true, message: ' ID Danh Mục cá koi là bắt buộc!' }]}>

                        <Input hidden />
                    </Form.Item>

                    <Form.Item
                        label="Tên Koi"
                        name="KoiName"
                        rules={[{ required: true, message: 'Hãy nhập tên Koi!' }]}>
                        <Input placeholder="Koi Name" />
                    </Form.Item>

                    <Row gutter={16}>
                        {/* <Col span={12}>
                            <Form.Item
                                label="Status"
                                name="Status"
                                rules={[{ required: true, message: 'Please select a Status!' }]}>
                                <Select>
                                    {Object.entries(KoiStatusMap).map(([key, value]) => (
                                        <Select.Option key={key} value={Number(key)}>{value}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        <Col span={6}>
                            <Form.Item
                                label="Tuổi"
                                name="Age"
                                rules={[{ required: true, message: 'Hãy Nhập Tuổi!' }]}>
                                <InputNumber min={1} max={50} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Xuất Xứ"
                                name="Origin"
                                rules={[{ required: true, message: 'Hây nhập xuất xứ Koi!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Giới Tính"
                                name="Gender"
                                rules={[{ required: true, message: 'Hãy chọn giới tính Koi!' }]}>
                                <Select>
                                    <Select.Option value="Male">Đực</Select.Option>
                                    <Select.Option value="Female">Cái</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>



                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label=" Kich Thước (cm)"
                                name="Size"

                                rules={[{ required: true, message: 'Hãy Nhập Kích Thước Koi!', type: 'number', min: 0.00001, max: 200 }]}>
                                <InputNumber min={0} max={200} style={{ width: '100%' }} suffix={'cm'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giống"
                                name="Breed"
                                rules={[{ required: true, message: 'Hãy chọn giống Koi!' }]}>
                                <Select>
                                    <Select.Option value="Nhat"><Typography.Text strong>Nhập Khẩu Nhật</Typography.Text></Select.Option>
                                    <Select.Option value="Viet"><Typography.Text strong>Cá IKOI Việt</Typography.Text></Select.Option>
                                    <Select.Option value="F1"><Typography.Text strong>Cá IKOI F1</Typography.Text></Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Mô Tả"
                        name="Description"
                    >
                        <Input.TextArea rows={2} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item
                                label="Nhập lượng thức ăn (đơn vị g/ngày)"
                                name="DailyFoodAmount"

                                rules={[{ required: true, message: 'lượng thức ăn hàng phải lớn 0 và nhỏ hơn 100', type: 'number', min: 0.001, max: 100 }]}>
                                <InputNumber suffix="g/ngày" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Nhập tỷ lệ lọc (%)"
                                name="FilteringRatio"
                                rules={[{ required: true, message: 'tỉ lệ sàn lọc phải lớn hơn 0 và nhỏ 100 ', type: 'number', min: 0.001, max: 100 }]}>
                                <InputNumber suffix={'%'} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label=" ID Chứng Nhận"
                                name="CertificateID"
                                rules={[{ required: true, message: 'Please input the Certificate ID!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giá"
                                name="Price"
                            >
                                <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} min={1000} style={{ width: '100%' }} suffix={"đ"} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {isCreating ? "Tạo" : "Cập Nhật"}
                        </Button>
                        <Button danger onClick={() => resetLeModal()} style={{ marginLeft: '10px' }}>Hủy</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}