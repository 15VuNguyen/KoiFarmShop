import React, { useEffect } from 'react'
import { useChat } from '../../Context/ChatContext'
import { createNewChats } from '../../services/chatService'
import { useMessage } from '../../Context/MessageContext'

const ChatButton = (props) => {
    const { show, setShow, receiver } = props 
    const {setSelectedChat} = useChat()
    const { setMessageList } = useMessage()

    const showBoxChat = () => {
        setShow(!show)
    }

    const findChat = async() => {
        try {
            const {data} = await createNewChats(receiver._id)
            if(data){
                setSelectedChat(data.result)
                setMessageList(data.result.messages)
                localStorage.setItem('selectedChat', JSON.stringify(data.result))
            }
        } catch (error) {  
            console.error({ message: error.message })
        }
    }

    useEffect(() => {
        const savedChat = localStorage.getItem('selectedChat');
        if (savedChat) {
            setSelectedChat(JSON.parse(savedChat));
        } else if (show && receiver) {
            findChat();
        }
    }, [show, receiver]);
    

    return (
        <div className='btn-container'>
            <i
                className={`chat-btn ${show ? 'fa-solid fa-xmark' : 'fa-regular fa-comments'}`}
                onClick={() => showBoxChat()}
            ></i>
        </div>

    )
}

export default ChatButton