import axiosInstance from "../An/Utils/axiosJS";

const getExistedChats = async () => {
    return await axiosInstance.get('/chat')
}
const createNewChats = async (receiveId) => {
    return await axiosInstance.post(`/chat/create/${receiveId}`)
}

export {
    getExistedChats,
    createNewChats
}