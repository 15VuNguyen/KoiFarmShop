import React, { useEffect, useState, useRef } from 'react'
import { useMessage } from '../../Context/MessageContext'
import { useChat } from '../../Context/ChatContext'
import { useSocketContext } from '../../Context/SocketContext'
import { getExistedChats } from '../../services/chatService'
import { fetchUser } from '../../services/userService'
import "./ManagerChat.css"

const ChatList = (props) => {
    const { show, setIsShowStaffChat, setCustomer, customer } = props
    const [listChat, setListChat] = useState([])
    const listChatRef = useRef(listChat) // Reference to track the latest state of listChat
    const { messageList, setMessageList } = useMessage()
    const { setSelectedChat } = useChat()
    const { socket } = useSocketContext()

    const fetchExistedChats = async () => {
        const { data } = await getExistedChats()
        if (data) {
            console.log("list chat: ", data.result)
            setListChat(data.result)
            listChatRef.current = data.result // Update the ref with the latest data
        }
    }

    const showBoxChat = (c) => {
        setIsShowStaffChat(true)
        setSelectedChat(c)
        setCustomer(c.OtherUser)
        setMessageList(c.Messages)
        setListChat(prevChats => {
            const chatExists = prevChats.some(chat => chat._id === c._id)
            if (!chatExists) {
                return [...prevChats, c]
            }
            return prevChats
        })
    }

    useEffect(() => {
        fetchExistedChats()
    }, [messageList, customer])

    useEffect(() => {
        const handleNewMessage = async (newMessage) => {
            const chatExists = listChatRef.current.some(chat => chat._id === newMessage.ChatId);

            if (chatExists) {
                setListChat(prevChats => {
                    const updatedChats = prevChats.map(chat => {
                        if (chat._id.toString() === newMessage.ChatId.toString()) {
                            return {
                                ...chat,
                                Messages: [...chat.Messages, newMessage]
                            };
                        }
                        return chat;
                    });
                    listChatRef.current = updatedChats; // Update the ref with the new state
                    return updatedChats;
                });
            } else {
                console.log("Adding new chat entry for new message.")
                try {
                    const { data: userData } = await fetchUser(newMessage.SenderId);
                    if (userData) {
                        setListChat(prevChats => {
                            // Check again before adding to avoid duplicates
                            const updatedChatExists = prevChats.some(chat => chat._id === newMessage.ChatId);
                            if (!updatedChatExists) {
                                return [
                                    ...prevChats,
                                    {
                                        _id: newMessage.ChatId,
                                        OtherUser: userData.result,
                                        Messages: [newMessage]
                                    }
                                ];
                            }
                            return prevChats;
                        });
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

    useEffect(() => {
        listChatRef.current = listChat; // Update the ref whenever listChat changes
    }, [listChat]);

    return (
        <div className={`list-chat ${show ? "" : "hide"}`}>
            {listChat && listChat.length > 0 ? (
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
                            <p className='lastMess'>
                                {c.Messages.length > 0 ? c.Messages[c.Messages.length - 1].Content : "No messages yet"}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ padding: "30px" }}>FIND SOMEONE TO CHAT</p>
            )}
        </div>
    );
}

export default ChatList;
