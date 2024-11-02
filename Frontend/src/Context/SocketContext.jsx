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
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUser = async () => {
        try {
            const { data } = await fetchLoginUserData();
            if (data) {
                console.log("Fetched user:", data.result);
                setCurrentUser(data.result);
            }
        } catch (error) {
            console.error("Fetch user error:", error.message);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
            console.log("User from localStorage:", parsedUser);
            setCurrentUser(parsedUser);
        } else {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            const newSocket = io("http://localhost:4000", {
                query: { userId: currentUser._id }
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
    }, [currentUser?._id]); // Only establish socket connection when `currentUser._id` is available

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};
