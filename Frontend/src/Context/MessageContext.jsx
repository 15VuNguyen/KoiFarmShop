import { createContext, useContext, useState } from "react";

const MessageContext = createContext()

export const useMessage = () => {
    return useContext(MessageContext)
}

export const MessageContextProvider = ({children})=>{
    const [messageList, setMessageList] = useState([])

    return(
        <MessageContext.Provider value={{messageList, setMessageList}}>
            {children}
        </MessageContext.Provider>
    )
}