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

export {
    getCard,
    registerLoyaltyCard,
    sendOtpCode
}