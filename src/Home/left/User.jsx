// import React, { useEffect, useState } from "react";
// import API from "../../axios";
// import { v4 as uuidv4 } from "uuid";

import { useSocketContext } from "../../Context/SocketContext.jsx";
import useConversation from "../../stateManagement/useConversation.js";

const User = ({user, onMobileSelect}) => {
  const {selectedConversation , setSelectedConversation}=useConversation()
  const isSelected = selectedConversation?._id===user._id

  const { onlineUsers}=useSocketContext()
  const isonlineUser= onlineUsers.includes(user._id)

  const handleUserSelect = () => {
    setSelectedConversation(user)
    // Close mobile menu when a user is selected
    if (onMobileSelect) onMobileSelect()
  }



//   const [allUser, setallUser] = useState([{ id: uuidv4() }]);
//   console.log(allUser);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await API.get("/api/getUserInfo");
//         //    console.log(res.data);
//         setallUser(res.data.allUsers, { id: uuidv4() });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUser();
//   }, []);

  return (
    <div
      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
        isSelected ? "bg-gray-100 dark:bg-gray-700" : ""
      }`}
      onClick={handleUserSelect}
    >
      <div className="flex items-center px-4 py-4 lg:py-3">
        {/* Avatar with online status */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          {isonlineUser && (
            <div className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0 ml-3 lg:ml-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm lg:text-base">
              {user.username}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {/* You could add timestamp here */}
            </span>
          </div>
          <p className="text-sm lg:text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
            {user.email}
          </p>
        </div>

        {/* Unread indicator (placeholder) */}
        <div className="flex-shrink-0 ml-2">
          {/* You could add unread message count here */}
        </div>
      </div>
    </div>
  );
};

export default User;
