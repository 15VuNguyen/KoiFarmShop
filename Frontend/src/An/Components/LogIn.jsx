import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResetPasswordModal } from "../Pages/ResetPasswordPage ";
function SignInForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showResetPasswordModal, setShowResetPasswordModal] =
    React.useState(false);
  const { googleAuthUrl, login, checkRole } = useAuth();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("forgot_password_secrect_token");
    if (token) {
      console.log(token);
      setShowResetPasswordModal(true);
      return;
    }
  }, []);
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    // Perform the login and navigate after a successful login

    try {
      const response = await login(email, password);
      if (response) {
        const from = location.state?.from?.pathname || "/";
        const selectedItem = location.state?.selectedItem || null;
        checkRole().then((result) => {
          if (result === "Staff") {
            toast.success("Login successfully");
            navigate("/DashBoard/staff/Profiles");
          } else if (result === "Manager") {
            toast.success("Login successfully");
            navigate("/NewDashBoard/staff/Profiles");
          }
        });
        toast.success("Login successfully");
        navigate(from, { state: { selectedItem } });
      }
    } catch (error) {
      console.error("Failed to login", error.data);
      if (error.response.data.message === "Validation error") {
        toast.error("Password or Email is required");
      }
    }

    // Clear the input fields
    setState({ email: "", password: "" });
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <ResetPasswordModal
        show={showResetPasswordModal}
        handleClose={() => {
          setShowResetPasswordModal(false);
        }}
        signInLink="/login"
        buttonLink="/login"
      />
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <Link to={googleAuthUrl} className="social">
            <FaGoogle />
          </Link>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <p
          onClick={() => {
            setShowResetPasswordModal(true);
          }}
        >
          forgot your password?
        </p>
        <button>Sign In</button>
      </form>
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
    </div>
  );
}

export default SignInForm;
