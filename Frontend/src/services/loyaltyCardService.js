import axiosInstance from "../An/Utils/axiosJS";

const getCard = async () => {
    return await axiosInstance.get('/loyaltyCard')
}
const registerLoyaltyCard = async (PhoneNumber, OTPCode) => {
    return await axiosInstance.post(`/loyaltyCard/create`,{PhoneNumber, OTPCode})
}
const sendOtpCode = async (PhoneNumber) => {
    return await axiosInstance.post(`/loyaltyCard/otpCode/send`,{PhoneNumber})
}
const checkDiscountPrice = async (ApplyDiscount) => {
    return await axiosInstance.post(`/loyaltyCard/checkPrice`,{ApplyDiscount},{withCredentials:true})
}
const getCardList = async () => {
    return await axiosInstance.get(`/loyaltyCard/allAbove`)
}

export {
    getCard,
    registerLoyaltyCard,
    sendOtpCode,
    checkDiscountPrice,
    getCardList
}