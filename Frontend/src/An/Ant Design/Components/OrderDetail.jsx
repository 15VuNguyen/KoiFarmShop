import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Layout, Image, message, Statistic, Row, Col, Card, Divider, Button } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, ArrowLeftOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons';
import axiosInstance from '../../Utils/axiosJS';

// Helper function to format currency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
};

export default function OrderDetail({ orderId, onClose, currentStatus }) {
    const { Content } = Layout;
    const [orderDetail, setOrderDetail] = useState(null);
    const [koiList, setKoiList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderResponse = await axiosInstance.get(`/manager/manage-order/get-order-detail/${orderId}`);
                setOrderDetail(orderResponse.data.orderDetail);

                const koiResponse = await axiosInstance.get('/manager/manage-koi/get-all');
                setKoiList(koiResponse.data.result);
            } catch (error) {
                message.error('Không thể tải chi tiết đơn hàng');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    const getKoiDetails = (koiID) => koiList.find(koi => koi._id === koiID);

    const columns = [
        {
            title: 'Tên Koi',
            dataIndex: 'KoiID',
            key: 'KoiName',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? koi.KoiName ? koi.KoiName : 'N/A' : 'N/A';
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'Quantity',
            key: 'Quantity',
            align: 'center',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'KoiID',
            key: 'Image',
            align: 'center',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? <Image loading="lazy" width={80} src={koi.Image} /> : 'N/A';
            },
        },
        {
            title: 'Giá',
            dataIndex: 'KoiID',
            key: 'Price',
            align: 'right',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? formatCurrency(koi.Price) : 'N/A';
            },
        },
    ];

    return (
        <Layout style={{ background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Content style={{ padding: '24px' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                            <ShoppingCartOutlined size={26} /> 
                            <Typography.Text strong style={{ marginLeft: '8px' }}>Chi tiết đơn hàng</Typography.Text>
                        </Typography.Title>
                    </Col>
                    <Col>
                        <Button type="primary" ghost icon={<ArrowLeftOutlined />} onClick={onClose}>
                            Quay lại
                        </Button>
                    </Col>
                </Row>
                <Divider />
                
                {orderDetail && (
                    <Card hoverable style={{ marginBottom: '24px', borderRadius: '8px' }}>
                        <Row gutter={16} justify="center" align="middle">
                            <Col span={8}>
                                <Statistic
                                    title="Mã đơn hàng"
                                    value={orderDetail._id}
                                    valueStyle={{ color: '#3f8600', fontSize: '16px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Statistic
                                    title="Tổng tiền"
                                    value={orderDetail.TotalPrice}
                                    formatter={(value) => formatCurrency(value)}
                                    valueStyle={{ color: '#15B392', fontSize: '20px', fontWeight: 'bold' }}
                                />
                            </Col>
                                <Col span={8}>
                                    {currentStatus === 1 ? (
                                        <Tag icon={<SyncOutlined spin />} color="success" style={{ padding: '8px 16px', fontSize: '14px' }}>
                                            Đang Giao
                                        </Tag>
                                    ) : currentStatus === 2 ? (
                                        <Tag icon={<CheckOutlined />} color="processing" style={{ padding: '8px 16px', fontSize: '14px' }}>
                                            Giao thành công
                                        </Tag>
                                    ) : (
                                        <Tag color="default" style={{ padding: '8px 16px', fontSize: '14px' }}>
                                            {orderDetail.Status}
                                        </Tag>
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    
                )}

                <Table
                    columns={columns}
                    dataSource={orderDetail ? orderDetail.Items : []}
                    rowKey="KoiID"
                    loading={loading}
                    pagination={false}
                    bordered
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                />
            </Content>
        </Layout>
    );
}
