import axiosInstance from "../An/Utils/axiosJS"

const getMessages = async (id) => {
    return await axiosInstance.get(`/chat/message/get/${id}`)
}

const sendMessages = async (id,content) => {
    return await axiosInstance.post(`/chat/message/send/${id}`,{content})
}

export {
    getMessages,
    sendMessages
}