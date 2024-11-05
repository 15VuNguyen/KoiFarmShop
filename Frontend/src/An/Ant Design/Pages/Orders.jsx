import React from 'react';
import { Typography, Table, Button, message, Layout, Space, Tag } from 'antd';
import axiosInstance from '../../Utils/axiosJS';
import { useState, useEffect } from 'react';
import { CheckOutlined, SyncOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import '../Css/GeneralPurpose.css'
import OrderDetail from '../Components/OrderDetail';
import dayjs from 'dayjs';
export default function OrdersNext() {
    const { Header, Content } = Layout;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/manager/manage-order/get-all');
                setOrders(response.data.result);
            } catch (error) {
                message.error("Lỗi khi lấy đơn hàng");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [refreshData]);


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

    const handleViewDetails = (orderId,STATUSs) => {
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
                text ? <Tag color="blue">{text}</Tag> : <Tag color="red">Không có dữ liệu</Tag>
            
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
            render: (text) => new dayjs(text).format('DD/MM/YYYY'),
            sorter: (a, b) => dayjs(a.OrderDate) - dayjs(b.OrderDate)
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => {
              if (status === 1) {
                return <Tag icon={<SyncOutlined spin />} color="success">Đang Giao</Tag>
              }
                if (status === 2) {
                    return <Tag icon={< CheckOutlined  />} color="processing">Giao thành công</Tag>
                }
                else {
                    return <Tag icon={< CheckOutlined  />} color="error">Đã Hủy</Tag>
                }
            }
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleViewDetails(record._id,record.Status)}
                >
                    Xem Chi Tiết Đơn Hàng
                </Button>
            ),
        },
    ];
    return (
        <Layout>
            <Header style={{ background: '#f5f5f5' }}>
                <Typography.Title style={{ textAlign: 'center' }} level={1}>Bảng Điều Khiển Đơn Hàng</Typography.Title>
            </Header>
            <Content className='fix-Table' style={{ padding: '24px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey={(record) => record._id}
                        loading={loading}
                        
                        bordered
                        pagination={{ pageSize: 5 }}
                        l
                    />
                </Space>
                {selectedOrder && (
                    <OrderDetail orderId={selectedOrder} onClose={handleCloseDetails} currentStatus={currentStatus}  />
                )}
            </Content>
        </Layout>
    );
}