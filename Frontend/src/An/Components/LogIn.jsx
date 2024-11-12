import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResetPasswordModal } from "../Pages/ResetPasswordPage ";
import "../Css/SignUp.css";
import { Tooltip, Typography } from "antd";
import { message } from "antd";
function SignInForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const { googleAuthUrl, login, checkRole } = useAuth();
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const token = localStorage.getItem("forgot_password_secrect_token");
    if (token) {
      setShowResetPasswordModal(true);
    }
  }, []);

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    const newErrors = {
      email: email ? "" : "Email là bắt buộc",
      password: password ? "" : "Mật khẩu là bắt buộc",
    };
    setErrors(newErrors);

    if (!email || !password) return;

    try {
      const response = await login(email, password);
      if (response) {
        const from = location.state?.from?.pathname || "/";
        const selectedItem = location.state?.selectedItem || null;
        checkRole().then((result) => {
          const redirectPath =
            result === "Manager"
              ? "/NewDashBoard/staff/Profiles"
              : "/profile";
          message.success("Đăng nhập thành công");
          navigate(redirectPath);
        });
        navigate(from, { state: { selectedItem } });
      }
    } catch (error) {
      console.error("Failed to login", error.response);
      if (error.response.data.errors.email === "Email or password is incorrect") {
        message.error('Email hoặc mật khẩu không chính xác');
        return;
      }
      if (error.response.data.errors.email)
        message.error(error.response.data.errors.email);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <ResetPasswordModal
        show={showResetPasswordModal}
        handleClose={() => setShowResetPasswordModal(false)}
        signInLink="/login"
        buttonLink="/login"
      />
      <form onSubmit={handleOnSubmit}>
        <h1>Đăng nhập</h1>

        <div className="social-container">
          <Tooltip title="đăng nhập bằng google">
            <Link to={googleAuthUrl} className="social">

              <FaGoogle />

            </Link>
          </Tooltip>
        </div>

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder={errors.email ? errors.email : "Email"}
          className={`input-field ${errors.email ? "error-input" : ""}`}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder={errors.password ? errors.password : "Mật khẩu"}
          className={`input-field ${errors.password ? "error-input" : ""}`}
        />
        <Typography.Link onClick={() => setShowResetPasswordModal(true)}>
          <Tooltip title="Ấn vào đây để đặt lại mật khẩu">

            Quên mật khẩu?
          </Tooltip>
        </Typography.Link>
        <button>Đăng nhập</button>
      </form>
      
    </div>
  );
}

export default SignInForm;
