import React, { useEffect, useState } from 'react'
import { useMessage } from '../../Context/MessageContext'
import { useChat } from '../../Context/ChatContext'
import { useSocketContext } from '../../Context/SocketContext'
import { getExistedChats } from '../../services/chatService'
import { fetchUser } from '../../services/userService'
import "./ManagerChat.css"

const ChatList = (props) => {
    const { show, setIsShowStaffChat, setCustomer, customer } = props
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
        setCustomer(c.OtherUser)
        setMessageList(c.Messages)
    }

    useEffect(() => {
        fetchExistedChats()
    }, [messageList, customer])

    useEffect(() => {
        const handleNewMessage = async (newMessage) => {
            const chatExists = listChat.some(chat => chat._id === newMessage.ChatId);
    
            if (chatExists) {
                setListChat(prevChats => prevChats.map(chat => {
                    if (chat._id.toString() === newMessage.ChatId.toString()) {
                        return {
                            ...chat,
                            Messages: [...chat.Messages, newMessage]
                        };
                    }
                    return chat;
                }));
            } else {
                try {
                    const { data: userData } = await fetchUser(newMessage.SenderId);
                    if (userData) {
                        setListChat(prevChats => [
                            ...prevChats,
                            {
                                _id: newMessage.ChatId,
                                OtherUser: userData.result,
                                Messages: [newMessage]
                            }
                        ]);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };
    
        socket?.on('newMessage', handleNewMessage);
    
        return () => {
            socket?.off('newMessage', handleNewMessage);
        };
    }, [socket]);
    

    return (
        <div
            className={`list-chat ${show ? "" : "hide"}`}
        >
            {listChat && listChat.length > 0 ?
                listChat.map(c => (
                    <div
                        key={c._id}
                        className='mchat-container'
                        onClick={() => showBoxChat(c)}
                    >
                        {((c.OtherUser?.picture && c.OtherUser?.picture.trim()) || (c.OtherUser?.Image && c.OtherUser?.Image.trim()))
                            ? <img className='avatar' src={c.OtherUser?.picture ? c.OtherUser.picture : c.OtherUser.Image} alt='avatar' />
                            : <i className="avatar fa-solid fa-user"></i>
                        }

                        <div className='content'>
                            <p className='name'>{c.OtherUser.name}</p>
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
