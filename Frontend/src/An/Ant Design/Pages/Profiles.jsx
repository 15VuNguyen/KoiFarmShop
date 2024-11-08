import React from 'react'
import { Typography, Card, Statistic, Row, Col, Layout, Form, Input, Space, Dropdown, Tabs, Button, message, Badge } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DownOutlined, BorderBottomOutlined } from '@ant-design/icons';
import '../Css/GeneralPurpose.css'
import InvoiceChartModal from '../Components/Modal/InvoiceChartModal';
import useFetchProfiles from '../../Ant Design/Hooks/useFetchProfiles';
import ProfileTable from '../Components/Table/ProfileTable';
import { SearchOutlined } from '@ant-design/icons';
import ProfileModal from '../Components/Modal/ProfileModal';
import axiosInstance from '../../Utils/axiosJS';

export default function Profiles() {
  const { Header, Content } = Layout;
  const [activeTab, setActiveTab] = React.useState('1');
  const [openChartModal, setOpenChartModal] = React.useState(false)
  const [ChartDATA, setChartData] = React.useState({});
  const { profiles, UserChangesIn7DaysPercent, totalVerified, totalCustomers, totalStaff, totalManager, refreshData } = useFetchProfiles();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState(null);
  const [whatIs, setTellMeWhatIs] = React.useState('');
  const handleOpenUpChartModal = () => {
    const howManyCreateEachDate = profiles.reduce((acc, cur) => {
      const date = new Date(cur.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }
      , {});
   
      setTellMeWhatIs('Profile');
    setChartData(howManyCreateEachDate);
    console.log(ChartDATA);
    setOpenChartModal(true);
  }
  const handleOpenUpChartModalWithVerify = () => {
    const filterInvoices = profiles.filter(profile => profile.verify === 1);
    const howManyCreateEachDate = filterInvoices.reduce((acc, cur) => {
      const date = new Date(cur.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }
      , {});
    setTellMeWhatIs('Profile_Verified');  
    setChartData(howManyCreateEachDate);
    console.log(ChartDATA);
    setOpenChartModal(true);
  } 
  const handleCancelChartModal = () => {
    setOpenChartModal(false);
  } 
  const getFilteredProfiles = () => {
    switch (activeTab) {
      case '1':
        return profiles;
      case '2':
        return profiles.filter(profile => profile.verify);
      case '3':
        return profiles.filter(profile => profile.roleid == '3'); 
      default:
        return profiles;
    }
  };

  const filteredProfiles = getFilteredProfiles();

  const userChangePercent = parseFloat(UserChangesIn7DaysPercent());
  const isPositiveChange = userChangePercent > 0;
  const Tab = [
    {
      key: '1',
      label: (
        <>
          Tất Cả Hồ Sơ
          <Badge count={profiles.length} showZero style={{ marginLeft: 8 }} color='green'  />
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          Người Dùng Đã Xác Minh
          <Badge count={totalVerified()} showZero style={{ marginLeft: 8 }} color='green' />
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          Quản Lý
          <Badge count={totalManager()} style={{ marginLeft: 8 }} color='green' />
        </>
      ),
    }
  ];
  const handleSearch = (value) => {
    setSearchTerm(value.target.value);
    console.log('Tìm kiếm:', searchTerm);
  };
  const handleActionClick = async (actionType, id, messageInfo, SelfView) => {
    if (actionType === 'update') {
      setIsModalVisible(true);
      setSelectedProfile(id);
      message.info(`Đã kích hoạt hành động cập nhật cho ID: ${id}`);
    } else if (actionType === 'disable') {
      message.warning(`Đã kích hoạt hành động vô hiệu hóa cho ID: ${id}`);
    }
    else if (actionType === 'disable/enable') {
      const response = await axiosInstance.post('manager/manage-user/disable-enable/' + id);
      if (response.data.result.success) {
        if (messageInfo === 'disable') {
          message.success('Vô hiệu hóa thành công');
          refreshData();
        } else {
          message.success('Kích hoạt thành công');
          refreshData();
        }
      } else {
        message.error('Vô hiệu hóa/Kích hoạt thất bại');
      }
    }
    else if (actionType === 'close') {
      setIsModalVisible(false);
    }
  }

  return (
    <Layout >
      <InvoiceChartModal visible={openChartModal} onClose={ handleCancelChartModal}  data={ChartDATA} whichType={whatIs}  />
      <ProfileModal actions={isModalVisible} setactions={setIsModalVisible} id={selectedProfile} />
      <Header style={{ background: '#f5f5f5' }}>
        <Typography.Title style={{ textAlign: 'center' }} level={1}>Bảng Điều Khiển Hồ Sơ</Typography.Title>
      </Header>
      <Content style={{ padding: '24px' }}>

        <Row gutter={24}>

          <Col span={6}>
            <Card hoverable
              style={{ height: "100%" }}
            >
              <Statistic
                title={<Typography.Title level={4}>Tổng Khách Hàng Hoạt Động</Typography.Title>}
                value={totalCustomers()}
                precision={0}
              />
            </Card>
          </Col>


          <Col span={6}>
            <Card hoverable 
              style={{ height: "100%" }}
              onClick={handleOpenUpChartModalWithVerify}
              >
              <Statistic
                title={<Typography.Title level={4}>Tổng Khách Hàng Đã Xác Minh</Typography.Title>}
                value={totalVerified()}
                precision={0}
              />
            </Card>
          </Col>


          <Col span={6}>
            <Card hoverable
              onClick={handleOpenUpChartModal}
            >
              <Statistic
                title={<Typography.Title level={4}>Thay Đổi Người Dùng Trong 7 Ngày Qua</Typography.Title>}
                value={userChangePercent + '%'}
                precision={2}
                valueStyle={{ color: isPositiveChange ? '#3f8600' : '#cf1322' }}
                prefix={isPositiveChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              />
            </Card>
          </Col>
        </Row>


        <Row gutter={6} style={{ marginTop: '2rem' }} className='Black-Strip'>




          <Col span={12}>

            <Space align='center' style={{ paddingLeft: '3rem' }} >
              <Tabs
                defaultActiveKey="1"
                items={Tab}
                size='large'
                tabBarGutter={78}
                onChange={key => setActiveTab(key)}
              />


            </Space>
          </Col>

        </Row>
        <Layout style={{ background: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 8px rgba(0, 0, 0, 0.1)' }}>

          <Header style={{ background: '#f5f5f5', borderBottom: '1px solid #d9d9d9', padding: '20px', borderRadius: '12px 12px 0 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px #bfbfbf solid ' }}>

          </Header>


          <Content className='fix-Table' style={{ border: '1px #bfbfbf solid ', padding: '20px', background: '#fff', borderRadius: '0 0 12px 12px' }}>

            <ProfileTable data={filteredProfiles} handleActionClick={handleActionClick} Search={searchTerm} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
} 
