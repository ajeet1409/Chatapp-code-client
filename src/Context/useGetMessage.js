import React, { useEffect, useState } from "react";
import useConversation from "../stateManagement/useConversation.js";
import API from "../axios.js";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();
console.log(selectedConversation);

  useEffect(() => {
    
    const getMessage = async () => {
      setLoading(true);
        if (selectedConversation && selectedConversation._id) {
        try {
          const res = await API.get(
            `/api/message/get/${selectedConversation._id}`,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
          );
         
          // console.log(res);
          
          // console.log(res.data);
          setMessage(res.data);

          setLoading(false);
        } catch (error) {
          console.log("Error in getMessage ", error);
        }
      };

    }
    getMessage();

  }, [selectedConversation,setMessage]);

   
   
  return {message,loading };
};

export default useGetMessage;
