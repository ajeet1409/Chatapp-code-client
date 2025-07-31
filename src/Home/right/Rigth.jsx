import React, { useEffect } from 'react'
import ChatUser from './ChatUser'
import Message from './Message'
import Type from './Type'
import useConversation from '../../stateManagement/useConversation.js'
import Loading from '../../Components/Loading.jsx'
import {useAuth} from '../../Context/AuthProvider.jsx'

const Rigth = () => {

  const {selectedConversation , setSelectedConversation }= useConversation();

   useEffect(() => {

    return setSelectedConversation(null)
     
   }, [setSelectedConversation])


   

  return (
    <>
      <div className='flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 lg:pt-0 pt-16 min-w-0'>
        { !selectedConversation ? (<NoChat/>) : (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <ChatUser/>

            {/* Messages Area - Full height scrollable */}
            <div className='flex-1 overflow-y-auto scroll-container bg-gray-50 dark:bg-gray-900 px-4 py-2'>
              <Message/>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Type/>
            </div>
          </div>
        )}
      </div>
    </>
  )
}


const NoChat=()=>{
  const {authUser}= useAuth()

  return(
    <>
      <div className='flex flex-col w-full h-full items-center justify-center px-4 text-center bg-gray-50 dark:bg-gray-900'>
        <div className='max-w-md'>
          {/* WhatsApp Web style welcome */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h2 className='text-2xl lg:text-3xl font-light mb-4 text-gray-800 dark:text-gray-200'>
            Welcome to Chats for Fun
          </h2>
          <p className='text-base lg:text-lg mb-6 text-gray-600 dark:text-gray-400 leading-relaxed'>
            Send and receive messages without keeping your phone online.<br/>
            Use Chats for Fun on up to 4 linked devices and 1 mobile phone.
          </p>

          {/* Mobile instruction */}
          <div className='lg:hidden bg-blue-50 dark:bg-blue-900 p-4 rounded-lg'>
            <p className='text-sm text-blue-800 dark:text-blue-200'>
              Tap the menu button (☰) at the top to see your chats
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rigth