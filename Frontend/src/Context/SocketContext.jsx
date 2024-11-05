import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { fetchLoginUserData } from '../services/userService';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);

    const fetchUser = async () => {
        try {
            const { data } = await fetchLoginUserData();
            if (data && data.result) {
                console.log("Fetched user:", data.result);
                const newSocket = io("http://localhost:4000", {
                    query: { userId: data.result._id }
                });
    
                newSocket.on("getOnlineUsers", (users) => {
                    console.log("Online users:", users);
                    setOnlineUser(users);
                });
    
                setSocket(newSocket);
    
                return () => {
                    newSocket.close();
                };
            }
        } catch (error) {
            console.error("Fetch user error:", error.message);
        }
    };

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};
