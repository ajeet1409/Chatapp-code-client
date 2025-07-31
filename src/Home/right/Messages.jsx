import React from "react";

const Messages = ({message}) => {
   


    const authUser =JSON.parse(localStorage.getItem('message'))
       console.log(authUser);
       const itsme = authUser.user.userId=== message.senderId
      //  console.log(authUser.user.userId);
      //  console.log(message);
       
       
      //  console.log(itsme);
      const chatName = itsme?"chat-end":"chat-start"
      const chatColor = itsme?"bg-zinc-700":"bg-blue-500"
//! for date with message to send
      const createdAt= new Date(message.createdAt)
      const formatedTime=createdAt.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
       
  return (
    <>
      <div className="p-3 ">

     <div className={`chat ${chatName}`}>
          <div className={`chat-bubble ${chatColor}`}>
            
            <p>{message.message}</p>
            
            </div>
          <div className="chat-footer">{formatedTime}</div>
        </div>

      {/* { itsme ? (<div className="chat chat-start">
          <div className="chat-bubble chat-bubble-info">{message.message}</div>
        </div>)
       : (<div className="chat chat-end">
          <div className="chat-bubble chat-bubble-accent">
        {message.message}
          </div>
        </div>)} */}
      </div>
    </>
  );
};

export default Messages;
