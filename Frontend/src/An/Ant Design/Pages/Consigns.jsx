import React from 'react'
import { Typography, Card, Statistic, Row, Col, Layout, Space, Tabs, Button, message, Badge } from 'antd';
import '../Css/GeneralPurpose.css'
import useFetchConsigns from '../../Ant Design/Hooks/useFetchConsigns';
import ConsignDetail from '../Components/ConsignDetail';
import ConsignTable from '../Components/Table/ConsignTable';

export default function Profiles() {
    const { Header, Content } = Layout;
    const [activeTab, setActiveTab] = React.useState('1');

    const consigns = useFetchConsigns();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState(null);
    const [isCheckingDetail, setIsCheckingDetail] = React.useState(false);
    const [consignDetail, setConsignDetail] = React.useState(null);

    const getFilteredConsign = () => {
        switch (activeTab) {
            case '1':
                return consigns;
            case '2':
                return consigns.filter(consign => consign.State == '1');
            case '3':
                return consigns.filter(consign => consign.State == '2');
            case '4':
                return consigns.filter(consign => consign.State == '3');
            case '5':
                return consigns.filter(consign => consign.State == '4');
            case '6':
                return consigns.filter(consign => consign.State == '5');
            default:
                return consigns;
        }
    };

    const filteredConsignes = getFilteredConsign();

    const Tab = [
        {
            key: '1',
            label: (
                <>
                    Toàn Bộ  Ký Gửi
                    <Badge count={consigns.length} style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    Yêu cầu ký gửi
                    <Badge count={consigns.filter(consign => consign.State == 1).length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    Đang kiểm tra Koi
                    <Badge count={consigns.filter(consign => consign.State == 2).length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        },
        {
            key: '4',
            label: (
                <>
                    Đang thương thảo hợp đồng
                    <Badge count={consigns.filter(consign => consign.State == 3).length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        }, {
            key: '5',
            label: (
                <>
                    Đang tìm người mua
                    <Badge count={consigns.filter(consign => consign.State == 4).length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        }, {
            key: '6',
            label: (
                <>
                    Đã bán thành công
                    <Badge count={consigns.filter(consign => consign.State == 5).length} showZero style={{ marginLeft: 8 }} color='green' />
                </>
            ),
        }
    ];

    const handleActionClick = (actionType, id) => {
        if (actionType === 'update') {
            setIsModalVisible(true);
            setSelectedProfile(id);
            message.info(`Update action triggered for ID: ${id}`);
        } else if (actionType === 'disable') {
            message.warning(`Disable action triggered for ID: ${id}`);
        } else if (actionType === 'View Consign Details') {
            message.success(`Enable action triggered for ID: ${id}`);
            setConsignDetail(id);
            setIsCheckingDetail(true);
        }
    };

    return (
        <Layout>
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Quản Lý Ký Gửi</Typography.Title>
            </Header>
            <Content style={{ padding: '24px' }}>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số ký gửi</Typography.Title>}
                            value={consigns.length}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số yêu cầu ký gửi</Typography.Title>}
                            value={consigns.filter(consign => consign.State === 1).length}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số ký gửi đang kiểm tra</Typography.Title>}
                            value={consigns.filter(consign => consign.State === 2).length}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số ký gửi đang thương thảo hợp đồng</Typography.Title>}
                            value={consigns.filter(consign => consign.State === 3).length}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số ký gửi đang tìm người mua</Typography.Title>}
                            value={consigns.filter(consign => consign.State === 4).length}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ height: "100%" }}>
                        <Statistic
                            title={<Typography.Title level={4}>Tổng số ký gửi đã bán thành công</Typography.Title>}
                            value={consigns.filter(consign => consign.State === 5).length}
                            precision={0}
                        />
                    </Card>
                </Col>
            </Row>
                <Row gutter={6} style={{ marginTop: '2rem' }} className='Black-Strip'>
                    <Col span={12}>
                        <Space align='center' style={{ paddingLeft: '3rem' }} wrap='true' >
                            {
                                isCheckingDetail ? <Button type='primary' onClick={() => setIsCheckingDetail(false)}>Go Back</Button> : <Tabs
                                    defaultActiveKey="1"
                                    items={Tab}
                                    size='small'
                                    tabBarGutter={42}
                                    onChange={key => setActiveTab(key)}
                                />
                            }
                        </Space>
                    </Col>
                </Row>
                <Layout style={{ background: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Header style={{ background: '#f5f5f5', borderBottom: '1px solid #d9d9d9', padding: '20px', borderRadius: '12px 12px 0 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px #bfbfbf solid ' }}>
                    </Header>
                    <Content className='fix-Table' style={{ border: '1px #bfbfbf solid ', padding: '20px', background: '#fff', borderRadius: '0 0 12px 12px' }}>
                        {isCheckingDetail ?
                            <ConsignDetail consignID={consignDetail} /> : <ConsignTable data={filteredConsignes} handleActionClick={handleActionClick} />
                        }
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}
