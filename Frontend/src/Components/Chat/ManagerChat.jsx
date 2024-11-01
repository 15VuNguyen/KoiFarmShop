import React, { useEffect, useState } from 'react'
// import BoxChat from './BoxChat'
import ChatList from './ChatList'
import "./ManagerChat.css"

const ManagerChat = () => {

    const [isShowStaffChat, setIsShowStaffChat] = useState(false)
    const [showListChat, setShowListChat] = useState(false)
    const [customer, setCustomer] = useState({})
    const [user, setUser] = useState({});

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

    useEffect(() => {
        fetchUser()
    }, [user._id])

    return (
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
                    />
                </div>
            </div>



    )
}

export default ManagerChat;