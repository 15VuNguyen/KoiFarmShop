import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Layout, Image, message, Statistic, Row, Col, Card, Divider,Button } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, ArrowLeftOutlined,SyncOutlined,CheckOutlined  } from '@ant-design/icons';
import axiosInstance from '../../Utils/axiosJS';

export default function OrderDetail({ orderId, onClose,currentStatus }) {
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
                message.error('Failed to fetch order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    const getKoiDetails = (koiID) => koiList.find(koi => koi._id === koiID);

    const columns = [
        {
            title: 'Koi Name',
            dataIndex: 'KoiID',
            key: 'KoiName',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? koi.KoiName : 'N/A';
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            title: 'Image',
            dataIndex: 'KoiID',
            key: 'Image',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? <Image width={80} src={koi.Image} /> : 'N/A';
            },
        },
        {
            title: 'Price',
            dataIndex: 'KoiID',
            key: 'Price',
            render: (koiID) => {
                const koi = getKoiDetails(koiID);
                return koi ? `${koi.Price} VND` : 'N/A';
            },
        },
    ];

    return (
        <Layout style={{ background: '#fff', borderRadius: '8px', padding: '16px' }}>
            <Content style={{ padding: '24px' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Typography.Title level={3}><ShoppingCartOutlined /> Order Details</Typography.Title>
                    </Col>
                    <Col>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={onClose}>
                            Back to Orders
                        </Button>
                    </Col>
                </Row>
                <Divider />
                
                {orderDetail && (
                    <Card style={{ marginBottom: '24px' }}>
                        <Row gutter={16} justify="center" align="middle">
                            <Col span={8}>
                                <Statistic
                                    title="Order ID"
                                    value={orderDetail._id}
                                    valueStyle={{ color: '#3f8600', fontSize: '16px' }}
                               
                                />
                            </Col>
                            <Col span={8}>
                                <Statistic
                                    title="Total Price"
                                    value={orderDetail.TotalPrice}
                                    precision={1}
                                    prefix={<DollarOutlined />}
                                    suffix="VND"
                                    valueStyle={{ color: '#15B392', fontSize: '20px' }}
                                />
                            </Col>
                            <Col span={8}>
                                
                                {
                                    currentStatus == 1 ? <Tag icon={<SyncOutlined spin />} color="success">Đang Giao</Tag> :
                                    currentStatus == 2 ? <Tag icon={<CheckOutlined />} color="processing">Giao thành công</Tag> :
                                    <Tag color="default">{orderDetail.Status}</Tag>
                                }
                                            

                                
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
                />
            </Content>
        </Layout>
    );
}
