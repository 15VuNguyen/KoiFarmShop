import React from "react";
import { Layout, Menu, Avatar, Typography, Dropdown, Space, Button, Tooltip, message } from "antd";
import { RxAvatar } from "react-icons/rx";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import "../Css/reponsive.css";
import 'antd/dist/reset.css';
import ManagerChat from "../../../Components/Chat/ManagerChat";

const { Header, Content } = Layout;
const SelfCheckContext = React.createContext();

export default function AnTopBar({ children, name, role }) {

    const navigate = useNavigate();
    const location  = useLocation();

    const useAuthCheck = () => {
       
        const navigate = useNavigate();
        const { checkRole } = useAuth();

        React.useEffect(() => {
            const fetchRole = async () => {
                try {
                    const role = await checkRole();

                    if (role !== "Manager") {
                        navigate("/", { replace: true });
                        message.error("Bạn không có quyền truy cập vào trang này!");
                    }
                } catch (error) {
                    console.error("Error checking role:", error);
                    navigate("/", { replace: true });
               
                }
            };
        

            fetchRole();
        }, [checkRole, navigate]);

        return null;
    };
    React.useEffect(() => {
        if (location.pathname === "/NewDashBoard") {
            
            navigate("/NewDashBoard/staff/Profiles");
        }
    }, [])
    const { logout } = useAuth();

    const chartMenu = [
        {
            key: '1',
            label: (
                <Link to="/NewDashBoard/staff/Report/BarChart">
                    Biểu Đồ Cột 
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/NewDashBoard/staff/Report/LineChart">Biểu Đồ Đường</Link>
            ),
        }

    ];
    
    const items = [
        {
            key: '1',
            label: (
                <Link to="/NewDashBoard/staff/Profiles">
                    Hồ Sơ
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/NewDashBoard/staff/Consigns">Quản Lý Đơn Ký Gửi</Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="/NewDashBoard/staff/Suppliers">Quản Lý Nhà Cung Cấp</Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link to="/NewDashBoard/staff/Invoices">Quản Lý Hóa Đơn</Link>
            ),
        },{
            key: '5',
            label: (
                <Link to="/NewDashBoard/staff/Orders">Quản Lý Đơn Hàng</Link>
            ),
        },{
            key: '6',
            label: (
                <Link to="/NewDashBoard/staff/Kois">Quản Lý Cá Koi</Link>
            ),

        },{
            key : '7',
            label : (
            
                <Typography.Link onClick={logout}> Đăng Xuất </Typography.Link>
                
            )
        }
    ];
    const mainMenu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/NewDashBoard/staff/Profiles">Hồ Sơ</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/NewDashBoard/staff/Consigns">Quản Lý Đơn Ký Gửi</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/NewDashBoard/staff/Suppliers">Quản Lý Nhà Cung Cấp</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/NewDashBoard/staff/Invoices">Quản Lý Hóa Đơn</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to="/NewDashBoard/staff/Orders">Quản Lý Đơn Hàng</Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/NewDashBoard/staff/Kois">Quản Lý Cá Koi</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="7" onClick={logout}>
                Đăng Xuất
            </Menu.Item>
        </Menu>
    );

    useAuthCheck();

    return (
<>
            <Layout>
                <Header className="topbar-header" style={{ background: "#001529", padding: "0 20px" }}>
                    <div className="logo" style={{ float: "left", color: "white", fontSize: "1.5rem" }}>
                        IKOI
                    </div>
                    <Space size="large">
                        <Dropdown menu={{
                            items,
                        }} trigger={['click']} className="menu-dropdown">
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{ color: 'white' }}>
                                Danh Mục Quản Lý
                            </a>
                        </Dropdown>
                        <Typography.Link style={{ color: "white" }} 
                            href="/NewDashBoard/staff/Report"
                        >Báo Cáo</Typography.Link>
                    </Space>
                    <div className="topbar-right" style={{ float: "right" }}>
                        <Typography.Text className="hide-on-mobile" style={{ color: "white", marginRight: "10px" }}>
                            Xin chào {name} Quản Lý {role}
                        </Typography.Text>
                        <Link to='/profile'>
                            <Avatar icon={<RxAvatar />} />
                        </Link>
                    </div>
                </Header>
                <Content style={{ padding: "20px", minHeight: "100vh" }}>
                    {children}
                    <Outlet />
                </Content>
            </Layout>
            <ManagerChat />
      </>
    );
}

export { SelfCheckContext };
