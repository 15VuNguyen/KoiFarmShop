import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Select, Spin, Typography } from 'antd';
import useChartData from '../../Hooks/useChartData';
import GeneralChart from '../../Pages/Charts/GeneralChart';
import ProfileChart from '../../Pages/Charts/ProfileChart';
import OrderChart from '../../Pages/Charts/OrderChart';
import RevunueChart from '../../Pages/Charts/RevunueChart';
import 'chart.js/auto';

const { Title } = Typography;
const { Option } = Select;

export default function Chart() {
    const { chartType } = useParams();
    const {
        profileChartData,
        orderData,
        combineData,
        unFilteredProfileChartData,
        unFilteredorderData,
        unFilteredConsignData,
        consignData,
        filterProfileData,
        filterOrderData,
        filterCombinedData,
        filterRevuenueData,
        filterConsignData,
        RevuenueData,
        RevenuedataSet
        
    } = useChartData();

    const [isLoading, setIsLoading] = useState(false);
    const [filteredProfileData, setFilteredProfileData] = useState(profileChartData);
    const [filteredOrderData, setFilteredOrderData] = useState(orderData);
    const [filteredCombinedData, setFilteredCombinedData] = useState(combineData());
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filterRevuenueDataR, setFilterRevuenueDataR] = useState(RevuenueData);
    const [filterConsignDataR, setFilterConsignDataR] = useState(consignData);
    useEffect(() => {
        setIsLoading(false);
        setFilterRevuenueDataR(RevuenueData);
        setFilteredProfileData(profileChartData);
        setFilteredOrderData(orderData);
        setFilterConsignDataR(consignData);
        setFilteredCombinedData(combineData());
    }, [profileChartData, orderData, RevuenueData,consignData]);

    const handleFilterChange = (filter) => {
        const newProfileData = filterProfileData(filter);
        const newOrderData = filterOrderData(filter);
        const newCombinedData = filterCombinedData(filter);
        const newRevuenueData = filterRevuenueData(filter);
        const newConsignData = filterConsignData(filter);
        setFilterRevuenueDataR(newRevuenueData);
        setFilteredProfileData(newProfileData);
        setFilteredOrderData(newOrderData);
        setFilteredCombinedData(newCombinedData);
        setFilterConsignDataR(newConsignData);
        setSelectedFilter(filter);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>REPORT</Title>
            {isLoading ? (
                <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
            ) : (
                <>
                    <Row justify="center" style={{ marginBottom: '20px' }}>
                        <Select
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            style={{ width: 200 }}
                            placeholder="Filter By"
                        >
                            <Option value="7days">Last 7 Days</Option>
                            <Option value="month">This Month</Option>
                            <Option value="year">This Year</Option>
                            <Option value="all">All Time</Option>
                        </Select>
                    </Row>

                    <Row gutter={[16, 16]} style={{ height: '50vh', width: '100%' }}>
                        <Col xs={24} md={12}>
                            <ProfileChart profileData={filteredProfileData} types={chartType} />
                        </Col>
                        <Col xs={24} md={12}>
                            <OrderChart orderData={filteredOrderData} types={chartType} />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        <Col xs={24} md={12}>
                            {filteredProfileData.labels.length > 0 && filteredOrderData.labels.length > 0 && (
                                <GeneralChart
                                    data={filteredCombinedData}
                                    chartType={chartType}
                                    title="Count"
                                />
                            )}
                        </Col>
                        <Col xs={24} md={12}>
                            <RevunueChart types={chartType} chartDATA={filterConsignDataR} DATA={RevenuedataSet} />
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}
