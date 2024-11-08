import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../An/Utils/axiosJS";
import { fetchLoginUserData } from "../services/userService";
;
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
  const [loading, setLoading] = useState(false); // cái này đụng vào sau 
  
 
  const  checkRole = async () => {
    const response = await axiosInstance.post("http://localhost:4000/authorization");
    const result = response.data.result;
      switch(result){
        case 1:
          return "User";
        case 2:
          return "Staff";
        case 3:
          return "Manager";
        default:
          return null;
      }
  }
  // Function to sign in with Google
 const login = async (email, password) => {
    const response = await axios.post("http://localhost:4000/users/login", { email, password });
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.result.access_token);
      localStorage.setItem("refreshToken", response.data.result.refresh_token);
      const { data } = await fetchLoginUserData();
        if (data && data.result) {
          setCurrentUser(data.result)
          localStorage.setItem("userInfo", JSON.stringify(data.result))
        }
      return true;
    }
    return false;
  }
  const  register = (name, email,password, confirm_password,date_of_birth ) =>{
    return axios.post("http://localhost:4000/users/register", {name, email,password,confirm_password});
  }
  // Function to sign out
  const logout = () => {
    localStorage.removeItem("accessToken"); //xóa access token trong localStorage
    localStorage.removeItem("refreshToken"); //xóa refresh token trong localStorage
    localStorage.removeItem("userInfo"); 
    window.location.reload(); //reload lại trang
  };
  const setAuthenticatedUser = async (access_token,refresh_token) => {
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return
  }
  // Set up an effect to handle authentication state changes
  

  // Provide the authentication state and functions to children components
 
  const getGoogleAuthUrl = () => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env; //import vào .env của Vite
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const query = {
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "), //các quyền truy cập, và chuyển thành chuỗi cách nhau bằng space
      prompt: "consent", //nhắc người dùng đồng ý cho phép truy cập
      access_type: "offline", //truy cập offline giúp lấy thêm refresh token
    };
    return `${url}?${new URLSearchParams(query)}`; //URLSearchParams(hàm có sẵn): tạo ra chuỗi query dạng key=value&key=value để làm query string
  };
  const googleAuthUrl = getGoogleAuthUrl();
   const value = {
    currentUser,
    setCurrentUser,
    logout,
    googleAuthUrl, // dùng link này để login với google,
    register,
    login,
    setAuthenticatedUser,
    checkRole
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
