import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ChatButton from './ChatButton'
import BoxChat from './BoxChat'
import { useAuth } from '../context/AuthContext'
import ChatList from './ChatList'


const HomePage = () => {
    const navigate = useNavigate()
    const [staff, setStaff] = useState({})
    const [isShow, setIsShow] = useState(false)
    const [isShowStaffChat, setIsShowStaffChat] = useState(false)
    const [showListChat, setShowListChat] = useState(false)
    const { authUser } = useAuth()
    const [customer, setCustomer] = useState({})


    let config = {
        headers: {
            Authorization: `Bearer ${authUser.token}`
        }
    }

    const handleLogout = () => {
        try {
            localStorage.removeItem('userInfo')
            localStorage.removeItem('selectedChat')
            toast.success('Logout successfully!')
            navigate('/login')
        } catch (error) {
            toast.error('Logout fail!')
        }
    }

    const getStaff = async () => {
        const {data} = await fetchStaff(config)
        if(data){
            console.log("staff: ", data)
            setStaff(data[0])
        }
    }

    useEffect(() => {
        getStaff()
    }, [authUser._id])

    return (
        <>
            <div className='home-header'>
                <div>HomePage</div>
                <div className="chat-btn-container">
                    {authUser?.role === "staff"
                        ? <div className='list-container'>
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
                        : <></>}
                </div>
                <Button
                    variant='danger'
                    onClick={() => handleLogout()}
                >Logout</Button>
            </div>
            <div className='home-body'>
                {authUser.role !== "staff"
                    ? (

                        <div className='chat-container'>
                            <BoxChat
                                show={isShow}
                                setShow={setIsShow}
                                receiver={staff}
                            />
                            <ChatButton
                                show={isShow}
                                setShow={setIsShow}
                                receiver={staff}
                            />

                        </div>

                    )
                    : (
                        <>
                            <div
                                className="staffBox"
                                
                            >
                                <BoxChat
                                    show={isShowStaffChat}
                                    receiver={customer}
                                    setShow={setIsShowStaffChat}
                                />
                            </div>

                        </>
                    )}
            </div>
        </>
    )
}

export default HomePage