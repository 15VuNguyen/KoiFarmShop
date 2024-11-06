import React, { useState } from 'react'
import ChatList from './ChatList'
import "./ManagerChat.css"
import BoxChat from './BoxChat'
// import { fetchLoginUserData } from '../../services/userService'

const ManagerChat = () => {

    const [isShowStaffChat, setIsShowStaffChat] = useState(false)
    const [showListChat, setShowListChat] = useState(false)
    const [customer, setCustomer] = useState({})
    // const [user, setUser] = useState({});

    // const fetchUser = async () => {
    //     try {
    //         const { data } = await fetchLoginUserData()
    //         if (data) {
    //             console.log("user: ", data.result)
    //             localStorage.setItem("userInfo", JSON.stringify(data.result))
    //             setUser(data.result)
    //         }
    //     } catch (error) {
    //         console.error({ message: error.message })
    //     }
    // }

    // useEffect(() => {
    //     fetchUser()
    // }, [])

    return (
            
<div className='manager-screen'>
            <div className="chat-btn-container">
                <div className='list-container'>
                    <i
                        className="mess-btn fa-brands fa-facebook-messenger"
                        onClick={() => setShowListChat(!showListChat)}
                    ></i>
                    <ChatList
                        show={showListChat}
                        setIsShowStaffChat={setIsShowStaffChat}
                        setCustomer={setCustomer}
                        customer={customer}
                    />
                </div>
            </div>
            <div className='mbox-chat'>
            <BoxChat
                show={isShowStaffChat}
                receiver={customer}
                setShow={setIsShowStaffChat}
                // user = {user}
            />
            </div>
            
</div>


    )
}

export default ManagerChat;