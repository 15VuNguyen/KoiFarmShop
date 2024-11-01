import React, { useEffect, useState } from 'react'
import { useMessage } from '../../Context/MessageContext'
import { useChat } from '../../Context/ChatContext'
import { useSocketContext } from '../../Context/SocketContext'
import { getExistedChats } from '../../services/chatService'
import { fetchUser } from '../../services/userService'

const ChatList = (props) => {
    const { show, setIsShowStaffChat, setCustomer } = props
    const [listChat, setListChat] = useState([])
    const { messageList, setMessageList } = useMessage()
    const { setSelectedChat } = useChat()
    const { socket } = useSocketContext()

    const fetchExistedChats = async () => {
        const { data } = await getExistedChats()
        if (data) {
            console.log("list chat: ", data.result)
            setListChat(data.result)
        }
    }

    const showBoxChat = (c) => {
        setIsShowStaffChat(true)
        setSelectedChat(c)
        setCustomer(c.otherUser)
        setMessageList(c.messages)
    }

    useEffect(() => {
        fetchExistedChats()
    }, [messageList])

    useEffect(() => {
        const handleNewMessage = async (newMessage) => {
            setListChat(prevChats => {
                const chatExists = prevChats.some(chat => chat._id === newMessage.ChatId)

                if (chatExists) {
                    return prevChats.map(chat => {
                        if (chat._id === newMessage.ChatId) {
                            return {
                                ...chat,
                                Messages: [...chat.Messages, newMessage]
                            }
                        }
                        return chat
                    })
                }
                return prevChats
            })

            const existingChat = listChat.find(chat => chat._id === newMessage.ChatId)
            if (!existingChat) {
                const { data: userData } = await fetchUser(newMessage.SenderId)
                if (userData) {
                    setListChat(prevChats => [
                        ...prevChats,
                        {
                            _id: newMessage.chatId,
                            OtherUser: userData,
                            Messages: [newMessage]
                        }
                    ])
                }
            }
        }

        socket?.on('newMessage', handleNewMessage)

        return () => {
            socket?.off('newMessage', handleNewMessage)
        }
    }, [socket, listChat])

    return (
        <div className={`list-chat ${show ? "" : "hide"}`}>
            {listChat && listChat.length > 0 ?
                listChat.map(c => (
                    <div
                        key={c._id}
                        className='chat-container'
                        onClick={() => showBoxChat(c)}
                    >
                        <i className="avatar fa-solid fa-user"></i>
                        <div className='content'>
                            <p className='name'>{c.OtherUser.username}</p>
                            <p className='lastMess'>{c.Messages.length > 0
                                ? c.Messages[c.Messages.length - 1].Content
                                : "No messages yet"}</p>
                        </div>
                    </div>
                ))
                :
                <p style={{ padding: "30px" }}>FIND SOMEONE TO CHAT</p>
            }
        </div>
    )
}

export default ChatList
