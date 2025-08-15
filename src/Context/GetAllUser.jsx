import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../axios";


const GetAllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setloading] = useState(false);
 const navigate = useNavigate();
//   console.log(allUser)

  useEffect(() => {
    const getUser = async () => {
        setloading(true)

      try {
        const token = Cookies.get("token");
        console.log(token);
        

        //  if (!token) {
        //   // Token is missing, redirect to login
        //   navigate("/login");
        //   return;
        // }
        const res = await API.get("/api/getUserInfo", {
           credentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
           
          }
          
        });
        
          console.log(res.data.allUsers);
        setAllUser(res.data.allUsers)
        setloading(false)
        
        
      } catch (error) {
        // navigate("/login");
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUser();
  }, [navigate]);


  return [allUser,loading]
};

export default GetAllUser;
