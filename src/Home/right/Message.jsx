import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import useGetMessage from "../../Context/useGetMessage.js";
// import useConversation from "../../stateManagement/useConversation.js";
import Loading from "../../Components/Loading.jsx";
import useSocketGetMessage from "../../Context/useSocketGetMessage.js";
const Message = () => {
  let {message,loading}=useGetMessage()
        useSocketGetMessage()
  //! scroll to first message

  const lastMessageRef=useRef()

 useEffect(() => {
    if (!lastMessageRef.current) return;

    // Use requestAnimationFrame for smoother scroll after DOM paint
    const scroll = () => {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    requestAnimationFrame(scroll);
  }, [message]);
   
  // console.log(message);

//   useEffect(() => {
//   setTimeout(() => {
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, 100);
// }, [message]);
  
  return (
    <>
    
    <div style={{maxHeight:"calc(91.5vh - 8vh)"}}   className="scroll-container">
    {loading?(<Loading></Loading>) : ( message.length>0 &&
        message.map((message ) => (
          <div key={message._id} ref={lastMessageRef}>
            
                <Messages message={message}/>

            {/* <hr /> */}
          </div>
        ))
      )} 
  {!loading && message.length === 0 && 
        <div><p className="text-red-500  text-center mt-[25%]">Say,Hi</p></div>
      }
     
   
     </div>
    </>
  );
};

export default Message;
