import React, { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext.jsx";
import useConversation from "../stateManagement/useConversation.js";
// import sound from "../assets/notification.mp3";
const useSocketGetMessage = () => {
  const { socket } = useSocketContext();
  const { message, setMessage} = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
    //   const notification = new Audio(sound);
    //   notification.play();
      setMessage([...message, newMessage]);
    });
    return () => {
      socket.off("newMessage");  // if message user not sent then stop the socket
    };
  }, [socket, message, setMessage]);
};
export default useSocketGetMessage;