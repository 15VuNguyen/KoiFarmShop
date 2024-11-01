import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useChat } from '../../Context/ChatContext'
import { useSocketContext } from '../../Context/SocketContext'
import { useMessage } from '../../Context/MessageContext'
import { getMessages, sendMessages } from '../../services/messageService'
import { fetchLoginUserData } from '../../services/userService'



const BoxChat = (props) => {
  const { show, setShow, receiver, user } = props
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMessageTime, setShowMessageTime] = useState(null)
  const { messageList, setMessageList } = useMessage()
  const { socket } = useSocketContext();
  const { selectedChat } = useChat()
  const lastMessageRef = useRef()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  console.log("message list: ", messageList)
  console.log("receiver: ", receiver)
  console.log("user: ", user)

  // useEffect(async()=>{
  //   const storedUser = JSON.parse(localStorage.getItem("userInfo"))
  //   if(storedUser){
  //     console.log("current user: ", storedUser) 
  //     setUser(storedUser)
  //   }else{
  //     const {data} = await fetchLoginUserData()
  //     console.log("currentUser: ", data.result)
  //     localStorage.setItem('userInfo', JSON.stringify(data.result))
  //     setUser(data.result)
  //   }
  // },[])

  const sendMessage = async () => {
    try {
      setLoading(true)
      setMessage("")
      const { data } = await sendMessages(receiver._id, message)
      if (data) {
        setLoading(false)
        setMessageList([...messageList, data.result])
      }
    } catch (error) {
      setLoading(false)
      console.error({ message: error.message })
    }
  }

  const fetchMessages = async () => {
    try {
      if (!selectedChat || !receiver || !receiver._id) return;
      setLoading(true)
      const { data } = await getMessages(receiver._id)
      if (data) {
        setLoading(false)
        setMessageList(data.result)
        setIsFirstLoad(false)
      }
    } catch (error) {
      setLoading(false)
      console.error({ message: error.message })
    }
  }

  const toggleMessageTime = (id) => {
    setShowMessageTime(showMessageTime === id ? null : id)
  }

  useEffect(() => {
    if (selectedChat?._id && receiver && receiver._id) {
      fetchMessages()
    }
  }, [selectedChat?._id, receiver])

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 100);
  }, [messageList])

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("new message.chatID: ", newMessage.chatId)
      console.log("selected chat ID: ", selectedChat?._id)
      if (newMessage.ChatId === selectedChat?._id) {
        setMessageList([...messageList, newMessage])
      } else {
        console.log("message from another box")
      }
    })

    return () => socket?.off("newMessage")
  }, [socket, selectedChat?._id, messageList])


  return (
    <div className={`box-chat ${show ? '' : 'hide'}`}>
      <div className='header'>
        <div className='userInfo'>
          <i className="avatar fa-solid fa-user"></i>
          {receiver && receiver.roleid == 3
            ? <p>Support Service</p>
            : <p>{!receiver ? "Guest" : receiver.name}</p>}
        </div>
        <div className='feature'>
          <i
            className="minimize fa-solid fa-minus"
            onClick={() => setShow(false)}
          ></i>
          <i className="close fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className='body'>
        {loading && (
          <div className='flex w-full h-full flex-col items-center justify-center gap-4 bg-transparent'>
            <div className='loading loading-spinner'></div>
          </div>
        )}
        {/* {authUser.role!== "staff" && isFirstLoad && (
        <div className='mess-container'>
          <i className="avatar fa-solid fa-user"></i>
          <div className='you'>
            <p>Hi, can I help you?</p>
          </div>
        </div>)} */}
        {!loading && messageList?.map((m) => (
          <div
            key={m?._id}
            ref={lastMessageRef}
            className='mess-container'
          >
            {user?._id === m.ReceiverId
              ? <i className="avatar fa-solid fa-user"></i>
              : <></>}
            <div className={user?._id === m.SenderId ? 'me' : 'you'}>

              <p onClick={() => toggleMessageTime(m._id)}>{m.Content}</p>
              <div className={`date ${showMessageTime === m._id ? 'showTime' : ''}`}>
                {new Date(m?.createdAt).toLocaleDateString('en-IN', { hour: 'numeric', minute: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
        {/* {lastMessage? <p>{lastMessage.content}</p> : <></>} */}
      </div>
      <div className='footer'>
        <div className='input-box'>
          <input
            type="text"
            className={message ? "input-expand" : ""}
            value={message}
            placeholder='Enter something...'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (message.trim() !== "" && e.key === "Enter") {
                sendMessage()
              }
            }}
          />

          {loading ? <span class="loader"></span>
            : <i
              className="send-btn fa-solid fa-paper-plane"
              onClick={() => sendMessage()}
            ></i>}
        </div>
      </div>

    </div>
  )
}

export default BoxChat