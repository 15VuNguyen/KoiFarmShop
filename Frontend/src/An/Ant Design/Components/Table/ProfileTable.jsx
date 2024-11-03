import { Table, Avatar, Tag, Tooltip, message, Button, Checkbox, Modal,Input,Dropdown ,Menu,Space } from "antd";
import { CopyOutlined, CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import React from 'react';
import moment from 'moment';
import ProfileModal from "../Modal/ProfileModal";

export default function ProfileTable({ data, handleActionClick, Search }) {
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState({});
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(['_id', 'name', 'email', 'address', 'date_of_birth', 'verify', 'action']);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success("ID copied to clipboard!");
  };
  
  const handleTableChange = (pagination, filters, sorter) => {
    const filterNames = [];
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filterNames.push({
          column: key,
          value: filters[key],
        });
      }
    });
    setActiveFilters(filterNames);
  };

  const toggleColumnVisibility = (columnKey) => {
    setSelectedColumns(prevState => ({
      ...prevState,
      [columnKey]: !prevState[columnKey]
    }));
  };

  const resetColumns = () => {
    setSelectedColumns({});
  };

  const removeFilter = (filterToRemove) => {
    setActiveFilters(activeFilters.filter(filter => 
      !(filter.column === filterToRemove.column && JSON.stringify(filter.value) === JSON.stringify(filterToRemove.value))
    ));
  };

  const searchFunction = (item) => {
    const searchFields = ['_id', 'name', 'email', 'address'];
    return searchFields.some(field => 
      item[field]?.toString()?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = searchTerm ? data.filter(searchFunction) : data;

//   const removeFilter = (filterToRemove) => {
//     setActiveFilters(activeFilters.filter(filter => 
//       !(filter.column === filterToRemove.column && JSON.stringify(filter.value) === JSON.stringify(filterToRemove.value))
//     ));
//   };
// const FilterTag = ({ filter, onRemove }) => (
//   <Tag closable onClose={() => onRemove(filter)} closeIcon={<CloseCircleOutlined />}>
//     {filter.column}: {filter.value.join(', ')}
//   </Tag>
// );
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <>
          <Tag color="blue">{text}</Tag>
          <Tooltip title="Copy ID">
            <CopyOutlined
              style={{ marginLeft: 8, cursor: 'pointer', float: 'right' }}
              onClick={() => copyToClipboard(text)}
            />
          </Tooltip>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Avatar',
      dataIndex: 'picture',
      key: 'picture',
      render: (url) => <Avatar src={url} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
      render: (text) => text || <Tag color="red">Not Provided</Tag>,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (text) => moment(text).format('YYYY-MM-DD'),
      sorter: (a, b) => moment(a.date_of_birth).unix() - moment(b.date_of_birth).unix(),
      filters: [
        { text: 'Last 7 Days', value: '7d' },
        { text: 'Last Month', value: '1m' },
        { text: 'Last Year', value: '1y' },
      ],
      onFilter: (value, record) => {
        const recordDate = moment(record.date_of_birth);
        switch (value) {
          case '7d':
            return recordDate.isAfter(moment().subtract(7, 'days'));
          case '1m':
            return recordDate.isAfter(moment().subtract(1, 'month'));
          case '1y':
            return recordDate.isAfter(moment().subtract(1, 'year'));
          default:
            return true;
        }
      },
      filterMultiple: false,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => text || <Tag color="red">Not Provided</Tag>,
    },{
      title: 'Email Verified',
      dataIndex: 'verify',
      key: 'verify',
      render: (text) => text ? <Tag color="green">Verified</Tag> : <Tag color="red">Unverified</Tag>,
      filters: [
        { text: 'Verified', value: 1 },
        { text: 'Unverified', value: 0 },
      ],
      onFilter: (value, record) => record.verify === value,
      filterMultiple: false,

    },
    {
      title: 'Action',
      key: 'Status',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleActionClick('update', record._id)}
          >
            Update
          </Button>
          {
            record.Status  == 1 ? (
              <Button
                type="primary"
                onClick={() => handleActionClick('disable/enable', record._id,'enable')}
              >
                Enable
              </Button>
            ) : (
              <Button danger 
                variant="solid"
                onClick={() => handleActionClick('disable/enable', record._id,'disable')}
              >
                Disable
              </Button>
          )
          }
        </>
      ),
    },
  ].map(col => ({...col, visible: visibleColumns.includes(col.key)}));

  const filteredColumns = columns.filter(col => col.visible);
  const handleColumnVisibility = (key, visible) => {
    setVisibleColumns(prev =>
      visible ? [...prev, key] : prev.filter(colKey => colKey !== key)
    );
  };
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

  return (
    <div>
      <Space size={"middle"}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
         {/* 
        <Button onClick={() => setShowColumnSelector(true)}>Select Columns</Button>
      </p> */}
      <Dropdown overlay={columnSelectionMenu} trigger={['click']} >
        <Button style={{ marginBottom: 16 }}>
          Choose Columns <DownOutlined />
        </Button>
      </Dropdown>
      {/* {activeFilters.map((filter, index) => (
        // <FilterTag key={index} filter={filter} onRemove={removeFilter} />
      ))} */}
      </Space>
      <Table
        columns={filteredColumns}
        dataSource={filteredData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        onChange={handleTableChange}
      />

      <Modal
        title="Select Columns"
        visible={showColumnSelector}
        onCancel={() => setShowColumnSelector(false)}
        onOk={() => setShowColumnSelector(false)}
      >
        {columns.map(col => (
          <Checkbox
            key={col.key}
            checked={!selectedColumns[col.key]}
            onChange={(e) => toggleColumnVisibility(col.key)}
          >
            {col.title}
          </Checkbox>
        ))}
        <Button onClick={resetColumns}>Reset All</Button>
      </Modal>
    </div>
  );
}