// import React, { useState } from "react";
// import axios from "axios";
import API from "../axios";
import { useForm } from "react-hook-form"

import {useAuth} from '../Context/AuthProvider'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'



const Login = () => {
const naviagte =useNavigate()

    const {authUser, setAuthUser} = useAuth();
    console.log("hello",authUser);
    
//* react hook form
const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

const onSubmit =  async (data) => {

    const user={
    
      email:data.email,
      password:data.password,
    
    }

    try {
        const res =  await API.post('/api/user/login',user)
        // console.log("hello");
        
        if(res.data){
          toast.success("login succesful")
          localStorage.setItem('message',JSON.stringify(res.data))
        }
        setAuthUser(res.data)  // update context

             naviagte('/Login')
        // console.log("hello1111");
        
      } catch (error) {
        console.log(error.response)
        if(error.response){
          
          toast.error("message : "+error.response.data?.message)

       
      }
      
    }

  }

  const handleKeyDown=(e)=>{
    if(e.key=="enter"){
     onSubmit()
    }

  }




///* formdata is used
//   const [formData, setformData] = useState({
  
//     email: "",
//     password: "",
   
//   });

//   const handleChange = (event) => {
//     setformData({ ...formData, [event.target.name]: event.target.value });
//     console.log(formData)
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault()

//     const data =  new FormData();

//     // console.log(data)


//     data.append("email", formData.email);
//     data.append("password", formData.password);
   


//    try {
//      const res = await API.post('/api/login', data, {
//       headers: {
//         "Content-Type": "application/json"
//       }});

//     console.log(res.data);
//    } catch (error) {
//     console.log(error)
    
//    }
//   };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue chatting
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  className="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                onKeyDown={handleKeyDown}
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to={'/signup'} className="font-medium text-green-600 hover:text-green-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


export default Login;
