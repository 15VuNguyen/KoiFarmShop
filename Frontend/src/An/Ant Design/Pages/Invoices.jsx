import React from 'react';
import { Typography, Card, Statistic, Row, Col, Layout, Button, Tabs, Badge, Space, Modal, Form, Input, Select, InputNumber, message, Upload, DatePicker, Tooltip, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined, ReloadOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import InvoiceTable from '../Components/Table/InvoiceTable';
import '../Css/GeneralPurpose.css';
import useFetchInvoices from "../Hooks/useFetchInvoices";
import axiosInstance from '../../Utils/axiosJS';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { sizeValidator, priceValidator, discountValidator } from '../Utils/Validator';
import InvoiceChartModal from '../Components/Modal/InvoiceChartModal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export default function Invoices() {
  const [imageLoading, setImageLoading] = React.useState(false);
  const [videoLoading, setVideoLoading] = React.useState(false);

  const { Header, Content } = Layout;
  const [activeTab, setActiveTab] = React.useState('1');
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [Catagory, setCatagory] = React.useState([]);
  const [Supplier, setSupplier] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);
  const [imageList, setImageList] = React.useState([]);
  const [videoList, setVideoList] = React.useState([]);
  const [video, setVideo] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [videoUrl, setVideoUrl] = React.useState('');
  const [openChartModal, setOpenChartModal] = React.useState(false)
  const [ChartDATA, setChartData] = React.useState({})
  const [recivedOrerPrecentChanges, setRecivedOrerPrecentChanges] = React.useState(0)
  const [soldOutPrecentChanges, setSoldOutPrecentChanges] = React.useState(0)
  const [totalInvocesPrecentChanges, setTotalInvocesPrecentChanges] = React.useState(0)
    ;
    const [tellMeWhatIs, setTellMeWhatIs] = React.useState('')
  React.useEffect(() => {
    console.log(isUpdate);
  }, [isUpdate]);
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
  const [refreshData, setRefreshData] = React.useState(false);
  React.useEffect(() => {
    const fetchCatagory = async () => {
      setLoading(true);
      try {
        Promise.all([
          axiosInstance.get('getAllKoi'),
          axiosInstance.get('manager/manage-supplier/get-all'),
          axiosInstance.get("manager/manage-invoice/get-all")
        ]).then(([Catresponse, SupResponse, InReponse]) => {
          const { categoryList } = Catresponse.data;
          const supplierList = SupResponse.data.result;
          const invoiceList = InReponse.data.invoices;
          setSupplier(supplierList);
          setCatagory(categoryList);
          setInvoices(invoiceList.reverse());
        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCatagory();
  }, [refreshData]);
  React.useEffect(() => {
    function calculateOrderPercentChanges(invoices) {

      const today = new Date();
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

      // Filter invoices from the last 7 days
      const recentInvoices = invoices.filter(invoice => new Date(invoice.InvoiceDate) > lastWeek);


      const totalRecentInvoices = recentInvoices.length;
      const receivedOrders = recentInvoices.filter(invoice => invoice.Status === 1).length;
      const soldOutOrders = recentInvoices.filter(invoice => invoice.Status === 2).length;


      if (totalRecentInvoices === 0) return { receivedOrderPercentChange: '0.00', soldOutPercentChange: '0.00' };


      const receivedOrderPercentChange = ((receivedOrders / totalRecentInvoices) * 100).toFixed(2);
      const soldOutPercentChange = ((soldOutOrders / totalRecentInvoices) * 100).toFixed(2);
      const totalInvocesPercentChange = ((totalRecentInvoices / totalRecentInvoices) * 100).toFixed(2);
      return { receivedOrderPercentChange, soldOutPercentChange, totalInvocesPercentChange };
    }
    setRecivedOrerPrecentChanges(calculateOrderPercentChanges(invoices).receivedOrderPercentChange);
    setSoldOutPrecentChanges(calculateOrderPercentChanges(invoices).soldOutPercentChange);
    setTotalInvocesPrecentChanges(calculateOrderPercentChanges(invoices).totalInvocesPercentChange);
  }, [invoices])
  const handleAction = async (record) => {
    try {
      setIsUpdate(true);
      console.log(record);
      const response = await axiosInstance.get(`manager/manage-group-koi/${record.GroupKoiIDInvoice}`);
      const groupKOIDATA = response.data.result;
      const { _id, ...rest } = groupKOIDATA;
      //    console.log(groupKOIDATA);
      const LeALLData = { ...record, ...rest };
      console.log(LeALLData);
      form.setFieldsValue(LeALLData);
      form.setFieldsValue({ InvoiceDate: dayjs(record.InvoiceDate).utc() });


      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  }
  const handleReloading = () => {
    setLoading(true);
    setRefreshData(!refreshData);
  }
  const getFilteredInvoices = () => {
    switch (activeTab) {
      case '1':
        return invoices;
      case '2':
        return invoices.filter(invoice => invoice.Status === 1);
      case '3':
        return invoices.filter(invoice => invoice.Status === 2);
      default:
        return invoices;
    }
  };

  const Tab = [
    {
      key: '1',
      label: (
        <>
        <div className='tab tab-1'>
          Toàn Bộ Hóa Đơn
          <Badge count={invoices.length} style={{ marginLeft: 8 }} showZero color='green' />
          </div>
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <div className='tab tab-2'>
          Hóa Đơn Cho Đơn Hàng Đã Nhận
          <Badge count={invoices.filter(invoice => invoice.Status === 1).length} showZero style={{ marginLeft: 8 }} color='green' />
          </div>
        </>
      ),
    }, {
      key: '3',
      label: (
        <>
          <div className='tab tab-3'>
          Hóa Đơn Cho Đơn Hàng Đã Bán Hết
          <Badge count={invoices.filter(invoice => invoice.Status === 2).length} showZero style={{ marginLeft: 8 }} color='green' />
          </div>
        </>
      ),
    },
  ];
  async function handleUpdating() {
    try {
      let THEREALDATA = {}

      const values = await form.validateFields();

      setLoading(true);

      // const invoiceData = {
      //   ...values,
      //   GroupKoiImage: imageUrl,
      //   GroupKoiVideo: videoUrl
      // };      

      const { SupplierImage, SupplierVideo, ...restValues } = values;
      THEREALDATA = { ...restValues };
      if (imageUrl != '') {
        console.log(imageUrl);
        THEREALDATA = {
          ...restValues,
          GroupKoiImage: imageUrl,

        }

      }
      else if (videoUrl !== '') {

        THEREALDATA = {
          ...restValues,
          GroupKoiVideo: videoUrl
        }


      }

      console.log(THEREALDATA);


      await axiosInstance.put(`manager/manage-invoice/${THEREALDATA._id}`, THEREALDATA);
      message.success('Hóa đơn đã được cập nhật thành công!');
      setIsModalVisible(false);
      setLoading(false);
      setRefreshData(!refreshData);
      setImageUrl('');
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error('Vui lòng kiểm tra lại các trường!');
      setLoading(false);
    }
  }

  function handleAddInvoice() {
    setIsUpdate(false);
    form.resetFields();
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
    setImageUrl('');
    setVideoUrl('');
  }
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    setImageLoading(true);
    try {
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      onSuccess(null, file);
      setImageList([...imageList, downloadURL]);
      form.setFieldsValue({ GroupKoiImage: downloadURL });
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading image:', error);
      onError(error);
      message.error('Image upload failed');
    } finally {
      setImageLoading(false);
    }
  };

  const handleVideoUpload = async ({ file, onSuccess, onError }) => {
    setVideoLoading(true);
    try {
      const videoRef = ref(storage, `videos/${file.name}`);
      await uploadBytes(videoRef, file);
      const downloadURL = await getDownloadURL(videoRef);
      setVideoUrl(downloadURL);
      setVideoList([...videoList, downloadURL]);
      onSuccess(null, file);
      message.success(`${file.name} uploaded successfully`);

    } catch (error) {
      console.error('Error uploading video:', error);
      onError(error);
      message.error('Video upload failed');
    } finally {
      setVideoLoading(false);
    }
  };
  const handleOpenUpChartModal = () => {
    const howManyCreateEachDate = invoices.reduce((acc, cur) => {
      const date = new Date(cur.InvoiceDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }
      , {});
    setTellMeWhatIs('');
    setChartData(howManyCreateEachDate);
    console.log(ChartDATA);
    setOpenChartModal(true);
  }
  const handleCancelChartModal = () => {
    setOpenChartModal(false);
  } 
  const handleOpenUpChartModalWithStatus = (Status) => {
      const filterInvoices = invoices.filter(invoice => invoice.Status == Status);
      if (Status == 1) {
        setTellMeWhatIs('Recived')
      }
      else if (Status == 2) {
        setTellMeWhatIs('Sold Out')
      }
      const howManyCreateEachDate = filterInvoices.reduce((acc, cur) => {
        
        const date = new Date(cur.InvoiceDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }
        , {});
        setChartData(howManyCreateEachDate);
        console.log(ChartDATA);
        setOpenChartModal(true);
    }
  const handleOk = async () => {
    try {

      const values = await form.validateFields();
      setLoading(true);
      const invoiceData = {
        ...values,
        GroupKoiImage: imageUrl,
        GroupKoiVideo: videoUrl
      };
      const { SupplierImage, SupplierVideo, ...restValues } = values;
      let THEREALDATA = {
        ...restValues,
        GroupKoiImage: imageUrl,
        GroupKoiVideo: videoUrl
      }
      const breedNhat = 'Nhat'
      THEREALDATA = { ...THEREALDATA, BreedGroupKoi: breedNhat }
      console.log(THEREALDATA);
      await axiosInstance.post('manager/manage-invoice/create-new-invoice-group-koi', THEREALDATA);
      message.success('Hóa đơn đã được tạo thành công!');
      setIsModalVisible(false);
      setLoading(false);
      setRefreshData(!refreshData);
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error('Vui lòng kiểm tra lại các trường!');
      setLoading(false);
    }
  };
  // async function handleOk() {
  //   try {
  //     const values = await form.validateFields();
  //     setLoading(true);

  //     const updatedData = { ...values };

  //     if (values.SupplierImage && values.SupplierImage.file && values.SupplierImage.file.originFileObj) {
  //       const imageFile = values.SupplierImage.file.originFileObj;
  //       const imageRef = ref(storage, `images/${imageFile.name}`);
  //       await uploadBytes(imageRef, imageFile);
  //       const downloadURL = await getDownloadURL(imageRef);
  //       updatedData.SupplierImage = downloadURL;  
  //     }


  //     if (values.SupplierVideo && values.SupplierVideo.file && values.SupplierVideo.file.originFileObj) {
  //       const videoFile = values.SupplierVideo.file.originFileObj;
  //       const videoRef = ref(storage, `videos/${videoFile.name}`);
  //       await uploadBytes(videoRef, videoFile);
  //       const videoURL = await getDownloadURL(videoRef);
  //       updatedData.SupplierVideo = videoURL;  // Add Firebase video URL to form data
  //     }


  //     const response = await axiosInstance.post('manager/manage-invoice/create-new-invoice-group-koi', updatedData);
  //     message.success('Hóa đơn đã được tạo thành công!');
  //     setIsModalVisible(false);
  //     setLoading(false);
  //     setRefreshData(!refreshData);
  //     form.resetFields();
  //   } catch (error) {
  //     message.error('Vui lòng kiểm tra lại các trường!');
  //     console.error('Error:', error);
  //     setLoading(false);
  //   }
  // }


  return (
    <Layout>
      <InvoiceChartModal visible={openChartModal} onClose={handleCancelChartModal} data={ChartDATA} whichType={'Invoice'} tellMeWhatIs={tellMeWhatIs} />
      <Modal
        title={
          isUpdate ? 'Cập nhật hóa đơn' : 'Tạo hóa đơn'
        }
        open={isModalVisible}
        onOk={
          isUpdate ? handleUpdating : handleOk
        }
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item hidden name={'_id'} ></Form.Item>
          <Form.Item
            label="Nhà cung cấp"
            name="SupplierID"
            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
          >
            <Select placeholder="Chọn nhà cung cấp">
              {Supplier.map(supplier => (
                <Select.Option key={supplier._id} value={supplier._id}>
                  {supplier.SupplierName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Nhóm Koi"
            name="GroupKoiCategoryID"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm koi!' }]}
          >
            <Select placeholder="Chọn nhóm koi">
              {Catagory.map(category => (
                <Select.Option key={category._id} value={category._id}>
                  {category.CategoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* {isUpdate && (
            <Form.Item  name="InvoiceDate"
              label={
                <Tooltip title="Ngày hóa đơn phải là hiện tại hoặc quá khứ">
                  Ngày tạo hóa đơn
                </Tooltip>
              }
            >
              <DatePicker

                style={{ width: '100%' }}

                onChange={(date) => form.setFieldsValue({ InvoiceDate: date })}
                form='YYYY-MM-DD'
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>
          )} */}
          <Form.Item
            label="Kích thước"
            name="Dimension"
            rules={[
              { validator: sizeValidator }
            ]}
            hasFeedback
          >
            <InputNumber
              placeholder="Nhập kích thước"
              style={{ width: '100%' }}

            />
          </Form.Item>


          {/* <Form.Item
            label="Giống"
            name="BreedGroupKoi"
            initialValue={'F1'}
            rules={[{ required: true, message: 'Vui lòng nhập giống koi!' }]}
          >
            <Select placeholder="Chọn giống koi">
              <Select.Option value="F1">F1</Select.Option>
              <Select.Option value="Việt">Việt</Select.Option>
              <Select.Option value="Nhật">Nhật</Select.Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            label="Giá mỗi Koi"
            name="PriceOneKoi"
            rules={[
              { required: true, message: 'Vui lòng nhập giá!' },
              { type: 'number', min: 1000, message: 'Giá phải lớn hơn 1000 VND!' },
              { validator: priceValidator }
            ]}
          >
            <InputNumber suffix={'đ'} min={1000} placeholder="Nhập Giá" style={{ width: '100%' }} formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="Quantity"
            initialValue={1}
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng!' },
              { type: 'number', min: 1, message: 'Số lượng phải lớn hơn 1!' },

            ]}
          >
            <InputNumber min={1} placeholder="Nhập số lượng" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Giảm giá (%)"
            name="Discount"
            initialValue={0}
            rules={[
              { required: true, message: 'Vui lòng nhập giảm giá!' },

              { validator: discountValidator }
            ]}
          >
            <InputNumber min={0} max={99} placeholder="Nhập giảm giá" style={{ width: '100%' }} suffix={'%'} />
          </Form.Item>


          <Form.Item
            label="Ảnh nhóm Koi"
            name="SupplierImage"
          // rules={[
          //   {
          //     validator: (_, value) => {
          //       // Check if there is a file in the fileList
          //       if (value && value.fileList.length > 0) {
          //         // Get the file type
          //         const fileType = value.fileList[0].type;

          //         if (!['image/jpeg', 'image/png'].includes(fileType)) {
          //           return Promise.reject(new Error('Vui lòng tải lên hình ảnh định dạng JPEG hoặc PNG!'));
          //         }
          //         return Promise.resolve();
          //       }
          //       return Promise.reject(new Error('Vui lòng tải lên hình ảnh!'));
          //     },
          //   },
          // ]} 
          >
            <Upload
              listType="picture"
              customRequest={handleImageUpload}
              maxCount={1}
              {...(isUpdate && {
                fileList: imageUrl
                  ? [{ url: imageUrl, thumbUrl: imageUrl, name: 'Group Koi Image' }]
                  : [
                    {
                      url: form.getFieldValue('GroupKoiImage'),
                      thumbUrl: form.getFieldValue('GroupKoiImage'),
                      name: 'Group Koi Image',
                    },
                  ],
              })}
            >
              <Button type="primary" icon={<UploadOutlined />} loading={imageLoading}>
                {imageLoading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Video nhóm Koi"
            name="SupplierVideo"
            rules={[]}
          >
            <Upload
              customRequest={handleVideoUpload}
              {...(isUpdate && {
                fileList: videoUrl
                  ? [{ url: videoUrl, thumbUrl: videoUrl, name: 'Group Koi Video' }]
                  : [
                    {
                      url: form.getFieldValue('GroupKoiVideo'),
                      thumbUrl: form.getFieldValue('GroupKoiVideo'),
                      name: 'Group Koi Video',
                    },
                  ],
              })}
            >
              <Button type="primary" icon={<VideoCameraOutlined />} loading={videoLoading}>
                {videoLoading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </Upload>
          </Form.Item>


        </Form>
      </Modal>

      <Header style={{ background: '#f5f5f5' }}></Header>
      <Header style={{ background: '#f5f5f5',marginBottom:'2rem' }}>
        <Typography.Title style={{ textAlign: 'center' }} level={1}>Quản lý hóa đơn nhập khẩu cá KOI</Typography.Title>
      </Header>

      <Content className='fix-Table' style={{ padding: '24px' }}>
        <Row gutter={24}>
          <Col md={8} sm={12} xs={24}>
            <Card hoverable style={{ height: '100%' }} onClick={handleOpenUpChartModal}>
              <Statistic
                title={<Typography.Title level={4}>Tổng số hóa đơn được tạo trong 7 ngày qua</Typography.Title>}
                value={totalInvocesPrecentChanges}
                suffix="%"
                valueStyle={{ color: totalInvocesPrecentChanges > 0 ? '#3f8600' : '#cf1322' }}
                prefix={totalInvocesPrecentChanges > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                precision={0}
              />
            </Card>
          </Col>

          <Col md={8} sm={12} xs={0}>
            <Card hoverable style={{ height: '100%' }}
            onClick={() => handleOpenUpChartModalWithStatus(1)}>  
            
              <Row gutter={16}>

                <Statistic
                  title={<Typography.Title level={4}>Hóa đơn đã nhận trong 7 ngày qua</Typography.Title>}
                  value={recivedOrerPrecentChanges}
                  suffix="%"
                  valueStyle={{ color: recivedOrerPrecentChanges > 0 ? '#3f8600' : '#cf1322' }}
                  prefix={recivedOrerPrecentChanges > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  precision={0}

                />
              </Row>
            </Card>
          </Col>
          <Col md={8} sm={0} xs={0}>
            <Card hoverable style={{ height: '100%' }}
              onClick={() => handleOpenUpChartModalWithStatus(2)}
            >
              <Statistic
                title={<Typography.Title level={4}>Hóa đơn đã bán hết trong 7 ngày qua</Typography.Title>}
                value={soldOutPrecentChanges}
                suffix="%"
                valueStyle={{ color: soldOutPrecentChanges > 0 ? '#3f8600' : '#cf1322' }}
                prefix={soldOutPrecentChanges > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                precision={0}
              />
            </Card>
          </Col>

          {/* <Col span={6}>
            <Card hoverable style={{ height: '100%' }}>
              <Statistic
                title={<Typography.Title level={4}>Tổng số giảm giá</Typography.Title>}
                value={15}
                precision={0}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card hoverable style={{ height: '100%' }}>
              <Statistic
                title={<Typography.Title level={4}>Tổng doanh thu</Typography.Title>}
                value={100000}
                precision={0}
                prefix="₫"
              />
            </Card>
          </Col> */}
        </Row>

        <div style={{ marginTop: '24px' }}>
          <Space>
            <Button type="primary" onClick={handleAddInvoice}>
              Tạo Hóa Đơn Mới
            </Button>
            <Button type="primary" onClick={handleReloading} loading={isLoading} disabled={isLoading} icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined />}>
              Làm mới dữ liệu
            </Button>
          </Space>

          <Tabs
            defaultActiveKey="1"
            items={Tab}
            onChange={setActiveTab}
            style={{ marginTop: '16px' }}
          />
        </div>

        {
          loading ? (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <InvoiceTable data={getFilteredInvoices()} actions={handleAction} />
          )
        }
      </Content>
    </Layout>
  );
}
