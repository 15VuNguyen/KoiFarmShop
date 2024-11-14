import axiosInstance from "../An/Utils/axiosJS";

const fetchLoginUserData = async () => {
    return await axiosInstance.get('/users/me')
}

const getManager = async () => {
    return await axiosInstance.get('/getManagerInfoForChat')
}

const fetchUser = async (userID) => {
    return await axiosInstance.get(`/getUserInfoForChat/${userID}`)
}
const checkRole = async () => {
    return await axiosInstance.post("http://localhost:4000/authorization");
  }
export {
    fetchLoginUserData,
    getManager,
    fetchUser,
    checkRole
}