import { useState } from 'react'
import Search from './Search'
import Users from './Users'
import useConversation from '../../stateManagement/useConversation.js'
import { LuLogOut } from "react-icons/lu";
import API from "../../axios.js";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Left = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { selectedConversation } = useConversation()

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await API.post("/api/user/logout");
      console.log(res);
      
      localStorage.removeItem("message");
      Cookies.remove("token");
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Header with Menu Toggle - Modern Design */}
      <div className="lg:hidden bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* App Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className='font-semibold text-lg tracking-wide'>Chats for Fun</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors duration-200"
              title="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors duration-200 disabled:opacity-50"
              title="Logout"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LuLogOut className="w-5 h-5" />
              )}
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-all duration-200 ml-1"
              title={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 transform rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Status Bar (optional) */}
        <div className="bg-green-700 bg-opacity-50 px-4 py-1">
          <p className="text-xs text-green-100 text-center">
            {selectedConversation ? `Chatting with ${selectedConversation.username}` : 'Select a chat to start messaging'}
          </p>
        </div>
      </div>

      {/* Sidebar - Modern chat app style - Full width on laptop */}
      <div className={`
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        lg:w-full lg:flex lg:flex-col lg:max-w-md xl:max-w-lg
        ${selectedConversation && !isMobileMenuOpen ? 'hidden lg:flex' : 'flex'}
        ${isMobileMenuOpen ? 'fixed inset-0 z-40 pt-20' : 'lg:relative lg:pt-0'}
        ${isMobileMenuOpen ? 'w-full h-full' : 'w-full lg:w-full'}
        ${isMobileMenuOpen ? 'animate-slide-in-left' : ''}
      `}>

        {/* Desktop Header - WhatsApp Web style */}
        <div className="hidden lg:flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h1 className='font-semibold text-xl text-gray-800 dark:text-white'>Chats</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <Search onMobileSelect={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-hidden">
          <Users onMobileSelect={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Mobile Overlay with Animation */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-30 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-30"></div>
        </div>
      )}
    </>
  )
}

export default Left