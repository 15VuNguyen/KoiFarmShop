import React from 'react';
import { Typography, Table, Button, message, Layout, Space, Tag, Row, Col, Card, Modal,Tooltip } from 'antd';
import axiosInstance from '../../Utils/axiosJS';
import { useState, useEffect } from 'react';
import { CheckOutlined, SyncOutlined, ShoppingCartOutlined, EditFilled, CopyOutlined } from '@ant-design/icons';
import '../Css/GeneralPurpose.css'
import OrderDetail from '../Components/OrderDetail';
import 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import useFetchConsigns from '../../Ant Design/Hooks/useFetchConsigns';

import dayjs from 'dayjs';
export default function OrdersNext() {
    const { Header, Content } = Layout;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const { consigns, Refresher } = useFetchConsigns();
    const [chartData, setChartData] = useState({});
    function countOrdersByDate(orders) {

        const dateCounts = {};

        orders.forEach(order => {

            const date = new Date(order.OrderDate).toISOString().split('T')[0];


            dateCounts[date] = (dateCounts[date] || 0) + 1;
        });


        const sortedDateCounts = Object.entries(dateCounts)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return sortedDateCounts;
    }
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/manager/manage-order/get-all');
                setOrders(response.data.result.reverse());
                let dataChart = countOrdersByDate(response.data.result);
                setChartData(dataChart);
                console.log(dataChart);
            } catch (error) {
                message.error("Lỗi khi lấy đơn hàng");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [refreshData]);
    const hadnleChangeStatus = async (orderId) => {
        Modal.confirm({
            title: 'Thay đổi trạng thái đơn hàng',
            content: 'Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này không?',
            onOk: async () => {
                try {
                    const response = await axiosInstance.patch(`/manager/order/updateOrderStatus/${orderId}`);
                    if (response.status === 200) {
                        message.success('Thay đổi trạng thái thành công');
                        setRefreshData(!refreshData);
                    } else {
                        message.error('Thay đổi trạng thái thất bại');
                    }
                } catch (error) {
                    message.error('Lỗi thay đổi trạng thái');
                    console.log(error);
                }
            },
            onCancel() {
                message.info('Hủy thay đổi trạng thái');
            },
        });
    };

    // const handleChangeStatus = async (orderId) => {
    //     try {
    //         const response = await axiosInstance.patch(`/manager/order/updateOrderStatus/${orderId}`);
    //         if (response.status === 200) {
    //             message.success('Status changed successfully');
    //             setRefreshData(!refreshData);
    //         } else {
    //             message.error('Failed to change status');
    //         }
    //     } catch (error) {
    //         message.error("Error updating status");
    //     }
    // };
    const handleSavedToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        message.success('Đã sao chép mã người dùng vào clipboard');
    };
    const lineData = {
        labels: Object.values(chartData).map((item) => dayjs(item.date).format('DD/MM/YYYY')),
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: Object.values(chartData).map((item) => item.count),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };
    const handleViewDetails = (orderId, STATUSs) => {
        setSelectedOrder(orderId);
        setCurrentStatus(STATUSs);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };
    const columns = [
        {
            title: 'Mã Người Dùng',
            dataIndex: 'UserID',
            key: 'UserID',
            render: (text) =>
                text ?<Tooltip
                title="Ấn vào đây để sao chép mã người dùng"
                > <Tag
                    icon={<CopyOutlined />}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSavedToClipboard(text)}
                    color="blue">{text}</Tag></Tooltip> : <Tag color="red">Không có dữ liệu</Tag>

        },
        {
            title: 'Địa Chỉ Giao Hàng',
            dataIndex: 'ShipAddress',
            key: 'ShipAddress',
            render: (text) => text ? text : <Tag color="red">Không có dữ liệu</Tag>
        },
        {
            title: 'Ngày Đặt Hàng',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render: (text) => new dayjs(text).format('DD/MM/YYYY:HH:mm'),
            sorter: (a, b) => dayjs(a.OrderDate) - dayjs(b.OrderDate)
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => {
                if (status === 1) {
                    return <Tag icon={< SyncOutlined spin />} color="processing">Đang Chờ Thanh Toán</Tag>
                }
                if (status === 2) {
                    return <Tag icon={< CheckOutlined />} color="green">Đã Thanh Toán</Tag>
                }
                else {
                    return <Tag icon={< CheckOutlined />} color="error">Đã Hủy</Tag>
                }
            }
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleViewDetails(record._id, record.Status)}
                    >
                        Xem Chi Tiết Đơn Hàng
                    </Button>
                    <Tooltip title="Không thể thay đổi trạng thái đơn hàng đã thanh toán"
                       trigger={
                            record.Status === 2 ? 'hover' : ''

                       }
                    >
                    <Button
                        icon={<EditFilled />}
                        type="primary"
                        disabled={record.Status === 2}
                        onClick={() => hadnleChangeStatus(record._id)}
                    >
                        Thay Đổi Trạng Thái Đơn Hàng

                    </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <Layout>
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Bảng Điều Khiển Đơn Hàng</Typography.Title>
            </Header>
            <Content className='fix-Table' style={{ padding: '24px' }}>
                <Row gutter={[24, 24]} >

                    <Col span={24}>
                        <Card bodyStyle={{ height: '340px', width: '100%' }} title={'Trạng thái đơn hàng theo thời gian'} >
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
                {/* <Space direction="vertical" style={{ width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey={(record) => record._id}
                        loading={loading}
                        
                        bordered
                        pagination={{ pageSize: 5 }}
                        l
                    />
                </Space> */}
                {selectedOrder ? (
                    <Space direction="vertical" style={{ width: '100%', marginTop: '3rem' }}><OrderDetail orderId={selectedOrder} onClose={handleCloseDetails} currentStatus={currentStatus} /> </Space>
                ) : <Space direction="vertical" style={{ width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey={(record) => record._id}
                        loading={loading}

                        bordered
                        pagination={{ pageSize: 15 }}
                        l
                    />
                </Space>}

            </Content>
        </Layout>
    );
}