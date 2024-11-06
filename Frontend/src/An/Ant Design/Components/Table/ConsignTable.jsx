import { Table, Avatar, Tag, Tooltip, message, Button, Checkbox, Modal, Input, Menu, Dropdown, Space } from "antd";
import { CopyOutlined, CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import React from 'react';
import moment from 'moment';

export default function ConsignTable({ data, handleActionClick, Search }) {
    const [activeFilters, setActiveFilters] = React.useState([]);
    const [selectedColumns, setSelectedColumns] = React.useState({ 'UserID': true, 'KoiID': true, 'Description': true });
    const [showColumnSelector, setShowColumnSelector] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [visibleColumns, setVisibleColumns] = React.useState([ '_id', 'ShippedDate', 'ReceiptDate', 'State', 'Method', 'Commission', 'TotalPrice', 'action']);
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        message.success("ID đã được sao chép vào clipboard!");
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
                    <Tooltip title="Sao chép ID">
                        <CopyOutlined
                            style={{ marginLeft: 8, cursor: 'pointer', float: 'right' }}
                            onClick={() => copyToClipboard(text)}
                        />
                    </Tooltip>
                </>
            ),
        },
        {
            title: 'Mã Người Dùng',
            dataIndex: 'UserID',
            key: 'UserID',
            sorter: (a, b) => a.UserID.localeCompare(b.UserID),
            render: text => (
                <>
                    <Tag color="blue">{text}</Tag>
                    <Tooltip title="Sao chép ID">
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
            title: 'Mã Koi',
            dataIndex: 'UserID',
            key: 'KoiID',
            sorter: (a, b) => a.UserID.localeCompare(b.UserID),
            visible: false,
            render: text => (
                <>
                    <Tag color="blue">{text}</Tag>
                    <Tooltip title="Sao chép ID">
                        <CopyOutlined
                            style={{ marginLeft: 8, cursor: 'pointer', float: 'right' }}
                            onClick={() => copyToClipboard(text)}
                        />
                    </Tooltip>
                </>
            ),
        },
        {
            title: 'Ngày Vận Chuyển',
            dataIndex: 'ShippedDate',
            key: 'ShippedDate',
            sorter: (a, b) => {
                if (!a.ShippedDate && !b.ShippedDate) return 0;
                if (!a.ShippedDate) return -1;
                if (!b.ShippedDate) return 1;
                return moment(a.ShippedDate).diff(moment(b.ShippedDate));
            },
            render: text => text ? moment(text).format('DD-MM-YYYY') : <Tag color="red">Không Cung Cấp</Tag>,
        },
        {
            title: 'Ngày Nhận Hàng',
            dataIndex: 'ReceiptDate',
            key: 'ReceiptDate',
            sorter: (a, b) => 
            {
                if (!a.ReceiptDate && !b.ReceiptDate) return 0;
                if (!a.ReceiptDate) return -1;
                if (!b.ReceiptDate) return 1;
                return moment(a.ReceiptDate).diff(moment(b.ReceiptDate));
            },
            render: text => text ? moment(text).format('DD-MM-YYYY') : <Tag color="red">Không Cung Cấp</Tag>
        },
        {
            title: 'Mô Tả',
            dataIndex: 'Description',
            key: 'Description',
            sorter: (a, b) => (a.Description || '').localeCompare(b.Description || ''),
            render: text => text || <Tag color="red">Không Cung Cấp</Tag>,
        },
        {
            title: 'Trạng Thái',
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
                return <Tag color={["blue", "green", "orange", "purple", "red"][state - 1]}>{stateMap[state]}</Tag> || <Tag color="red">Không xác định</Tag>;
            },
        },
        {
            title: 'Phương Thức',
            dataIndex: 'Method',
            key: 'Method',
            filters: [
                { text: 'Trực tuyến', value: 'Online' },
                { text: 'Trực tiếp', value: 'Offline' },
            ],
            filteredValue: activeFilters.find(filter => filter.column === 'Method')?.value || null,
            filterMultiple: false,
            onFilter: (value, record) => record.Method === value,
            render: text => <Tag color="green">{text}</Tag>
        },
        {
            title: 'Vị Trí Chăm Sóc',
            dataIndex: 'PositionCare',
            key: 'PositionCare',
            sorter: (a, b) => a.PositionCare.localeCompare(b.PositionCare),
        },
        {
            title: 'Tỷ Lệ Hoa Hồng',
            dataIndex: 'Commission',
            key: 'Commission',
            sorter: (a, b) => a.Commission - b.Commission,
            render: text => text ? `${text}%` : <Tag color="red">Không Cung Cấp</Tag>,
        },
        {
            title: 'Tổng Giá',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            sorter: (a, b) => a.TotalPrice - b.TotalPrice,
            render: text => text ? `${formatCurrency(text)}` : <Tag color="red">Không Cung Cấp</Tag>,
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleActionClick('View Consign Details', record._id)} type="primary">Xem Chi Tiết</Button>
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
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, marginBottom: 16 }}
                />

                <Dropdown overlay={columnSelectionMenu} trigger={['click']} >
                    <Button style={{ marginBottom: 16 }}>
                        Chọn Cột <DownOutlined />
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
                title="Chọn Cột"
                visible={showColumnSelector}
                onCancel={() => setShowColumnSelector(false)}
                onOk={() => setShowColumnSelector(false)}
            >
                {columns.map(col => (
                    <Checkbox
                        key={col.key}
                        checked={visibleColumns.includes(col.key)}
                        onChange={(e) => handleColumnVisibility(col.key, e.target.checked)}
                    >
                        {col.title}
                    </Checkbox>
                ))}
                <Button onClick={resetColumns}>Đặt Lại Tất Cả</Button>
            </Modal>
        </div>
    );
}
