import React, { useState, useEffect, useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/Navbar.css"; // Ensure this CSS file exists
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showDropdown4, setShowDropdown4] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);

    // Check localStorage for toast state
    const hashShowToastState = localStorage.getItem("hashShowToast");
    if (isLoggedIn && hashShowToastState !== "true") {
      toast.success("Đăng nhập thành công!");
      localStorage.setItem("hashShowToast", "true");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/", { state: { message: "Đăng Xuất Thành Công" } });
    window.location.reload();
  };

  const handleStateSignIn = () => {
    navigate("/Login");
  };

  const handleStateSignUp = () => {
    navigate("/Login", { state: { type: "signUp" } });
  };

  return (
    <div
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`} // Add class based on scroll
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="navbar-content">
        <a href="/">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{ width: "100px", borderRadius: "50px", height: "100px" }}
          />
        </a>
        <div className="nav-links">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="nav-dropdown-toggle"
              href="/"
            >
              Trang chủ
            </Dropdown.Toggle>
          </Dropdown>

          <Dropdown
            className="nav-dropdown"
            onMouseEnter={() => setShowDropdown1(true)}
            onMouseLeave={() => setShowDropdown1(false)}
            show={showDropdown1}
          >
            <Dropdown.Toggle
              id="dropdown-basic"
              className="nav-dropdown-toggle"
              href="/gioithieu"
            >
              Giới thiệu
            </Dropdown.Toggle>
            <CSSTransition
              in={showDropdown1}
              timeout={300}
              classNames="dropdown"
              mountOnEnter
              unmountOnExit
            >
              <Dropdown.Menu className="custom-menu">
                <Dropdown.Item
                  href="/nguongocIKoi"
                  onMouseEnter={() => setActiveItem("/nguongocIKoi")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/nguongocIKoi" ? "active" : ""}
                >
                  Nguồn gốc của IKoi
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/gioithieuvekoif1"
                  onMouseEnter={() => setActiveItem("/gioithieuvekoif1")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/gioithieuvekoif1" ? "active" : ""}
                >
                  Giới thiệu về Koi F1
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/gioithieuvekoiviet"
                  onMouseEnter={() => setActiveItem("/gioithieuvekoiviet")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={
                    activeItem === "/gioithieuvekoiviet" ? "active" : ""
                  }
                >
                  Giới thiệu về Koi Việt
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/gioithieuvekoinhat"
                  onMouseEnter={() => setActiveItem("/gioithieuvekoinhat")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={
                    activeItem === "/gioithieuvekoinhat" ? "active" : ""
                  }
                >
                  Giới thiệu về Koi Nhật
                </Dropdown.Item>
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>

          <Dropdown
            className="nav-dropdown"
            onMouseEnter={() => setShowDropdown2(true)}
            onMouseLeave={() => setShowDropdown2(false)}
            show={showDropdown2}
          >
            <Dropdown.Toggle
              href="/cakoinhat"
              id="dropdown-basic"
              className="nav-dropdown-toggle"
            >
              Các dòng cá Koi
            </Dropdown.Toggle>
            <CSSTransition
              in={showDropdown2}
              timeout={300}
              classNames="dropdown"
              mountOnEnter
              unmountOnExit
            >
              <Dropdown.Menu className="custom-menu">
                {[
                  "Kohaku",
                  "Ogon",
                  "Showa",
                  "Tancho",
                  "Bekko",
                  "Doitsu",
                  "Ginrin",
                  "Goshiki",
                  "Benigoi",
                  "Asagi",
                  "Platinum",
                  "Shusui",
                ].map((fish, index) => (
                  <React.Fragment key={fish}>
                    <Dropdown.Item
                      href={`/${fish}`}
                      onMouseEnter={() => setActiveItem(`/${fish}`)}
                      onMouseLeave={() => setActiveItem(null)}
                      className={activeItem === `/${fish}` ? "active" : ""}
                    >
                      Cá Koi {fish}
                    </Dropdown.Item>
                    {index < 11 && <Dropdown.Divider />}
                  </React.Fragment>
                ))}
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>

          <Dropdown
            className="nav-dropdown"
            onMouseEnter={() => setShowDropdown3(true)}
            onMouseLeave={() => setShowDropdown3(false)}
            show={showDropdown3}
          >
            <Dropdown.Toggle
              id="dropdown-basic"
              className="nav-dropdown-toggle"
              href="/kienthuckoi"
            >
              Tin tức
            </Dropdown.Toggle>
            <CSSTransition
              in={showDropdown3}
              timeout={300}
              classNames="dropdown"
              mountOnEnter
              unmountOnExit
            >
              <Dropdown.Menu className="custom-menu">
                {["kienthuckoi"].map((news, index) => (
                  <React.Fragment key={news}>
                    <Dropdown.Item
                      href={`/${news}`}
                      onMouseEnter={() => setActiveItem(`/${news}`)}
                      onMouseLeave={() => setActiveItem(null)}
                      className={activeItem === `/${news}` ? "active" : ""}
                    >
                      {news === "kienthuckoi" ? "Kiến thức Koi" : "OTHER VALUE"}{" "}
                      {/* Replace "OTHER VALUE" with desired text */}
                    </Dropdown.Item>
                    {index < 2}
                  </React.Fragment>
                ))}
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>

          <Dropdown
            className="nav-dropdown"
            onMouseEnter={() => setShowDropdown4(true)}
            onMouseLeave={() => setShowDropdown4(false)}
            show={showDropdown4}
          >
            <Dropdown.Toggle
              id="dropdown-basic"
              className="nav-dropdown-toggle"
              href="/koidangban"
            >
              Dịch vụ
            </Dropdown.Toggle>
            <CSSTransition
              in={showDropdown4}
              timeout={300}
              classNames="dropdown"
              mountOnEnter
              unmountOnExit
            >
              <Dropdown.Menu className="custom-menu">
                <Dropdown.Item
                  href="/kygui"
                  onMouseEnter={() => setActiveItem("/kygui")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/kygui" ? "active" : ""}
                >
                  Koi ký gửi
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/koidangban"
                  onMouseEnter={() => setActiveItem("/koidangban")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/koidangban" ? "active" : ""}
                >
                  Koi đang bán
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/lonhapkhau" // Thêm liên kết đến trang lô nhập khẩu
                  onMouseEnter={() => setActiveItem("/lonhapkhau")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/lonhapkhau" ? "active" : ""}
                >
                  Lô nhập khẩu
                </Dropdown.Item>
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              href="/lienhe"
              className="nav-dropdown-toggle"
            >
              Liên hệ
            </Dropdown.Toggle>
          </Dropdown>
        </div>

        <div className="auth-links">
          {isLoggedIn ? (
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                variant="success"
                className="custom-dropdown-toggle"
                style={{ borderRadius: "32px" }}
                href="/profile"
              >
                <CgProfile />
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item href="/profile" className="custom-dropdown-item">
                  Xem hồ sơ
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/trackingorderpage"
                  className="custom-dropdown-item"
                >
                  Đơn hàng
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/donkyguipage"
                  className="custom-dropdown-item"
                >
                  Đơn ký gửi
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/changepasswordpage"
                  className="custom-dropdown-item"
                >
                  Thay đổi mật khẩu
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={handleLogout}
                  className="custom-dropdown-item"
                >
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Link
                to="/Login"
                className="nav-link"
                style={{ marginLeft: "10px", color: "white" }}
              >
                Đăng Nhập
              </Link>
              <Link
                to="/Login"
                state={{ type: "signUp" }}
                className="nav-link"
                style={{ marginLeft: "10px", color: "white" }}
              >
                Đăng Ký
              </Link>
            </>
          )}
          <Link
            to="/cart"
            style={{
              color: "white",
              fontSize: "25px",
              paddingLeft: "20px",
              marginLeft: "10px",
            }}
          >
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}
