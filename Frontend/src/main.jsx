import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";
import {ChatContextProvider} from "./Context/ChatContext.jsx"
import {MessageContextProvider} from "./Context/MessageContext.jsx"
// import { RouterProvider } from "react-router-dom";
// import {router} from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <SocketContextProvider>
            <ChatContextProvider>
              <MessageContextProvider>
              {/* <RouterProvider router={router}> */}
                <App />
                {/* </RouterProvider> */}
              </MessageContextProvider>
            </ChatContextProvider>
          </SocketContextProvider>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  </AuthProvider>
);
