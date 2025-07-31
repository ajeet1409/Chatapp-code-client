import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authUser = useAuth();
  //   console.log(authUser);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser?.authUser?.user?.userId,
        },
      });
      setSocket(socket);

      socket.on("getonline", (users) => {
        setOnlineUsers(users);

        console.log("client diconnect", socket.id);
      });
      return ()=>socket.close()
    }else{
      if(socket){
        socket.close();
        setSocket(null)

      }
    }
    
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket,onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
