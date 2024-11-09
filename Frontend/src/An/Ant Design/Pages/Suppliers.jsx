import React from 'react'
import { Typography, Card, Statistic, Row, Col, Layout, Space, Tabs, message, Badge, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import '../Css/GeneralPurpose.css'
import useFetchProfiles from '../../Ant Design/Hooks/useFetchProfiles';
import SupplierTable from '../Components/Table/SupplierTable';
import useFetchSupplier from '../Hooks/useFetchSupplier';
import axiosInstance from '../../Utils/axiosJS';
import InvoiceChartModal from '../Components/Modal/InvoiceChartModal';
export default function Suppliers() {
    const { Header, Content } = Layout;
    const [activeTab, setActiveTab] = React.useState('1');
    const [suppliers, setSuppliers] = React.useState([]);
    const [reset, setReset] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState(null);
    const [whatIs, setTellMeWhatIs] = React.useState('');
    const [ChartDATA, setChartData] = React.useState({});
  const [openChartModal, setOpenChartModal] = React.useState(false)
    const reseter = () => { setReset(!reset) }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/manager/manage-supplier/get-all');
                let reverseArray = response.data.result.reverse();
                setSuppliers(reverseArray);
                console.log(response.data.result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [reset])
    const getFilteredSuppliers = () => {
        switch (activeTab) {
            case '1':
                return suppliers;
            case '2':
                return suppliers.filter(suppliers => suppliers.Country === 'Nhật' || suppliers.Country === 'Nhật Bản');
            case '3':
                return suppliers.filter(suppliers => suppliers.Country == 'Việt Nam');
            default:
                return suppliers;
        }
    };
    const handleOpenUpChartModalWithCountry = (Status) => {
        const filterInvoices = suppliers.filter(supplier => supplier.Country === Status); 
        console.log(filterInvoices);
        if (Status === "Nhật" || Status === "Nhật Bản") {
          setTellMeWhatIs('Nhật Bản')
        }
        else if (Status === "Việt Nam") {
          setTellMeWhatIs('Việt Nam')
        }
        const howManyCreateEachDate = filterInvoices.reduce((acc, cur) => {
          
          const date = new Date(cur.SupplierCreateDate).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }
          , {});
          
          setChartData(howManyCreateEachDate);
          console.log(ChartDATA);
          setOpenChartModal(true);
      }
    const filteredSupplier = getFilteredSuppliers();
    const handleOpenUpChartModal = () => {
        const howManyCreateEachDate = suppliers.reduce((acc, cur) => {
          const date = new Date(cur.SupplierCreateDate).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
      }
      , {});
      setTellMeWhatIs('');
      setChartData(howManyCreateEachDate);
      console.log(ChartDATA);
      setOpenChartModal(true);
      }
      const handleCancel = () => {
        setOpenChartModal(false);
        }
    const Tab = [
        {
            key: '1',
            label: (
                <>
                    Toàn Bộ Nhà Cung Cấp
                    <Badge count={suppliers.length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    Nhà Cung Cấp ở Nhật
                    <Badge count={suppliers.filter(supplier => supplier.Country === 'Nhật' || supplier.Country === 'Nhật Bản').length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    Nhà Cung Cấp ở Việt Nam
                    <Badge count={suppliers.filter(supplier => supplier.Country == 'Việt Nam').length} style={{ marginLeft: 8 }} showZero color='green' />
                </>
            ),
        }
    ];
    const handleSearch = (value) => {
        setSearchTerm(value.target.value);
        console.log('Search:', searchTerm);
    };
    // const handleActionClick = (actionType, id) => {
    //     if (actionType === 'update') {
    //         setIsModalVisible(true);
    //         setSelectedProfile(id);
    //         message.info(`Update action triggered for ID: ${id}`);
    //     } else if (actionType === 'disable') {
    //         message.warning(`Disable action triggered for ID: ${id}`);
    //     }
    // };
    const handleCreate = () => {
        setIsCreating(true);

    };
    return (
        <Layout >
            <InvoiceChartModal visible={openChartModal} onClose={handleCancel} data={ChartDATA} whichType='Supplier' tellMeWhatIs={whatIs} />
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Quản lý thông tin nhà cung cấp cá KOI</Typography.Title>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card hoverable
                            
                            onClick={handleOpenUpChartModal}
                            style={{ height:'100%' }}
                        >
                            <Statistic
                                title={<Typography.Title level={4}>Toàn bộ nhà cung cấp</Typography.Title>}
                                value={suppliers.length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable
                            onClick={() => handleOpenUpChartModalWithCountry('Nhật Bản')}
                        >
                            <Statistic
                                title={<Typography.Title level={4}>Toàn Bộ Nhà Cung Cấp Nhật Bản</Typography.Title>}
                                value={suppliers.filter(supplier => supplier.Country === 'Nhật' || supplier.Country === 'Nhật Bản').length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverabl
                            onClick={() => handleOpenUpChartModalWithCountry('Việt Nam')}
                        >
                            <Statistic
                                title={<Typography.Title level={4}>Toàn Bộ Nhà Cung Cấp Việt Nam</Typography.Title>}
                                value={suppliers.filter(supplier => supplier.Country == 'Việt Nam').length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                
                </Row>
                <Row gutter={6} style={{ marginTop: '2rem' }} className='Black-Strip'>
                    <Col span={12} >
                        <Space align='center' style={{
                            paddingLeft: '3rem',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start'
                        }} wrap >
                            <Tabs
                                defaultActiveKey="1"
                                items={Tab}
                                size='small'
                                tabBarGutter={78}
                                onChange={key => setActiveTab(key)}
                            />
                        </Space>
                    </Col>
                </Row>
                <Layout style={{ background: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Header style={{ background: '#f5f5f5', borderBottom: '1px solid #d9d9d9', padding: '', borderRadius: '12px 12px 0 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px #bfbfbf solid ' }}>
                        <Button onClick={handleCreate} variant='solid' style={{ backgroundColor: '#52c41a', color: 'white' }} >Tạo nhà cung cấp mới</Button>
                    </Header>
                    <Content className='fix-Table' style={{ border: '1px #bfbfbf solid ', padding: '20px', background: '#fff', borderRadius: '0 0 12px 12px' }}>
                        <SupplierTable data={filteredSupplier} showCreate={isCreating} setCreate={setIsCreating} ResetTable={reseter} />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}
