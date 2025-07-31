import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import API from "../../axios.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlelogout = async () => {
    setloading(true);
    try {
      const res = await API.post("/api/user/logout");
      console.log("Logout response:", res);

      // Clear storage and token
      localStorage.removeItem("message");
      Cookies.remove("token");
      setloading(false)
      toast.success("Logout Successfully");
        window.location.reload();
      // Redirect after cleanup
      // navigate("/login", { replace: true }); // 'replace' prevents user going back to protected page
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-16 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col justify-end">
      <div className="p-3">
        <button
          disabled={loading}
          onClick={handlelogout}
          className="w-full flex justify-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors group"
          title="Logout"
        >
          <LuLogOut className="text-xl text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Logout;





