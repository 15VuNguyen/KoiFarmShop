import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axiosInstance from "../../Utils/axiosJS";
import {
  Layout,
  Typography,
  Card,
  Select,
  Space,
  Tooltip,
  Radio,
  Switch,
  Spin,
  Row,
  Col,
  Flex,
} from "antd";
import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import RevenueChart from "../../Pages/Charts/RevunueChart";

function sortDate(data, field) {
  return data.sort((a, b) => new Date(a[field]) - new Date(b[field]));
}
function aggregateDataByDate(data, dateField) {
  const dateCounts = data.reduce((acc, item) => {
    const date = new Date(item[dateField]).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(dateCounts).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dataset = labels.map((date) => dateCounts[date]);

  return { labels, dataset };
}

function ChartCard({
  title,
  data,
  dateField,
  chartType,
  onChartTypeChange,
  onDateRangeChange,
}) {
  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <Card title={title} className="reponsive-chart-card">
      <Space direction="horizontal" style={{ marginBottom: 16 }}>
        <Radio.Group
          defaultValue="year"
          onChange={(e) => onDateRangeChange(e.target.value)}
        >
          <Radio.Button value="7days">7 Ngày Qua</Radio.Button>
          <Radio.Button value="month">Tháng Trước</Radio.Button>
          <Radio.Button value="year">Năm Trước</Radio.Button>
        </Radio.Group>
        <Tooltip title="Chuyển Đổi Loại Biểu Đồ">
          <Switch
            checked={chartType === "bar"}
            onChange={onChartTypeChange}
            checkedChildren={<BarChartOutlined />}
            unCheckedChildren={<LineChartOutlined />}
          />
        </Tooltip>
      </Space>
      <ChartComponent data={data} options={{ responsive: true }} />
    </Card>
  );
}
const howManyStateCorpondeToEachDATES = (acc, cur) => {
  const date = new Date(cur.ConsignCreateDate).toLocaleDateString();
  const state = cur.State;

  if (!acc[date]) {
    acc[date] = {};
  }

  acc[date][state] = (acc[date][state] || 0) + 1;

  return acc;
};

export default function Dashboard() {
  const [rawAccountData, setRawAccountData] = useState(null);
  const [rawOrderData, setRawOrderData] = useState(null);
  const [rawInvoiceData, setRawInvoiceData] = useState(null);
  const [rawConsignData, setRawConsignData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [consignData, setConsignData] = useState(null);
  const [accountChartType, setAccountChartType] = useState("bar");
  const [orderChartType, setOrderChartType] = useState("bar");
  const [invoiceChartType, setInvoiceChartType] = useState("bar");
  const [consignChartType, setConsignChartType] = useState("bar");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [accounts, orders, invoices, consigns] = await Promise.all([
        axiosInstance.get("manager/manage-user/get-all"),
        axiosInstance.get("/manager/manage-order/get-all"),
        axiosInstance.get("manager/manage-invoice/get-all"),
        axiosInstance.get("manager/manage-ki-gui/get-all"),
      ]);

      return {
        accounts: accounts.data.result,
        orders: orders.data.result,
        invoices: invoices.data.invoices,
        consigns: consigns.data.result,
      };
    }

    fetchData().then(({ accounts, orders, invoices, consigns }) => {
      const sortedAccounts = sortDate(accounts, "created_at");
      const sortedOrders = sortDate(orders, "OrderDate");
      const sortedInvoices = sortDate(invoices, "InvoiceDate");
      const sortedConsigns = sortDate(consigns, "ConsignCreateDate");
      setRawAccountData(sortedAccounts);
      setRawOrderData(sortedOrders);
      setRawInvoiceData(sortedInvoices);
      setRawConsignData(sortedConsigns);

      const accountData = aggregateDataByDate(sortedAccounts, "created_at");
      const orderData = aggregateDataByDate(sortedOrders, "OrderDate");
      const invoiceData = aggregateDataByDate(sortedInvoices, "InvoiceDate");
      const consignData = sortedConsigns.reduce(
        howManyStateCorpondeToEachDATES,
        {}
      );
      console.log(Object.keys(consignData));
      const labels = Object.keys(consignData);

      setConsignData({
        labels,
        datasets: [
          {
            label: "Đã Hủy",
            data: labels.map((date) => consignData[date]?.[0] || 0),
            borderColor: "#ff0000",
            backgroundColor: "#ff0000",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Yêu Cầu Ký Gửi",
            data: labels.map((date) => consignData[date]?.[1] || 0),
            borderColor: "#91caff",
            backgroundColor: "#91caff",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Kiểm Tra Koi",
            data: labels.map((date) => consignData[date]?.[2] || 0),
            borderColor: "#b7eb8f",
            backgroundColor: "#b7eb8f",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Thương Thảo Hơp Đồng",
            data: labels.map((date) => consignData[date]?.[3] || 0),
            borderColor: "#ffd591",
            backgroundColor: "#ffd591",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Tìm Người Mua",
            data: labels.map((date) => consignData[date]?.[4] || 0),
            borderColor: "#d3adf7",
            backgroundColor: "#d3adf7",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đã Bán Thành Công",
            data: labels.map((date) => consignData[date]?.[5] || 0),
            borderColor: "#ffa39e",
            backgroundColor: "#ffa39e",
            fill: false,
            tension: 0.3,
          },
        ],
      });
      console.log(consignData);
      setAccountData({
        labels: accountData.labels,
        datasets: [
          {
            label: "Tài Khoản Được Tạo",
            data: accountData.dataset,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });

      setOrderData({
        labels: orderData.labels,
        datasets: [
          {
            label: "Đơn Hàng Được Đặt",
            data: orderData.dataset,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });

      setInvoiceData({
        labels: invoiceData.labels,
        datasets: [
          {
            label: "Hóa Đơn Được Tạo",
            data: invoiceData.dataset,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });

      setIsLoading(false);
    });
  }, []);

  const handleDateRangeChange = (type, value) => {
    const today = new Date();
    let startDate = new Date();

    switch (value) {
      case "7days":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        break;
    }

    const filterAndAggregateData = (rawData, dateField) => {
      const filteredData = rawData.filter(
        (item) => new Date(item[dateField]) >= startDate
      );
      return aggregateDataByDate(filteredData, dateField);
    };

    if (type === "accounts" && rawAccountData) {
      const filteredAccountData = filterAndAggregateData(
        rawAccountData,
        "created_at"
      );
      setAccountData({
        labels: filteredAccountData.labels,
        datasets: [
          {
            label: "Tài Khoản Được Tạo",
            data: filteredAccountData.dataset,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    } else if (type === "orders" && rawOrderData) {
      const filteredOrderData = filterAndAggregateData(
        rawOrderData,
        "OrderDate"
      );
      setOrderData({
        labels: filteredOrderData.labels,
        datasets: [
          {
            label: "Đơn Hàng Được Đặt",
            data: filteredOrderData.dataset,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });
    } else if (type === "invoices" && rawInvoiceData) {
      const filteredInvoiceData = filterAndAggregateData(
        rawInvoiceData,
        "InvoiceDate"
      );
      setInvoiceData({
        labels: filteredInvoiceData.labels,
        datasets: [
          {
            label: "Hóa Đơn Được Tạo",
            data: filteredInvoiceData.dataset,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });
    } else if (type === "consigns" && rawConsignData) {
      const filteredConsignData = rawConsignData.filter(
        (item) => new Date(item.ConsignCreateDate) >= startDate
      );

      const consignData = filteredConsignData.reduce(
        howManyStateCorpondeToEachDATES,
        {}
      );
      const labels = Object.keys(consignData);

      setConsignData({
        labels,
        datasets: [
          {
            label: "Đã Hủy",
            data: labels.map((date) => consignData[date]?.[0] || 0),
            borderColor: "#ff0000",
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Yêu Cầu Ký Gửi",
            data: labels.map((date) => consignData[date]?.[1] || 0),
            borderColor: "#91caff",
            backgroundColor: "rgba(145, 202, 255, 0.6)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Kiểm Tra Koi",
            data: labels.map((date) => consignData[date]?.[2] || 0),
            borderColor: "#b7eb8f",
            backgroundColor: "rgba(183, 235, 143, 0.6)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Thương Thảo Hơp Đồng",
            data: labels.map((date) => consignData[date]?.[3] || 0),
            borderColor: "#ffd591",
            backgroundColor: "rgba(255, 213, 145, 0.6)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đang Tìm Người Mua",
            data: labels.map((date) => consignData[date]?.[4] || 0),
            borderColor: "#d3adf7",
            backgroundColor: "rgba(211, 173, 247, 0.6)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Đã Bán Thành Công",
            data: labels.map((date) => consignData[date]?.[5] || 0),
            borderColor: "#ffa39e",
            backgroundColor: "rgba(255, 163, 158, 0.6)",
            fill: false,
            tension: 0.3,
          },
        ],
      });
    }
  };

  const handleChartTypeChange = (type) => {
    switch (type) {
      case "accounts":
        setAccountChartType((prev) => (prev === "bar" ? "line" : "bar"));
        break;
      case "orders":
        setOrderChartType((prev) => (prev === "bar" ? "line" : "bar"));
        break;
      case "invoices":
        setInvoiceChartType((prev) => (prev === "bar" ? "line" : "bar"));
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: 100 }}
      />
    );
  }

  return (
    <Layout>
      <Typography.Title style={{ textAlign: "center" }}>
        Bảng Điều Khiển
      </Typography.Title>
      <Flex justify="space-around" wrap>
        <ChartCard
          title="Tài Khoản Được Tạo theo Ngày"
          data={accountData}
          dateField="created_at"
          chartType={accountChartType}
          onChartTypeChange={() => handleChartTypeChange("accounts")}
          onDateRangeChange={(value) =>
            handleDateRangeChange("accounts", value)
          }
        />
        <ChartCard
          title="Đơn Hàng Được Đặt theo Ngày"
          data={orderData}
          dateField="OrderDate"
          chartType={orderChartType}
          onChartTypeChange={() => handleChartTypeChange("orders")}
          onDateRangeChange={(value) => handleDateRangeChange("orders", value)}
        />
        <ChartCard
          title="Hóa Đơn Được Tạo theo Ngày"
          data={invoiceData}
          dateField="InvoiceDate"
          chartType={invoiceChartType}
          onChartTypeChange={() => handleChartTypeChange("invoices")}
          onDateRangeChange={(value) =>
            handleDateRangeChange("invoices", value)
          }
        />
      </Flex>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex justify="space-around" style={{ marginTop: 16, padding: "" }}>
            <Card
              bodyStyle={{ height: "500px" }}
              title="Đơn Ký Gửi Theo Trạng Thái"
              style={{ width: "100%" }}
            >
              <Space direction="horizontal" style={{ marginBottom: 16 }}>
                <Radio.Group
                  defaultValue="year"
                  onChange={(e) =>
                    handleDateRangeChange("consigns", e.target.value)
                  }
                >
                  <Radio.Button value="7days">7 Ngày Qua</Radio.Button>
                  <Radio.Button value="month">Tháng Trước</Radio.Button>
                  <Radio.Button value="year">Năm Trước</Radio.Button>
                </Radio.Group>

                <Tooltip title="Chuyển Đổi Loại Biểu Đồ">
                  <Switch
                    checked={consignChartType === "bar"}
                    onChange={() =>
                      setConsignChartType((prev) =>
                        prev === "bar" ? "line" : "bar"
                      )
                    }
                    checkedChildren={<BarChartOutlined />}
                    unCheckedChildren={<LineChartOutlined />}
                  />
                </Tooltip>
              </Space>

              {consignChartType === "bar" ? (
                <Bar
                  data={consignData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                    ],
                  }}
                />
              ) : (
                <Line
                  data={consignData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              )}
            </Card>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}
