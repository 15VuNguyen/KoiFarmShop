import React, { useState, useEffect } from 'react';
import { Modal, Select, Radio, Space, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

const { Title } = Typography;

export default function InvoiceChartModal({ visible, onClose, data, whichType,tellMeWhatIs }) {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('7d');
    const [chartData, setChartData] = useState({});
    const MapfilterDateToVietnamese = {
        '7d': '7 Ngày Qua',
        '1m': 'Tháng Qua',
        '1y': 'Năm Nay',
    };
    useEffect(() => {
        const currentDate = dayjs();
        let filteredData = {};

        
        if (selectedTimePeriod === '7d') {
            filteredData = Object.fromEntries(
                Object.entries(data).filter(([date]) =>
                    dayjs(date).isAfter(currentDate.subtract(7, 'day'))
                )
            );
        } else if (selectedTimePeriod === '1m') {
            filteredData = Object.fromEntries(
                Object.entries(data).filter(([date]) =>
                    dayjs(date).isAfter(currentDate.subtract(1, 'month'))
                )
            );
        } else if (selectedTimePeriod === '1y') {
            filteredData = Object.fromEntries(
                Object.entries(data).filter(([date]) =>
                    dayjs(date).isAfter(currentDate.subtract(1, 'year'))
                )
            );
        }

        const formattedLabels = Object.keys(filteredData).map(date =>
            dayjs(date).format('DD/MM/YYYY')
        );

        setChartData({
            labels: formattedLabels,
            datasets: [
                {
                    label: whichType === 'Supplier' ? 'Số lượng nhà cung cấp' : 'Số lượng Hoá Đơn',
                    data: Object.values(filteredData),
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                },
            ],
        });
    }, [selectedTimePeriod, data]);
    const tellMEMapper = {
        'Recived': 'Đã Nhận ',
        'Sold Out': 'Đã Bán Hết ',
        undefined : ''
    }
    const handleChangeTimePeriod = (value) => {
        setSelectedTimePeriod(value);
    };

    return (
        <Modal
            title= {whichType === 'Supplier' ? 'Biểu Đồ Doanh Thu ' + 'Trong ' + MapfilterDateToVietnamese[selectedTimePeriod] : 'Biểu Đồ Số Lượng Hóa Đơn '+ tellMEMapper[tellMeWhatIs] + 'Trong ' + MapfilterDateToVietnamese[selectedTimePeriod]}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>Chọn Khoảng Thời Gian</Title>
                <Radio.Group
                    value={selectedTimePeriod}
                    onChange={(e) => handleChangeTimePeriod(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                >
                    <Radio.Button value="7d">7 Ngày Cuối</Radio.Button>
                    <Radio.Button value="1m">Tháng Cuối</Radio.Button>
                    <Radio.Button value="1y">Năm Cuối</Radio.Button>
                </Radio.Group>
                <Line data={chartData} options={{ responsive: true }} />
            </Space>
        </Modal>
    );
}
