import { Table, Avatar, Tag, Tooltip, message, Button, Checkbox, Modal, Input, Menu, Dropdown, Space, Select } from "antd";
import { CopyOutlined, CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import React, { lazy } from 'react';
import moment from 'moment';

export default function ConsignTable({ data, handleActionClick, Search }) {
    const [activeFilters, setActiveFilters] = React.useState([]);
    const [selectedColumns, setSelectedColumns] = React.useState({ 'UserID': true, 'KoiID': true, 'Description': true });
    const [showColumnSelector, setShowColumnSelector] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [visibleColumns, setVisibleColumns] = React.useState(['_id', 'ShippedDate', 'ReceiptDate', 'State', 'Commission', 'TotalPrice', 'action', 'PhoneNumberConsignKoi']);
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
                <><Tooltip title="Sao chép ID đơn ký gửi">
                    <Tag icon={<CopyOutlined/>}
                    onClick={() => copyToClipboard(text)}
                    style={{ cursor: 'pointer' }}
                    color="blue">{text}</Tag>
                    
                        
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
                <><Tooltip title="Sao chép ID người dùng">
                    <Tag
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(text)}
                        style={{ cursor: 'pointer' }}
                    color="blue">{text}</Tag>
                    
                        
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
                <> <Tooltip title="Sao chép ID Koi">
                    <Tag 
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(text)}
                        style={{ cursor: 'pointer' }}
                    color="blue">{text}</Tag>
                   
                   
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
            sorter: (a, b) => {
                if (!a.ReceiptDate && !b.ReceiptDate) return 0;
                if (!a.ReceiptDate) return -1;
                if (!b.ReceiptDate) return 1;
                return moment(a.ReceiptDate).diff(moment(b.ReceiptDate));
            },
            render: text => text ? moment(text).format('DD-MM-YYYY') : <Tag color="red">Không Cung Cấp</Tag>
        },
        {
            title: 'Ngày Tạo Đơn Ký Gửi',
            dataIndex: 'ConsignCreateDate',
            key: 'ConsignCreateDate',
            sorter: (a, b) => {
                if (!a.ConsignCreateDate && !b.ConsignCreateDate) return 0;
                if (!a.ConsignCreateDate) return -1;
                if (!b.ConsignCreateDate) return 1;
                return moment(a.ConsignCreateDate).diff(moment(b.ConsignCreateDate));
            },
            render: text => text ? moment(text).format('DD-MM-YYYY') : <Tag color="red">Không Cung Cấp</Tag>
        },
        {
            title: 'Địa Chỉ Nhận Hàng',
            dataIndex: 'AddressConsignKoi',
            key: 'AddressConsignKoi',
            sorter: (a, b) => a.AddressConsignKoi.localeCompare(b.AddressConsignKoi),
            render: text => text || <Tag color="red">Không Cung Cấp</Tag>,

        }, {
            title: 'Số Điện Thoại',
            dataIndex: 'PhoneNumberConsignKoi',
            key: 'PhoneNumberConsignKoi',
            sorter: (a, b) => {
                if (!a.PhoneNumberConsignKoi && !b.PhoneNumberConsignKoi) return 0;
                if (!a.PhoneNumberConsignKoi) return -1;
                if (!b.PhoneNumberConsignKoi) return 1;
                return a.PhoneNumberConsignKoi.localeCompare(b.PhoneNumberConsignKoi);
            },
            render: text => text || <Tag color="red">Không Cung Cấp</Tag>,

        },
        {
            title: 'Mô Tả',
            dataIndex: 'Detail',
            key: 'Detail',
            sorter: (a, b) => (a.Detail || '').localeCompare(b.Detail || ''),
            render: text => text || <Tag color="red">Không Cung Cấp</Tag>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'State',
            key: 'State',
            filters: [
                {text : 'Đã hủy', value: -1},
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
                    '-1': 'Đã hủy',
                    1: 'Yêu cầu ký gửi',
                    2: 'Đang kiểm tra Koi',
                    3: 'Đang thương thảo hợp đồng',
                    4: 'Đang tìm người mua',
                    5: 'Đã bán thành công',
                };
                
                return <Tag color={[ "blue", "green", "orange", "purple", "red"][state - 1]}>{stateMap[state]}</Tag> || <Tag color="red">Không xác định</Tag>;
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
    ].map(col => ({ ...col, visible: visibleColumns.includes(col.key) }));
    const handleColumnVisibility = (key, visible) => {
        setVisibleColumns(prev =>
            visible ? [...prev, key] : prev.filter(colKey => colKey !== key)
        );
    };
    const OPTIONS = [
        { value: '_id', label: 'ID' },
        { value: 'UserID', label: 'Mã Người Dùng' },
        { value: 'KoiID', label: 'Mã Koi' },
        { value: 'ShippedDate', label: 'Ngày Vận Chuyển' },
        { value: 'ReceiptDate', label: 'Ngày Nhận Hàng' },
        { value: 'State', label: 'Trạng Thái' },
        { value: 'Commission', label: 'Tỷ Lệ Hoa Hồng' },
        { value: 'TotalPrice', label: 'Tổng Giá' },
        { value: 'ConsignCreateDate', label: 'Ngày Tạo Đơn Ký Gửi' },
        { value: 'AddressConsignKoi', label: 'Địa Chỉ Nhận Hàng' },
        { value: 'PhoneNumberConsignKoi', label: 'Số Điện Thoại' },
        {value: 'Detail', label: 'Mô Tả'},
        { value: 'Method', label: 'Phương Thức' },
        { value: 'PositionCare', label: 'Vị Trí Chăm Sóc' },
        { value: 'action', label: 'Hành Động' },

    ];
    const filteredColumns = columns.filter(col => col.visible);
    // const columnSelectionMenu = (
    //     <Menu multiple>
    //         {columns.map(col => (
    //             <Menu.Item key={col.key}>
    //                 <Checkbox
    //                     checked={visibleColumns.includes(col.key)}
    //                     onChange={(e) => handleColumnVisibility(col.key, e.target.checked)}
    //                 >
    //                     {col.title}
    //                 </Checkbox>
    //             </Menu.Item>
    //         ))}
    //     </Menu>
    // );
    const handleChange = selectedItems => {
        const selectedValues = selectedItems.map(item => item.value); 
        setVisibleColumns(selectedValues);
    };
   

    const filteredOptions = OPTIONS.filter(o => !visibleColumns.includes(o));
    return (
        <div>
            <Space style={{ width: "100%" }} size={"large"}>
                
                <Input
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, marginBottom: 16 }}
                />
    <Tooltip title="Chọn cột hiển thị">
                <Select
                    labelInValue
                    allowClear
                    mode="multiple"
                    placeholder="Lựa chọn cột"
                    value={visibleColumns.map(col => ({ value: col, label: OPTIONS.find(opt => opt.value === col)?.label }))}
                    onChange={handleChange}
                    style={{
                        transform: "translateY(-8px)",
                        width: '100%',
                        minWidth: 200
                    }}
                >
                    {filteredOptions.map(item => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
                </Tooltip>
                {/* <Button onClick={() => setShowColumnSelector(true)} >Select Columns</Button>{activeFilters.map((filter, index) => (
                <FilterTag key={index} filter={filter} onRemove={removeFilter} />
                ))} */}
            </Space>
            <Table
                virtual
                scroll={{ x: 1300, y: 1500 }}
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
