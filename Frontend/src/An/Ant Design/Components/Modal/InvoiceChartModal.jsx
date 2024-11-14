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
    const whichTypeMapper = {
        'Supplier': 'Số lượng nhà cung cấp',
        'Invoice': 'Số lượng Hoá Đơn',
        'Profile': 'Số lượng người dùng',
        'Profile_Verified': 'Số lượng người dùng đã xác minh'
    }
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
        let sortedLables = formattedLabels.sort((a, b) => {
            return dayjs(a, 'DD/MM/YYYY').diff(dayjs(b, 'DD/MM/YYYY'));
        });
        let SortedDateOfFilterData = Object.keys(filteredData).sort((a, b) => {
            return dayjs(a, 'DD/MM/YYYY').diff(dayjs(b, 'DD/MM/YYYY'));
        });
        console.log(Object.values(filteredData));
       
        const sortedDates = Object.keys(filteredData).sort((a, b) => new Date(a) - new Date(b));
        const sortedValues = sortedDates.map(date => data[date]);
        console.log(sortedDates);
        console.log(sortedValues);
        
        console.log(filteredData)
        setChartData({
            labels: sortedLables,   
            datasets: [
                {
                    label: whichTypeMapper[whichType],
                    data: sortedValues,
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                },
            ],
        });
    }, [selectedTimePeriod, data]);
    const whichChart = {
        'Supplier': 'Nhà Cung Cấp',
        'Invoice': 'Hóa Đơn ',
        'Profile': 'Hồ Sơ',
        'Profile_Verified': 'Hồ Sơ Đã Xác Minh'
    }
    const tellMEMapper = {
        'Recived': 'Đã Nhận ',
        'Sold Out': 'Đã Bán Hết ',
        '' : ' ',
        'Nhật Bản': 'Nhật Bản',
        'Việt Nam': 'Việt Nam',
        'Profile': 'Hồ Sơ',
        undefined:' ',
    }
    const speciapMapper = {
        'Nhật Bản': 'Nhật Bản',
        'Việt Nam': 'Việt Nam',
        undefined:' ',
        ''  :'',
    }
    const handleChangeTimePeriod = (value) => {
        setSelectedTimePeriod(value);
    };

    return (
        <Modal
            title= {whichType === 'Supplier' ? 'Biểu Đồ Nhà Cung Cấp ' + tellMEMapper[tellMeWhatIs] + ' Trong ' + MapfilterDateToVietnamese[selectedTimePeriod] : 'Biểu Đồ Số Lượng '+ whichChart[whichType] + tellMEMapper[tellMeWhatIs] + 'Trong ' + MapfilterDateToVietnamese[selectedTimePeriod]}
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
