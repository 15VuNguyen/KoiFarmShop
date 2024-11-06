import { useEffect, useState } from "react";
import { getManager } from "../../services/userService";
import BoxChat from "./BoxChat";
import ChatButton from "./ChatButton";
import "./CustomerChat.css";

const CustomerChatButton = () => {
  const [isShow, setIsShow] = useState(false);
  const [manager, setManager] = useState({});

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

  useEffect(() => {
    fetchManager();
  }, [isShow]);

  return (
    <div className="chat-container">
      <BoxChat
        show={isShow}
        receiver={manager}
        setShow={setIsShow}
      />
      <ChatButton show={isShow} setShow={setIsShow} receiver={manager} />
    </div>
  );
};

export default CustomerChatButton;
