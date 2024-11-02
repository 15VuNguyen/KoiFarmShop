import React from "react";
import { Layout, Menu, Avatar, Typography, Dropdown } from "antd";
import { RxAvatar } from "react-icons/rx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

import 'antd/dist/reset.css'; 
import ManagerChat from "../../../Components/Chat/ManagerChat";
const { Header, Content } = Layout;
 const SelfCheckContext = React.createContext();
export default function AnTopBar({ children, name, role }) {
    const [isCheckingSelf, setIsCheckingSelf] = React.useState(false);
   
    const useAuthCheck = () => {
        const navigate = useNavigate();
        const { checkRole } = useAuth();
      
        React.useEffect(() => {
          const fetchRole = async () => {
            try {
              const role = await checkRole();
              
              if (role !== "Staff" && role !== "Manager") {
                navigate("/login", { replace: true });
              }
            } catch (error) {
              console.error("Error checking role:", error);
              navigate("/login", { replace: true });
            }
          };
      
          fetchRole();
        }, [checkRole, navigate]);
      
        return null;
      };
    const { logout } = useAuth();

    const menuItems = [
        { key: "1", label: <Link to="/NewDashBoard/staff/Profiles">Hồ Sơ</Link> },
        { key: "2", label: <Link to="/DashBoard/staff/Orders">Đơn Hàng</Link> },
        { key: "3", label: <Link to="/NewDashBoard/staff/Consigns">Quản Lý Đơn Ký Gửi</Link> },
        { key: "4", label: <Link to="/DashBoard/manager/ManageKoi">Quản Lý Cá Koi</Link> },
        { key: "5", label: <Link to="/NewDashBoard/staff/Suppliers">Quản Lý Nhà Cung Cấp</Link> },
        { key: "6", label: <Link to="/NewDashBoard/staff/Invoices">Quản Lý Hóa Đơn</Link> },
        {key: "8" , label: <Link to="/NewDashBoard/staff/Orders">Quản Lý Đơn Hàng</Link>},
        { key: "9", label: <Link to="/NewDashBoard/staff/Kois">Quản Lý Cá Koi</Link> },
        { type: "divider" },
        { key: "10", label: <p onClick={logout}>Đăng Xuất</p> },
    ];

    const menu = <Menu items={menuItems} />;
    useAuthCheck();
    return (
      <SelfCheckContext.Provider value={{ isCheckingSelf, setIsCheckingSelf }}>
        <Layout>
          <Header className="topbar-header" style={{ background: "#001529", padding: "0 20px" }}>
            <div className="logo" style={{ float: "left", color: "white", fontSize: "1.5rem" }}>
              IKOI
            </div>
            
            <Dropdown overlay={menu} trigger={['click']} className="menu-dropdown">
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{color:'white'}}>
                Menu Quản Lý
              </a>
            </Dropdown>
            <div className="topbar-right" style={{ float: "right" }}>
              <Typography.Text style={{ color: "white", marginRight: "10px" }}>
                Xin chào {name} Quản Lý {role}
              </Typography.Text>
              <Link to='/profile'>
                <Avatar 
                  icon={<RxAvatar />} 
                />
              </Link>
            </div>
          </Header>
          <Content style={{ padding: "20px", minHeight: "100vh" }}>
            {children}
            <Outlet />
          </Content>
        </Layout>
        <ManagerChat/>
      </SelfCheckContext.Provider>
    );
}


export { SelfCheckContext };