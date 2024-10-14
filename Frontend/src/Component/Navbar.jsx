import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/authStore"; // Adjust the path as needed

const Navbar = () => {
  const location = useLocation();
  const [auth, isAuth] = useState("true");
  const { logOut } = useAuthStore();

  const handleLogout = async () => {
    await logOut();
    isAuth(false);
  };

  // Determine what button to show based on the current route
  const renderButton = () => {
    if (location.pathname === "/signup") {
      return (
        <Link
          to="/login"
          className="bg-slate-500 w-16 text-center p-1 rounded-md hover:bg-slate-700 transition duration-300 ease-in-out"
        >
          Login
        </Link>
      );
    } else if (location.pathname === "/login") {
      return (
        <Link
          to="/signup"
          className="bg-slate-500 w-20 text-center p-1 rounded-md hover:bg-slate-700 transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      );
    } else if (location.pathname === "/" && auth) {
      return (
        <button
          onClick={handleLogout} // Logout the user
          className="bg-slate-500 w-16 p-1 rounded-md hover:bg-slate-700 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 text-slate-50 h-16 flex justify-end items-center pr-16">
      {renderButton()}
    </div>
  );
};

export default Navbar;
