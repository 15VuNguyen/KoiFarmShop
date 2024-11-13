import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Card from 'antd/es/card/Card';
import { Radio, Switch,Tooltip } from 'antd';
import axiosInstance from '../../Utils/axiosJS';
import { BarChartOutlined,LineChartOutlined } from '@ant-design/icons';
export default function RevenueChart( ) {
    const [revenueData, setRevenueData] = useState([]);
    const [profitData, setProfitData] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const [dateRange, setDateRange] = useState('7d');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const revenueResponse = await axiosInstance.get('manager/getRevenue');
                const profitResponse = await axiosInstance.get('manager/getProfit');
                setRevenueData(revenueResponse.data);
                setProfitData(profitResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const filterDataByDateRange = (data) => {
        const today = new Date();
        let filteredData = data;

        if (dateRange === '7d') {
            const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
            filteredData = data.filter(item => new Date(item.Date) >= sevenDaysAgo);
        } else if (dateRange === 'month') {
            const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
            filteredData = data.filter(item => new Date(item.Date) >= lastMonth);
        } else if (dateRange === 'year') {
            const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));
            filteredData = data.filter(item => new Date(item.Date) >= lastYear);
        }

        return filteredData;
    };


    const filteredRevenueData = filterDataByDateRange(revenueData);
    const filteredProfitData = filterDataByDateRange(profitData);

    const chartData = {
        labels: filteredRevenueData.map(item => item.Date),
        datasets: [
            {
                label: 'Doanh Thu',
                data: filteredRevenueData.map(item => item.TotalPrice),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: 'Lợi Nhuận ',
                data: filteredProfitData.map(item => item.TotalProfit),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: true,
            }
        ]
    };

    // const chartOptions = {
    //     maintainAspectRatio: true,
    //     responsive: false,
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //             title: {
    //                 display: true,
    //                 text: 'Amount (VND)',
    //             },
    //         },
    //         x: {
    //             title: {
    //                 display: true,
    //                 text: 'Date',
    //             },
    //         },
    //     },
    //     plugins: {
    //         tooltip: {
    //             callbacks: {
    //                 label: function (tooltipItem) {
    //                     const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
    //                     const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
    //                     const percentageChange = revenue
    //                         ? ((profit - revenue) / revenue) * 100
    //                         : 0;
    //                     const changeLabel = percentageChange > 0 ? 'gain' : 'loss';

    //                     return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString('en-US')} VND (${percentageChange.toFixed(2)}% ${changeLabel})`;
    //                 },
    //                 labelTextColor: function (tooltipItem) {
    //                     const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
    //                     const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
    //                     const percentageChange = revenue
    //                         ? ((profit - revenue) / revenue) * 100
    //                         : 0;

    //                     return percentageChange > 0 ? 'rgba(205, 254, 194)' : 'rgba(254, 121, 104)';
    //                 }
    //             }
    //         }
    //     }
    // };

    return (
        <Card
            bodyStyle={{ height: '500px' }}
            style={{ width: '100%' }}
            title="Biểu đồ Doanh thu và Lợi nhuận"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Radio.Group
                    options={[
                        { label: '7 Ngày', value: '7d' },
                        { label: 'Tháng Trước', value: 'month' },
                        { label: 'Năm Trước', value: 'year' },
                    ]}
                    onChange={(e) => setDateRange(e.target.value)}
                    value={dateRange}
                    optionType="button"
                    buttonStyle="solid"
                />
                <Tooltip title="Chuyển đổi loại biểu đồ">
                    <Switch
                        checkedChildren={<BarChartOutlined />}
                        unCheckedChildren={<LineChartOutlined />}
                        onChange={(checked) => setChartType(checked ? 'line' : 'bar')}
                    />
                </Tooltip>
            </div>
        
            {chartType === 'bar' ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Số tiền (đ)',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày',
                                },
                            },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
                                        const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
                                        const percentageChange = revenue
                                            ? ((profit - revenue) / revenue) * 100
                                            : 0;
                                        const changeLabel = percentageChange > 0 ? 'lãi' : 'lỗ';
        
                                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString('en-US')} đ (${percentageChange.toFixed(2)}% ${changeLabel})`;
                                    },
                                    labelTextColor: function (tooltipItem) {
                                        const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
                                        const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
                                        const percentageChange = revenue
                                            ? ((profit - revenue) / revenue) * 100
                                            : 0;
                                             //https://www.chartjs.org/docs/latest/configuration/tooltip.html#label-callback
                                        return percentageChange > 0 ? 'rgba(205, 254, 194)' : 'rgba(254, 121, 104)';
                                    }
                                }
                            }
                        },
                    }}
                />
            ) : (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Số tiền (đ)',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày',
                                },
                            },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
                                        const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
                                        const percentageChange = revenue
                                            ? ((profit - revenue) / revenue) * 100
                                            : 0;
                                        const changeLabel = percentageChange > 0 ? 'lãi' : 'lỗ';
        
                                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString('en-US')} đ (${percentageChange.toFixed(2)}% ${changeLabel})`;
                                    },
                                    labelTextColor: function (tooltipItem) {
                                        const revenue = filteredRevenueData[tooltipItem.dataIndex]?.TotalPrice || 0;
                                        const profit = filteredProfitData[tooltipItem.dataIndex]?.TotalProfit || 0;
                                        const percentageChange = revenue
                                            ? ((profit - revenue) / revenue) * 100
                                            : 0;
        
                                        return percentageChange > 0 ? 'rgba(205, 254, 194)' : 'rgba(254, 121, 104)';
                                    }
                                }
                            }
                        },
                    }}
                />
            )}
        </Card>
    );
}
