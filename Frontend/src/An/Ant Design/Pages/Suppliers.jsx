import React from 'react'
import { Typography, Card, Statistic, Row, Col, Layout, Space, Tabs, message, Badge, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import '../Css/GeneralPurpose.css'
import useFetchProfiles from '../../Ant Design/Hooks/useFetchProfiles';
import SupplierTable from '../Components/Table/SupplierTable';
import useFetchSupplier from '../Hooks/useFetchSupplier';
import axiosInstance from '../../Utils/axiosJS';
export default function Suppliers() {
    const { Header, Content } = Layout;
    const [activeTab, setActiveTab] = React.useState('1');
    const [suppliers, setSuppliers] = React.useState([]);
    const [reset, setReset] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState(null);
    const reseter = () => { setReset(!reset) }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/manager/manage-supplier/get-all');
                setSuppliers(response.data.result);
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
            case '4':
                return suppliers.filter(suppliers => suppliers.Country == 'Trung Quốc');
            default:
                return suppliers;
        }
    };

    const filteredSupplier = getFilteredSuppliers();


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
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Supplier Dashboard</Typography.Title>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card hoverable>
                            <Statistic
                                title={<Typography.Title level={4}>Toàn bộ nhà cung cấp</Typography.Title>}
                                value={suppliers.length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable>
                            <Statistic
                                title={<Typography.Title level={4}>Toàn Bộ Nhà Cung Cấp Nhật Bản</Typography.Title>}
                                value={suppliers.filter(supplier => supplier.Country === 'Nhật' || supplier.Country === 'Nhật Bản').length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable>
                            <Statistic
                                title={<Typography.Title level={4}>Toàn Bộ Nhà Cung Cấp Việt Nam</Typography.Title>}
                                value={suppliers.filter(supplier => supplier.Country == 'Việt Nam').length}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable>
                            <Statistic
                                title={<Typography.Title level={4}>Toàn Bộ Nhà Cung Cấp Trung Quốc</Typography.Title>}
                                value={suppliers.filter(supplier => supplier.Country === ' Trung Quốc').length}
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
