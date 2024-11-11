import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useChat } from "../../Context/ChatContext";
import { useSocketContext } from "../../Context/SocketContext";
import { useMessage } from "../../Context/MessageContext";
import { getMessages, sendMessages } from "../../services/messageService";
import { useAuth } from "../../Context/AuthContext";

const BoxChat = (props) => {
  const { show, setShow, receiver } = props;
  const {socket} = useSocketContext()
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessageTime, setShowMessageTime] = useState(null);
  const { messageList, setMessageList } = useMessage();
  const { selectedChat } = useChat();
  const {currentUser} = useAuth()
  const lastMessageRef = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const sendMessage = async () => {
    if(!message.trim()) return;
    try {
      setLoading(true);
      setMessage("");
      const { data } = await sendMessages(receiver._id, message);
      if (data) {
        setLoading(false);
        setMessageList([...messageList, data.result]);
      }
    } catch (error) {
      setLoading(false);
      console.error({ message: error.message });
    }
  };

  const fetchMessages = async () => {
    try {
      if (!selectedChat || !receiver || !receiver._id) return;
      setLoading(true);
      const { data } = await getMessages(receiver._id);
      if (data) {
        setLoading(false);
        setMessageList(data.result);
        setIsFirstLoad(false);
      }
    } catch (error) {
      setLoading(false);
      console.error({ message: error.message });
    }
  };

  const toggleMessageTime = (id) => {
    setShowMessageTime(showMessageTime === id ? null : id);
  };

  useEffect(() => {
    if (selectedChat?._id && receiver._id) {
        fetchMessages();
    }
  }, [selectedChat?._id, receiver._id]);


  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  }, [messageList]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        if (newMessage.ChatId === selectedChat?._id) {
          setMessageList((prevMessage) => [...prevMessage, newMessage]);
        } else {
          console.log("message from another box");
        }
    });
    return () => socket?.off("newMessage");
  }, [socket, selectedChat?._id]);

  return (
    <div className={`box-chat ${show ? "" : "hide"}`}>
      <div className="header">
        <div className="userInfo">
          {receiver && receiver.Image ? (
            <img className="avatar" src={receiver.Image} alt="avatar" />
          ) : (
            <i className="avatar fa-solid fa-user"></i>
          )}
          {receiver && receiver.roleid == 3 ? (
            <p>Support Service</p>
          ) : (
            <p className="name">{!receiver ? "Guest" : receiver.name}</p>
          )}
        </div>
        <div className="feature">
          <i
            className="minimize fa-solid fa-minus"
            onClick={() => setShow(false)}
          ></i>
        </div>
      </div>
      <div className="body">
        {loading && (
          <div className="flex w-full h-full flex-col items-center justify-center gap-4 bg-transparent">
            <div className="loading loading-spinner"></div>
          </div>
        )}
        {/* {authUser.role!== "staff" && isFirstLoad && (
        <div className='mess-container'>
          <i className="avatar fa-solid fa-user"></i>
          <div className='you'>
            <p>Hi, can I help you?</p>
          </div>
        </div>)} */}
        {!loading &&
          messageList?.map((m) => (
            <div key={m?._id} ref={lastMessageRef} className="mess-container">
              {currentUser?._id === m.ReceiverId ? (
                <i className="avatar fa-solid fa-user"></i>
              ) : (
                <></>
              )}
              <div className={currentUser?._id === m.SenderId ? "me" : "you"}>
                <p onClick={() => toggleMessageTime(m._id)}>{m.Content}</p>
                <div
                  className={`date ${
                    showMessageTime === m._id ? "showTime" : ""
                  }`}
                >
                  {new Date(m?.createdAt).toLocaleDateString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        {/* {lastMessage? <p>{lastMessage.content}</p> : <></>} */}
      </div>
      <div>
        <div
          className="input-box"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "9px",
            paddingRight: "15px",
          }}
        >
          <input
            type="text"
            className={`input ${message ? "input-expand" : ""}`}
            value={message}
            placeholder="Enter something..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (message.trim() !== "" && e.key === "Enter") {
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: "10px",
              border: "none", // Không hiển thị viền
              borderBottom: "1px solid #ccc", // Chỉ hiển thị viền dưới
              borderRadius: "0", // Để bỏ bo góc
              marginRight: "10px",
              fontSize: "16px",
              outline: "none", // Bỏ viền khi chọn
              transition: "border-color 0.3s",
            }}
          />

          {loading ? (
            <span className="loader" style={{ fontSize: "20px" }}></span>
          ) : (
            <i
              className="send-btn fa-solid fa-paper-plane"
              onClick={() => sendMessage()}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#007bff", // Màu cho nút gửi
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")} // Màu khi hover
              onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")} // Màu trở lại
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxChat;
