import { Link } from "react-router-dom";
import logo from "../img/websitelogo.png";
import React, { useState, useEffect } from "react";
import Dropdown from "./common/Dropdown";
import { isAdmin, isAuth } from "../helpers/auth";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState();

  const handleClick = () => {
    localStorage.clear();
    setIsLogged(false);
    window.location.href = "/";
    toast.success("Anda keluar");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <nav
        role="navigation"
        className="h-[60px] w-full px-[60px] box-border bg-putih font-body font-medium text-[20px] text-biru-tua xl:h-16 xl:text-[22px]"
      >
        <ul className="h-full w-full flex items-center box-border list-none">
          <li className="mr-[50px] mx-[30px] xl:mx-[50px]">
            <Link to="/" className="flex items-center hover:drop-shadow-3xl">
              <img
                src={logo}
                alt="app logo on navigation bar"
                className="h-[35px] xl:h-[40px]"
              ></img>
              <span className="font-bold text-[23px] xl:text-[25px] ml-[13px]">
                Pharma
              </span>
              <span className="font-bold text-[23px] xl:text-[25px] text-black">
                Web
              </span>
            </Link>
          </li>
          <li
            className={`mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl ${
              isAuth() ? "inline" : "hidden"
            }`}
          >
            <Link to="/list">List</Link>
          </li>
          <li
            className={`mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl ${
              isAdmin() ? "inline" : "hidden"
            }`}
          >
            <Link to="/add">Add</Link>
          </li>
          <li
            className={`mx-[50px] ml-auto hover:drop-shadow-3xl ${
              isAuth() ? "hidden" : "inline"
            }`}
          >
            <Link to="/welcome">Sign In</Link>
          </li>
          <li
            className={`mx-[50px] ml-auto hover:drop-shadow-3xl ${
              isAuth() ? "inline" : "hidden"
            } `}
          >
            <button
              onClick={handleClick}
              className="text-biru-tua text-[22px] bg-transparent"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
