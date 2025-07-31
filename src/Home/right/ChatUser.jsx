import useConversation from "../../stateManagement/useConversation.js";
import { useSocketContext } from "../../Context/SocketContext.jsx";

const ChatUser = () => {
  const {selectedConversation} = useConversation()
  const { onlineUsers} = useSocketContext()

  const isonline = onlineUsers.includes(selectedConversation._id)

  return (
    <>
      <div className="flex items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 h-16">
        {/* Mobile back button */}
        <button className="lg:hidden mr-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar with online status */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt={selectedConversation?.username}
              className="w-full h-full object-cover"
            />
          </div>
          {isonline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0 ml-3">
          <h1 className="font-medium text-gray-900 dark:text-white truncate">
            {selectedConversation?.username}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isonline ? "Online" : "Last seen recently"}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatUser;
