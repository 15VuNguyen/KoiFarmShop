import React from 'react'
import { Typography, Card, Statistic, Row, Col, Layout, Space, Tabs, Button, message, Badge } from 'antd';
import '../Css/GeneralPurpose.css'
import useFetchConsigns from '../../Ant Design/Hooks/useFetchConsigns';
import ConsignDetail from '../Components/ConsignDetail';
import ConsignTable from '../Components/Table/ConsignTable';
import 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
export default function Profiles() {
    const { Header, Content } = Layout;
    const [activeTab, setActiveTab] = React.useState('1');

    const {consigns,Refresher} = useFetchConsigns();
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
    const doughnutData = {
        labels: [ "Đã Hủy", "Yêu Cầu Ký Gửi", "Đang kiểm tra Koi", "Đang thương thảo hợp đồng", "Đang tìm người mua", "Đã bán"],
        datasets: [{
            data: [
                consigns.filter(consign => consign.State === -1).length,
                consigns.filter(consign => consign.State === 1).length,
                consigns.filter(consign => consign.State === 2).length,
                consigns.filter(consign => consign.State === 3).length,
                consigns.filter(consign => consign.State === 4).length,
                consigns.filter(consign => consign.State === 5).length,
            ],
            backgroundColor: ["#ff0000", "#91caff", "#b7eb8f", "#ffd591", "#d3adf7", "#ffa39e"],
            hoverOffset: 4,
        }]
    };
    const howManyStateCorpondeToEachDATES = (acc, cur) => {
        const date = new Date(cur.ConsignCreateDate).toLocaleDateString();
        const state = cur.State;

      
        if (!acc[date]) {
            acc[date] = {};
        }

    
        acc[date][state] = (acc[date][state] || 0) + 1;

        return acc;
    }


    const aggregatedData = consigns.reduce(howManyStateCorpondeToEachDATES, {});
    console.log(aggregatedData);
    const sortedDates = Object.keys(aggregatedData)
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => a - b)
        .map(dateObj => dateObj.toLocaleDateString());

    
    const lineData = {
        labels: sortedDates, 
        datasets: [
            {
                label:"Đã Hủy",
                data: sortedDates.map(date => aggregatedData[date]?.[-1] || 0),
                borderColor: "#ff0000",
                fill: false,
                tension: 0.3,


            },
            {
                label: 'Yêu Cầu Ký Gửi',
                data: sortedDates.map(date => aggregatedData[date]?.[1] || 0),
                borderColor: "#91caff",
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Đang Kiểm Tra Koi',
                data: sortedDates.map(date => aggregatedData[date]?.[2] || 0),
                borderColor: "#b7eb8f",
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Đang Thương Thảo Hơp Đồng',
                data: sortedDates.map(date => aggregatedData[date]?.[3] || 0),
                borderColor: "#ffd591",
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Đang Tìm Người Mua',    
                data: sortedDates.map(date => aggregatedData[date]?.[4] || 0),
                borderColor: "#d3adf7",
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Đã Bán Thành Công',
                data: sortedDates.map(date => aggregatedData[date]?.[5] || 0),
                borderColor: "#ffa39e",
                fill: false,
                tension: 0.3,
            },
        ]
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
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                
                labels: {
                    boxWidth: 12,
                    padding: 10,
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
        layout: {
            padding: 20,
        },
    };



    return (
        <Layout>
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Quản lý đơn ký gửi</Typography.Title>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Row style={{ paddingLeft: '3rem' }} gutter={[24, 24]} >
                    <Col style={{ padding: '0' }} span={10}>
                        <Card bodyStyle={{ height: '340px' }} title={'Thống kê trạng thái'} >
                            {/* <Card.Grid hoverable={false} style={{ width: '60%', height: '100%' }}> */}
                                <Doughnut data={doughnutData}
                                    options={chartOptions}
                                />
                            {/* </Card.Grid> */}
                            {/* <Card.Grid hoverable={false} style={{ width: '40%', height: '100%', overflowY: 'auto' }}>
                                <Space size={'large'} direction='vertical' style={{ overflow: 'hidden' }} >
                                    <Statistic title='Tổng số ký gửi' value={consigns.length} />
                                    <Statistic title='Đang chờ' value={consigns.filter(consign => consign.State === 1).length} />
                                    <Statistic title='Đang kiểm tra' value={consigns.filter(consign => consign.State === 2).length} />
                                    <Statistic title='Đang thương thảo' value={consigns.filter(consign => consign.State === 3).length} />
                                    <Statistic title='Đang tìm mua' value={consigns.filter(consign => consign.State === 4).length} />
                                    <Statistic title='Đã bán' value={consigns.filter(consign => consign.State === 5).length} />
                                </Space>
                            </Card.Grid> */}
                        </Card>
                    </Col>
                    <Col span={14}>
                        <Card bodyStyle={{ height: '340px',width:'100%' }} title={'Trạng thái đơn ký gửi theo thời gian'} >
                            <Line data={lineData}
                                options={
                                    {
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }
                                }
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Space align='center' style={{ paddingLeft: '3rem', marginTop: '3rem', marginBottom:'1rem' }} wrap='true' >
                        {
                            isCheckingDetail ? <Button type='primary' onClick={() => setIsCheckingDetail(false)}>Quay Trở Lại</Button> : <Tabs
                                defaultActiveKey="1"
                                items={Tab}
                                size='small'
                                tabBarGutter={42}
                                onChange={key => setActiveTab(key)}
                            />
                        }
                    </Space>
                </Row>
                <Layout style={{ background: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Header style={{ background: '#f5f5f5', borderBottom: '1px solid #d9d9d9', padding: '20px', borderRadius: '12px 12px 0 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px #bfbfbf solid ' }}>
                    </Header>
                    <Content className='fix-Table' style={{ border: '1px #bfbfbf solid ', padding: '20px', background: '#fff', borderRadius: '0 0 12px 12px' }}>
                        {isCheckingDetail ?
                            <ConsignDetail reset={Refresher} consignID={consignDetail} /> : <ConsignTable data={filteredConsignes} handleActionClick={handleActionClick} />
                        }
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}
