import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMsg from "../../Context/useSendMsg.js";

const Type = () => {
  const {loading, sendMessage} = useSendMsg()
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(msg.trim() !== ""){
      await sendMessage(msg)
      setMsg('')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800">
          {/* Emoji/Attachment button */}
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Message input */}
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Type a message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Send button or mic button */}
          {msg.trim() ? (
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 rounded-full text-white transition-colors"
            >
              <IoSend className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Type;
