import React, { useState } from "react";
import "../Css/Login.css";
import SignInForm from "../Components/LogIn";
import SignUpForm from "../Components/SignUp";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation(); // Get the location object
  const initialType = location.state?.type || "signIn";
  const [type, setType] = useState(initialType);
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container-form " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <div
        className={containerClass}
        id="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Chào mừng quay lại!</h1>
              <p>
                Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Xin chào, Bạn!</h1>
              <p>Nhập thông tin cá nhân của bạn và bắt đầu hành trình cùng chúng tôi</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
