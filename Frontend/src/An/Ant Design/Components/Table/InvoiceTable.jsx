import React, { useState } from 'react';
import { Table, Tag, Dropdown, Button, Checkbox, Menu, Upload, message, Tooltip } from 'antd';
import { DownOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import moment from 'moment';
import useFetchInvoices from '../../Hooks/useFetchInvoices';
import { func } from 'prop-types';

export default function InvoiceTable({ data, actions }) {
  const invoices = useFetchInvoices();
  const [visibleColumns, setVisibleColumns] = useState(['_id', 'GroupKoiIDInvoice', 'InvoiceDate', 'Status', 'Discount', 'TotalPrice,', 'action']);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    message.success("Đã sao chép ID vào clipboard!");
  }
  const columns = [
    {
      title: 'Mã số',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
      render: (text) => (
        <>
          <Tooltip title="Sao chép ID">
            <Tag
              icon={<CopyOutlined />}
              style={{ cursor: 'pointer' }}
              onClick={() => copyToClipboard(text)}
              color="blue">{text}</Tag>


          </Tooltip>
        </>
      ),
    },
    {
      title: 'Mã lô cá koi',
      dataIndex: 'GroupKoiIDInvoice',
      key: 'GroupKoiIDInvoice',
      sorter: (a, b) => a.GroupKoiIDInvoice.localeCompare(b.GroupKoiIDInvoice),
      render: (text) => (
        <>
         <Tooltip title="Sao chép ID">
          <Tag
            icon={<CopyOutlined />}
            style={{ cursor: 'pointer' }}
            onClick={() => copyToClipboard(text)}
          color="blue">{text}</Tag>
         
           
          </Tooltip>
        </>
      ),
    },
    {
      title: 'Ngày tạo hóa đơn',
      dataIndex: 'InvoiceDate',
      key: 'InvoiceDate',
      sorter: (a, b) => moment(a.InvoiceDate).unix() - moment(b.InvoiceDate).unix(),
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a, b) => a.Status - b.Status,
      filters: [
        { text: 'Đã nhận', value: 1 },
        { text: 'Hết hàng', value: 2 },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.Status === value,
      render: (status) => {
        let color = status === 1 ? 'green' : 'volcano';
        let text = status === 1 ? 'Đã nhận' : 'Hết hàng';
        return <Tag color={color} key={status}>{text}</Tag>;
      }
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'Discount',
      key: 'Discount',
      sorter: (a, b) => a.Discount - b.Discount,
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Tổng giá',
      dataIndex: 'TotalPrice',
      key: 'TotalPrice',
      sorter: (a, b) => a.TotalPrice - b.TotalPrice,
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button icon={<EditOutlined />} type="primary" onClick={() => actions(record)}>Chỉnh sửa</Button>
      ),
    }
  ];

  const columnSelectionMenu = (
    <Menu>
      {columns.map(col => (
        <Menu.Item key={col.key}>
          <Checkbox
            checked={visibleColumns.includes(col.key)}
            onChange={(e) => handleColumnVisibility(col.key, e.target.checked)}
          >
            {col.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleColumnVisibility = (key, visible) => {
    setVisibleColumns(prev =>
      visible ? [...prev, key] : prev.filter(colKey => colKey !== key)
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const filtered = data.filter(item => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        return filters[key].includes(item[key]);
      });
    });
    setFilteredData(filtered);
    setActiveFilters(filters);
  };

  return (
    <div>
      <Dropdown overlay={columnSelectionMenu} trigger={['click']} >
        <Button style={{ marginBottom: 16 }}>
          Chọn cột <DownOutlined />
        </Button>
      </Dropdown>
      <Table
        scroll={{ x: 1300 }}
        columns={columns.filter(col => visibleColumns.includes(col.key))}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        onChange={handleTableChange}
        size='small'
      />
    </div>
  );
}
