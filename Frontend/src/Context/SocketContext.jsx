import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const { currentUser } = useAuth()
    useEffect(() => {
        if (currentUser) {
            const socket = io("http://localhost:4000", {
                query: {
                    userId: currentUser?._id,
                }
            })
            
            socket.on("getOnlineUsers", (users) => {
                console.log("Online users: ", users);
                setOnlineUser(users)
            });
            setSocket(socket)
            return () => {
                if (socket) {
                    socket.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null)
            }
        }
    }, [currentUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    )
}