import React from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useContext } from "react";

 const AuthContext = createContext();


 export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookies.get("token") || localStorage.getItem("message");

    // console.log("initial",initialUserState);
    

    //parse the user data and storing in state
    const [authUser, setAuthUser] = useState(initialUserState?JSON.parse(initialUserState):undefined)
    // console.log(authUser)

  return (
  
  
  
  <div >

<AuthContext.Provider     value={{authUser,setAuthUser}}    >
    {children}
</AuthContext.Provider>


  </div>

)
};
 export const useAuth =() =>  useContext(AuthContext)


 

// export default AuthProvider;?
