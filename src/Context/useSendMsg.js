import React, { useState } from 'react'
import useConversation from '../stateManagement/useConversation.js';
import API from '../axios.js'


const useSendMsg = () => {

    const [loading, setLoading] = useState(false);
    const { message, setMessage, selectedConversation } = useConversation();
    // console.log(message);

        
const sendMessage = async (text) => {
      setLoading(true);
        if (selectedConversation && selectedConversation._id) {
        try {
          const res = await API.post(
            `/api/message/send/${selectedConversation._id}`,{message:text},
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
          );
         
          console.log(res);
          
          console.log(res.data);
        setMessage([...message,res.data.newMessage]);

          setLoading(false);
        } catch (error) {
          console.log("Error in sendMessage ", error);
        }
      };

    }
    // sendMessage()

    return {loading ,sendMessage};
}

export default useSendMsg;