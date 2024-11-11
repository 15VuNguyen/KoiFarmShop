import axiosInstance from "../An/Utils/axiosJS";

const createOrder = async (userData, ApplyDiscount) => {
    return axiosInstance.post('/order/create',{userData, ApplyDiscount},{withCredentials: true})
}

const getOrderDetail = async () => {
    return axiosInstance.get('/order/detail',{withCredentials: true})
}

export {
    createOrder,
    getOrderDetail
}