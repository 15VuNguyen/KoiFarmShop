import React from 'react';
import { useEffect } from 'react';
import axiosInstance from '../Utils/axiosJS';

export default function useChartData() {
    const [RevuenueData, setRevuenueData] = React.useState({
        labels: [],
        datasets: []
    });
    const [RevenuedataSet, setRevuenueDataSet] = React.useState(null);
    const [profileChartData, setProfileChartData] = React.useState({
        labels: [],
        datasets: [],
    });
    const [consignData, setConsignData] = React.useState({
        labels: [],
        datasets: [],
    });
    const [orderData, setOrderData] = React.useState({
        labels: [],
        datasets: [],
    });
    const [unFilteredorderData, setUnFilteredDorderData] = React.useState(null);
    const [unFilteredProfileChartData, setUnFilteredProfileChartData] = React.useState(null);
    const [unFilteredConsignData, setUnFilteredConsignData] = React.useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, orderResponse,consignResponse] = await Promise.all([
                    axiosInstance.get('/manager/manage-user/get-all'),
                    axiosInstance.get('/manager/manage-order/get-all'),
                    axiosInstance.get("manager/manage-ki-gui/get-all")
                ]);
                const data = [
                    { "date": "2024-10-06", "value": 182664, "profit": 145000 },
                    { "date": "2024-10-07", "value": 1325963, "profit": 1250000 },
                    { "date": "2024-10-08", "value": 1373571, "profit": 1300000 },
                    { "date": "2024-10-09", "value": 1287479, "profit": 1200000 },
                    { "date": "2024-10-10", "value": 1295080, "profit": 1250000 },
                    { "date": "2024-10-11", "value": 1575260, "profit": 1500000 },
                    { "date": "2024-10-12", "value": 1388847, "profit": 1300000 },
                    { "date": "2024-10-13", "value": 1633423, "profit": 1600000 },
                    { "date": "2024-10-14", "value": 1852390, "profit": 1800000 },
                    { "date": "2024-10-15", "value": 415998, "profit": 390000 },
                    { "date": "2024-10-16", "value": 1530824, "profit": 1500000 },
                    { "date": "2024-10-17", "value": 475660, "profit": 450000 },
                    { "date": "2024-10-18", "value": 1983580, "profit": 1900000 },
                    { "date": "2024-10-19", "value": 1450355, "profit": 1400000 },
                    { "date": "2024-10-20", "value": 1543935, "profit": 1500000 },
                    { "date": "2024-10-21", "value": 1109348, "profit": 1050000 },
                    { "date": "2024-10-22", "value": 552198, "profit": 530000 },
                    { "date": "2024-10-23", "value": 252193, "profit": 1200000 }
                ];
                const chartData = {
                    labels: data.map(item => item.date),
                    datasets: [
                        {
                            label: 'Revenue',
                            data: data.map(item => item.value),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            borderWidth: 2,
                            fill: false
                        },
                        {
                            label: 'Profit',
                            data: data.map(item => item.profit),
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 2,
                            fill: false
                        }
                    ]
                };
                setRevuenueDataSet(data);
                setRevuenueData(chartData);
                setUnFilteredProfileChartData(userResponse.data.result);
                setUnFilteredDorderData(orderResponse.data.result);
                
                const howManyStateCorpondeToEachDATES = (acc, cur) => {
                    const date = new Date(cur.ConsignCreateDate).toLocaleDateString();
                    const state = cur.State;
            
                  
                    if (!acc[date]) {
                        acc[date] = {};
                    }
            
                
                    acc[date][state] = (acc[date][state] || 0) + 1;
            
                    return acc;
                }
            
                const aggregatedData = consignResponse.data.result.reduce(howManyStateCorpondeToEachDATES, {}); 
            
                console.log(aggregatedData);
                const sortedDates = Object.keys(aggregatedData)
                    .map(dateStr => new Date(dateStr))
                    .sort((a, b) => a - b)
                    .map(dateObj => dateObj.toLocaleDateString());
                       setUnFilteredConsignData(sortedDates); 
                setConsignData({
                    labels: sortedDates,
                    datasets: [
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
                });
                const users = userResponse.data.result;
                const userDateCounts = {};
                users.forEach(user => {
                    if (user.created_at) {
                        const createdDate = new Date(user.created_at);
                        if (!isNaN(createdDate.getTime())) {
                            const formattedDate = createdDate.toISOString().slice(0, 10);
                            userDateCounts[formattedDate] = (userDateCounts[formattedDate] || 0) + 1;
                        }
                    }
                });

                const userLabels = Object.keys(userDateCounts);
                const userData = Object.values(userDateCounts);

                setProfileChartData({
                    labels: userLabels,
                    datasets: [
                        {
                            label: 'Accounts Created',
                            data: userData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                const orders = orderResponse.data.result;
                const orderDateCounts = {};
                orders.forEach(order => {
                    if (order.OrderDate) {
                        const orderDate = new Date(order.OrderDate);
                        if (!isNaN(orderDate.getTime())) {
                            const formattedOrderDate = orderDate.toISOString().slice(0, 10);
                            orderDateCounts[formattedOrderDate] = (orderDateCounts[formattedOrderDate] || 0) + 1;
                        }
                    }
                });

                const orderLabels = Object.keys(orderDateCounts);
                const orderData = Object.values(orderDateCounts);

                setOrderData({
                    labels: orderLabels,
                    datasets: [
                        {
                            label: 'Orders Placed',
                            data: orderData,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const combineData = () => {
        const combinedLabels = [...new Set([...profileChartData.labels, ...orderData.labels])].sort();

        const accountsCreatedData = combinedLabels.map(date => {
            const index = profileChartData.labels.indexOf(date);
            return index >= 0 ? profileChartData.datasets[0].data[index] : 0;
        });

        const ordersPlacedData = combinedLabels.map(date => {
            const index = orderData.labels.indexOf(date);
            return index >= 0 ? orderData.datasets[0].data[index] : 0;
        });

        return {
            labels: combinedLabels,
            datasets: [
                {
                    label: 'Accounts Created',
                    data: accountsCreatedData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    
                },
                {
                    label: 'Orders Placed',
                    data: ordersPlacedData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const filterDataByTimeRange = (timeRange, chartData) => {
        const now = new Date();
        let startDate;

        if (timeRange === '7days') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        } else if (timeRange === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (timeRange === 'year') {
            startDate = new Date(now.getFullYear(), 0, 1);
        } else {
            return chartData;
        }

        const filteredLabels = chartData.labels.filter(label => new Date(label) >= startDate);
        const filteredDatasets = chartData.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.slice(chartData.labels.findIndex(label => new Date(label) >= startDate)),
        }));

        return {
            labels: filteredLabels,
            datasets: filteredDatasets,
        };
    };

    const filterProfileData = (timeRange) => filterDataByTimeRange(timeRange, profileChartData);
    const filterOrderData = (timeRange) => filterDataByTimeRange(timeRange, orderData);
    const filterCombinedData = (timeRange) => filterDataByTimeRange(timeRange, combineData());
    const filterRevuenueData = (timeRange) => filterDataByTimeRange(timeRange, RevuenueData);
    const filterConsignData = (timeRange) => filterDataByTimeRange(timeRange, consignData);

    return {
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
    };
}
