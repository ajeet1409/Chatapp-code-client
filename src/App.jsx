import React from "react";
import Left from "./Home/left/left";
import Rigth from "./Home/right/Rigth";
import Logout from "./Home/left1/Logout";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import toast, { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

import { useAuth } from "./Context/AuthProvider";

import { Navigate } from "react-router-dom";

const App = () => {
  const { authUser } = useAuth();

  console.log(authUser);

  return (
    <>
      <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <div className="h-screen w-full flex max-w-full mx-auto bg-white dark:bg-gray-800 shadow-xl">
                  {/* Desktop: Show logout button */}
                  <div className="hidden lg:flex">
                    <Logout />
                  </div>
                  <Left />
                  <Rigth />
                </div>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />

          <Route
            path="/signup"
            element={ <Signup />}
          />
          <Route path='/logi' element={<Login/>}/>
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default App;
