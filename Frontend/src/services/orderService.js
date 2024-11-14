import axiosInstance from "../An/Utils/axiosJS";

const createOrder = async (userData, ApplyDiscount,PaymentMethod) => {
    return axiosInstance.post('/order/create',{userData, ApplyDiscount, PaymentMethod},{withCredentials: true})
}

const getOrderDetail = async () => {
    return axiosInstance.get('/order/detail',{withCredentials: true})
}

export {
    createOrder,
    getOrderDetail
}