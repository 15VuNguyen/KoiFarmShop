import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { currentUser } = useAuth()

    useEffect(() => {
        if(currentUser && currentUser._id){
            const newSocket = io("http://localhost:4000", {
                query: { userId: currentUser?._id }
            });
    
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUser(users);
            });
    
            setSocket(newSocket);
    
            return () => newSocket.close();
        }    
    }, [currentUser?._id]);


    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};
