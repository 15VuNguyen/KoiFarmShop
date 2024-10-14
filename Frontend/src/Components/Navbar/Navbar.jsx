import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/Navbar.css"; // Ensure this CSS file exists
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";
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
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);

    if (isLoggedIn) {
      toast.success("Đăng nhập thành công");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công!");
  };

  const handleStateSignIn = () => {
    navigate("/Login");
  };

  const handleStateSignUp = () => {
    navigate("/Login", { state: { type: "signUp" } });
    toast.info("Vui lòng đăng ký!");
  };

  return (
    <div
      className="navbar"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
      <div className="navbar-content">
        <img
          src="src/assets/logo.png"
          alt="Logo"
          style={{ width: "100px", borderRadius: "50px", height: "100px" }}
        />
        <div className="nav-links">
          <Link to="/" className="nav-link">
            TRANG CHỦ
          </Link>
          <Dropdown
            className="nav-dropdown"
            onMouseEnter={() => setShowDropdown1(true)}
            onMouseLeave={() => setShowDropdown1(false)}
            show={showDropdown1}
          >
            <Dropdown.Toggle
              id="dropdown-basic"
              className="nav-dropdown-toggle"
            >
              GIỚI THIỆU
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
                  NGUỒN GỐC CỦA IKOI
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/gioithieuvekoif1"
                  onMouseEnter={() => setActiveItem("/gioithieuvekoif1")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/gioithieuvekoif1" ? "active" : ""}
                >
                  GIỚI THIỆU VỀ CÁ KOI F1
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
                  GIỚI THIỆU VỀ CÁ KOI VIỆT
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
                  GIỚI THIỆU VỀ CÁ KOI NHẬT
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
              id="dropdown-basic"
              className="nav-dropdown-toggle"
            >
              Các Dòng Cá Koi
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
                  "kohaku",
                  "ogon",
                  "showa",
                  "tancho",
                  "bekko",
                  "doitsu",
                  "ginrin",
                  "goshiki",
                  "benigoi",
                  "asagi",
                  "platinum",
                  "shusui",
                ].map((fish, index) => (
                  <React.Fragment key={fish}>
                    <Dropdown.Item
                      href={`/${fish}`}
                      onMouseEnter={() => setActiveItem(`/${fish}`)}
                      onMouseLeave={() => setActiveItem(null)}
                      className={activeItem === `/${fish}` ? "active" : ""}
                    >
                      CÁ KOI {fish.toUpperCase()}
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
            >
              TIN TỨC
            </Dropdown.Toggle>
            <CSSTransition
              in={showDropdown3}
              timeout={300}
              classNames="dropdown"
              mountOnEnter
              unmountOnExit
            >
              <Dropdown.Menu className="custom-menu">
                {["kienthuckoi", "khuyenmai", "tintuc"].map((news, index) => (
                  <React.Fragment key={news}>
                    <Dropdown.Item
                      href={`/${news}`}
                      onMouseEnter={() => setActiveItem(`/${news}`)}
                      onMouseLeave={() => setActiveItem(null)}
                      className={activeItem === `/${news}` ? "active" : ""}
                    >
                      {news === "kienthuckoi"
                        ? "KIẾN THỨC KOI"
                        : news === "khuyenmai"
                        ? "KHUYẾN MÃI"
                        : "TIN TỨC CÔNG TY"}
                    </Dropdown.Item>
                    {index < 2 && <Dropdown.Divider />}
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
            >
              DỊCH VỤ
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
                  KOI KÝ GỬI
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/koikygui"
                  onMouseEnter={() => setActiveItem("/koikygui")}
                  onMouseLeave={() => setActiveItem(null)}
                  className={activeItem === "/koikygui" ? "active" : ""}
                >
                  KOI ĐANG BÁN
                </Dropdown.Item>
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>
          <Link
            to="/lienhe"
            className="nav-link"
            style={{ paddingLeft: "12px" }}
          >
            LIÊN HỆ
          </Link>
        </div>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                variant="success"
                className="custom-dropdown-toggle"
                style={{ borderRadius: "32px" }}
              >
                <CgProfile />
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item href="/profile" className="custom-dropdown-item">
                  Xem hồ sơ
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/trackingorder"
                  className="custom-dropdown-item"
                >
                  Đơn hàng
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/donkygui"
                  className="custom-dropdown-item"
                >
                  Đơn ký gửi
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
              <Button
                onClick={handleStateSignIn}
                variant="danger"
                className="custom-button"
              >
                Đăng Nhập
              </Button>
              <Button
                onClick={handleStateSignUp}
                variant="danger"
                className="custom-button"
              >
                Đăng Ký
              </Button>
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
