import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "./An/Components/Spinner";
// import { message } from "antd";
import { fetchLoginUserData } from "./services/userService";
import { useAuth } from "./Context/AuthContext";
export default function Login() {
  const [params] = useSearchParams(); //lấy ra các params trong url
  const navigate = useNavigate(); //hàm dùng để chuyển hướng trang
  const {setCurrentUser} = useAuth()

  const fetchUser = async () => {
    try {
      const { data } = await fetchLoginUserData();
        if (data && data.result) {
          setCurrentUser(data.result)
          localStorage.setItem("userInfo", JSON.stringify(data.result))
        }
    } catch (error) {
      console.error({message: error.message})
    }
  }
  useEffect(() => {
    console.log(params); //log thử xem params có gì
    const accessToken = params.get("access_token"); //lấy ra access_token từ params
    const refreshToken = params.get("refresh_token"); //lấy ra refresh_token từ params
    const new_user = params.get("new_user"); //lấy ra new_users từ params, để biết có phải lần đầu login hay không
    const verify = params.get("verify"); //lấy ra verify từ params
    //verify để biết user này mới hay cũ, đã login nhiều lần nhưng chưa verify thì sao

    console.log({ accessToken, refreshToken, new_user, verify, params }); //log thử

    localStorage.setItem("accessToken", accessToken); //lưu access_token vào localStorage
    localStorage.setItem("refreshToken", refreshToken); //lưu refresh_token vào localStorage
    fetchUser()
    navigate("/"); //xem xong thì bật dòng này để chuyển hướng về trang chủ
  }, [params]); //useEffect sẽ chạy lại khi params thay đổi
  return <Spinner/>
}
