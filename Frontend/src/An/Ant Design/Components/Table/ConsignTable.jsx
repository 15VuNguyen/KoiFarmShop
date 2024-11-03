import { Table, Avatar, Tag, Tooltip, message, Button, Checkbox, Modal, Input, Menu, Dropdown, Space } from "antd";
import { CopyOutlined, CloseCircleOutlined,DownOutlined  } from "@ant-design/icons";
import React from 'react';
import moment from 'moment';

export default function ConsignTable({ data, handleActionClick, Search }) {
    const [activeFilters, setActiveFilters] = React.useState([]);
    const [selectedColumns, setSelectedColumns] = React.useState({ 'UserID': true, 'KoiID': true, 'Description': true });
    const [showColumnSelector, setShowColumnSelector] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [visibleColumns, setVisibleColumns] = React.useState([ '_id', 'ShippedDate', 'ReceiptDate', 'Description', 'State', 'Method', 'PositionCare', 'Commission', 'TotalPrice', 'action']);
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        message.success("ID copied to clipboard!");
    };
    React.useEffect(() => {
    }, [activeFilters]);
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

    const removeFilter = (filterToRemove) => {
        const updatedFilters = activeFilters.filter(filter =>
            !(filter.column === filterToRemove.column && JSON.stringify(filter.value) === JSON.stringify(filterToRemove.value))
        );
        setActiveFilters(updatedFilters);
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

    const searchFunction = (item) => {
        const searchFields = ['_id', 'UserID', 'UserID', 'PositionCare', 'Description'];
        return searchFields.some(field =>
            item[field]?.toString()?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredData = searchTerm ? data.filter(searchFunction) : data;


    const FilterTag = ({ filter, onRemove }) => (
        <Tag closable onClose={() => onRemove(filter)} closeIcon={<CloseCircleOutlined />}>
            {filter.column}: {filter.value.join(', ')}
        </Tag>
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
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
            title: 'User ID',
            dataIndex: 'UserID',
            key: 'UserID',
            sorter: (a, b) => a.UserID.localeCompare(b.UserID),
            render: text => (
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
            visible: false,
        },
        {
            title: 'Koi ID',
            dataIndex: 'UserID',
            key: 'KoiID',
            sorter: (a, b) => a.UserID.localeCompare(b.UserID),
            visible: false,
            render: text => (
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
            title: 'Shipped Date',
            dataIndex: 'ShippedDate',
            key: 'ShippedDate',
            sorter: (a, b) => moment(a.ShippedDate) - moment(b.ShippedDate),
            render: text => text ? moment(text).format('YYYY/MM/DD') : <Tag color="red">Not Provided</Tag>,
        },
        {
            title: 'Receipt Date',
            dataIndex: 'ReceiptDate',
            key: 'ReceiptDate',
            sorter: (a, b) => moment(a.ReceiptDate) - moment(b.ReceiptDate),
            render: text => text ? moment(text).format('YYYY/MM/DD') : <Tag color="red">Not Provided</Tag>
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            sorter: (a, b) => a.Description.localeCompare(b.Description),
            render: text => text || <Tag color="red">Not Provided</Tag>,
        },
        {
            title: 'State',
            dataIndex: 'State',
            key: 'State',
            filters: [
                { text: 'Yêu cầu ký gửi', value: 1 },
                { text: 'Đang kiểm tra Koi', value: 2 },
                { text: 'Đang thương thảo hợp đồng', value: 3 },
                { text: 'Đang tìm người mua', value: 4 },
                { text: 'Đã bán thành công', value: 5 },
            ],
            filteredValue: activeFilters.find(filter => filter.column === 'State')?.value || null,
            filterMultiple: false,
            onFilter: (value, record) => record.State === value,
            render: state => {
                const stateMap = {
                    1: 'Yêu cầu ký gửi',
                    2: 'Đang kiểm tra Koi',
                    3: 'Đang thương thảo hợp đồng',
                    4: 'Đang tìm người mua',
                    5: 'Đã bán thành công',
                };
                return <Tag color={["blue", "green", "orange", "purple", "red"][state - 1]}>{stateMap[state]}</Tag> || <Tag color="red">Unknown</Tag>;
            },
        },
        {
            title: 'Method',
            dataIndex: 'Method',
            key: 'Method',
            filters: [
                { text: 'Online', value: 'Online' },
                { text: 'Offline', value: 'Offline' },
            ],
            filteredValue: activeFilters.find(filter => filter.column === 'Method')?.value || null,
            filterMultiple: false,
            onFilter: (value, record) => record.Method === value,
            render: text => <Tag color="green">{text}</Tag>
        },
        {
            title: 'Position Care',
            dataIndex: 'PositionCare',
            key: 'PositionCare',
            sorter: (a, b) => a.PositionCare.localeCompare(b.PositionCare),
        },
        {
            title: 'Commission Rate',
            dataIndex: 'Commission',
            key: 'Commission',
            sorter: (a, b) => a.Commission - b.Commission,
            render: text => text ? `${text}%` : <Tag color="red">Not Provided</Tag>,
        },
        {
            title: 'Total Price',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            sorter: (a, b) => a.TotalPrice - b.TotalPrice,
            render: text => text ? `${formatCurrency(text)}` : <Tag color="red">Not Provided</Tag>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleActionClick('View Consign Details', record._id)} type="primary">View Detail</Button>
                </div>
            ),
        }
    ].map(col => ({...col, visible: visibleColumns.includes(col.key)}));
    const handleColumnVisibility = (key, visible) => {
        setVisibleColumns(prev =>
          visible ? [...prev, key] : prev.filter(colKey => colKey !== key)
        );
      };
    const filteredColumns = columns.filter(col => col.visible);
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
            <Space>
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, marginBottom: 16 }}
                />

                <Dropdown overlay={columnSelectionMenu} trigger={['click']} >
                    <Button style={{ marginBottom: 16 }}>
                        Choose Columns <DownOutlined />
                    </Button>
                </Dropdown>
                {/* <Button onClick={() => setShowColumnSelector(true)} >Select Columns</Button>{activeFilters.map((filter, index) => (
                <FilterTag key={index} filter={filter} onRemove={removeFilter} />
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
                        onChange={() => toggleColumnVisibility(col.key)}
                    >
                        {col.title}
                    </Checkbox>
                ))}
                <Button onClick={resetColumns}>Reset All</Button>
            </Modal>
        </div>
    );
}
