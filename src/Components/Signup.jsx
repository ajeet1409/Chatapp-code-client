// import React, { useState } from "react";
// import axios from "axios";
// import { useState } from "react"; 
// import {useNavigate} from 'react-router-dom'

import API from "../axios";
import { useForm } from "react-hook-form"
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";






const Signup = () => {

  const naviagte =useNavigate()
  // !custom hook
  const {authUser, setAuthUser} = useAuth()
  // const value =useAuth()
 
console.log("hello")
console.log(authUser)
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //* Watch the password field for validation comparison
  const password=watch("password")
  // const confirmPassword=watch("confirmPassword","")

  const validatePasswordMatch=(value)=>{
    
    return( value === password ||"password and confirmpassword not match")
  }




  const onSubmit =  async (data) => {
    const userInfo={
      username: data.username,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    }
// !console.log(userInfo)
    try {
     const res = await API.post('/api/user/signup', userInfo, {
      headers: {
        "Content-Type": "application/json"
      }});


      console.log(res.data)

         
      if(res.data){
        toast.success("SignUp successful ypu can login now")
        localStorage.setItem('message',JSON.stringify(res.data))
      }

    setAuthUser(res.data)

     naviagte('/logi')

    // !console.log(res?.data);
   } catch (error) {

    if(error.response){
      console.log(error)
      toast.error('Error',error.response.data.error)

    }
    
   }
  }




  // using FromData
//   const [formData, setformData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleChange = (event) => {
//     setformData({ ...formData, [event.target.name]: event.target.value });
//     console.log(formData)
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault()

//     const data =  new FormData();

//     // console.log(data)

//     data.append("username", formData.username);

//     data.append("email", formData.email);
//     data.append("password", formData.password);
//     data.append("confirmPassword", formData.confirmPassword);


//    try {
//      const res = await API.post('/api/signup', data, {
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join us and start chatting with friends
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  type="text"
                  className="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: true, validate: validatePasswordMatch })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Create Account
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to={'/login'} className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
