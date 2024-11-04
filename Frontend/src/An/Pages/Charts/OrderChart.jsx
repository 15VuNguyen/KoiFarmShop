import { Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Empty } from "antd";
export default function OrderChart({orderData, types}) {
    const [orderChartData, setOrderChartData] = useState({});
    useEffect(() => {
        console.log('orderData:', orderData);
        setOrderChartData(orderData);
    }, [orderData]);
  return (
    <div style={{ height: '50vh', width: '100%',display:'flex' , alignItems:'center', justifyContent:'center' }  }>
    {orderChartData && orderChartData.labels && orderChartData.labels.length > 0 && (
        types === 'BarChart' ? (
            <Bar
                data={orderChartData}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Date' } },
                        y: { title: { display: true, text: 'Account Created' } }
                    },
                }}
            />
        ) : (
            <Line
                data={orderChartData}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Date' } },
                        y: { title: { display: true, text: 'Account Created' } }
                    },
                }}
            />
        )
    )    
    }
    {(!orderChartData || !orderChartData.labels || orderChartData.labels.length === 0) && <Empty />}
</div>
  )
}
