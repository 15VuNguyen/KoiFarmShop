import { useEffect, useState } from "react";
import { fetchLoginUserData, getManager } from "../../services/userService";
import BoxChat from "./BoxChat";
import ChatButton from "./ChatButton";
import "./CustomerChat.css";
import { useSocketContext } from "../../Context/SocketContext";
// import { useChat } from '../../Context/ChatContext';
// import { useMessage } from '../../Context/MessageContext';
// import { createNewChats } from '../../services/chatService';

const CustomerChatButton = () => {
  const [isShow, setIsShow] = useState(false);
  const [manager, setManager] = useState({});
  // const [user, setUser] = useState({});
  // const {setSelectedChat} = useChat()
  // const { setMessageList } = useMessage()

  const fetchManager = async () => {
    try {
      const { data } = await getManager();
      if (data) {
        setManager(data.result);
      }
    } catch (error) {
      console.error({ message: error.message });
    }
  };

  // const fetchUser = async () => {
  //   try {
  //     const { data } = await fetchLoginUserData();
  //     if (data) {
  //       setUser(data.result);
  //     }
  //   } catch (error) {
  //     console.error({ message: error.message });
  //   }
  // };

  //   const findChat = async() => {
  //     try {
  //         const {data} = await createNewChats(manager._id)
  //         if(data){
  //             console.log("data: ", data)
  //             setSelectedChat(data.result)
  //             setMessageList(data.result.Messages)
  //             localStorage.setItem('selectedChat', JSON.stringify(data.result))
  //         }
  //     } catch (error) {
  //         console.error({ message: error.message })
  //     }
  // }
  // useEffect(() => {
  //     findChat();
  // }, [isShow, manager]);

  //   useEffect(() => {
  //     const savedChat = localStorage.getItem('selectedChat');
  //     if (savedChat) {
  //         setSelectedChat(JSON.parse(savedChat));
  //         setMessageList(JSON.parse(savedChat).Messages)
  //     }
  // }, []);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  useEffect(() => {
    fetchManager();
  }, [isShow]);

  return (
    <div className="chat-container">
      <BoxChat
        show={isShow}
        receiver={manager}
        setShow={setIsShow}
        // user={user}
      />
      <ChatButton show={isShow} setShow={setIsShow} receiver={manager} />
    </div>
  );
};

export default CustomerChatButton;
