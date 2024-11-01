import React, { useEffect, useState } from 'react'
import { fetchLoginUserData, getManager } from '../../services/userService';
import BoxChat from './BoxChat';
import ChatButton from './ChatButton';
import "./CustomerChat.css"
import { useChat } from '../../Context/ChatContext';
import { useMessage } from '../../Context/MessageContext';
import { createNewChats } from '../../services/chatService';

const CustomerChat = () => {
  const [isShow, setIsShow] = useState(false);
  const [manager, setManager] = useState({});
  const [user, setUser] = useState({});
  const {setSelectedChat} = useChat()
  const { setMessageList } = useMessage()

    const fetchManager = async () => {
        try {
          const { data } = await getManager()
          if (data) {
            console.log("manager: ", data)
            setManager(data.result)
          }
        } catch (error) {
          console.error({ message: error.message })
        }
      }
    
      const fetchUser = async () => {
        try {
          const { data } = await fetchLoginUserData()
          if (data) {
            console.log("user: ", data.result)
            setUser(data.result)
          }
        } catch (error) {
          console.error({ message: error.message })
        }
      }

      const findChat = async() => {
        try {
            const {data} = await createNewChats(manager._id)
            if(data){
                console.log("data: ", data)
                setSelectedChat(data.result)
                setMessageList(data.result.Messages)
                localStorage.setItem('selectedChat', JSON.stringify(data.result))
            }
        } catch (error) {  
            console.error({ message: error.message })
        }
    }
    useEffect(() => {
      if (isShow && manager._id) {  // Only call findChat if isShow is true and manager is loaded
        findChat();
      }
    }, [isShow, manager]);

    useEffect(() => {
      const savedChat = localStorage.getItem('selectedChat');
      if (savedChat) {
          setSelectedChat(JSON.parse(savedChat));
          setMessageList(JSON.parse(savedChat).Messages)
      } 
  }, []);
    
      useEffect(() => {
        fetchUser()
      }, [])
    
      useEffect(() => {
        fetchManager()
      }, [])

  return (
    <div className='chat-container'>
          <BoxChat
            show={isShow}
            setShow={setIsShow}
            receiver={manager}
            user={user}
          />
          <ChatButton
            show={isShow}
            setShow={setIsShow}
          />
        </div>
  )
}

export default CustomerChat