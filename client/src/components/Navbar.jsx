import { Link } from "react-router-dom";
import logo from "../img/websitelogo.png";
import React, { useState, useEffect } from "react";
import Dropdown from "./common/Dropdown";
import { isAdmin, isAuth } from "../helpers/auth";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState();

  const listClick = () => {
    window.location.href = "/list";
  };

  const addClick = () => {
    window.location.href = "/add";
  };

  const handleClick = () => {
    localStorage.clear();
    setIsLogged(false);
    window.location.href = "/";
    toast.success("Anda keluar");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
  const dropddownnavbaradmin = [
    {id:1, value:"List", onClick: listClick},
    {id:2, value:"Add", onClick: addClick},
    {id:3, value:"Sign Out", onClick: handleClick}
  ]
  const dropddownnavbar = [
    {id:1, value:"List", onClick: listClick},
    {id:2, value:"Sign Out", onClick: handleClick}
  ]

  return (
    <>
      <ToastContainer />
      <nav
        role="navigation"
        className="h-[60px] w-full px-[10px] md:px-[60px] box-border bg-putih font-body font-medium text-[20px] text-biru-tua xl:h-16 xl:text-[22px]"
      >
        <ul className="h-full w-full flex items-center box-border list-none">
          <li className="mr-[50px] mx-5 md:mx-[30px] xl:mx-[50px]">
            <Link to="/" className="flex items-center hover:drop-shadow-3xl">
              <img
                src={logo}
                alt="app logo on navigation bar"
                className="h-[35px] xl:h-[40px]"
              ></img>
              <span className="font-bold text-[18px] xl:text-[25px] ml-[13px]">
                Pharma
              </span>
              <span className="font-bold text-[18px] xl:text-[25px] text-black">
                Web
              </span>
            </Link>
          </li>
          <li
            className={`mx-[30px] md:mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl  ${
              isAuth() ? "md:inline hidden" : "hidden"
            }`}
          >
            <Link to="/list">List</Link>
          </li>
          <li
            className={`mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl ${
              isAdmin() ? "md:inline hidden" : "hidden"
            }`}
          >
            <Link to="/add">Add</Link>
          </li>
          <li
            className={`mx-[20px] text-[18px] xl:text-[22px] ml-auto hover:drop-shadow-3xl ${
              isAuth() ? "hidden" : "inline"
            }`}
          >
            <Link to="/welcome">Sign In</Link>
          </li>
          <li
            className={`mx-[20px] ml-auto hover:drop-shadow-3xl ${
              isAuth() ? "inline" : "hidden"
            } `}
          >
            <button
              onClick={handleClick}
              className="text-biru-tua text-[18px] md:text-[22px] bg-transparent hidden md:inline"
            >
              Sign Out
            </button>
          </li>
          <li className={isAuth() ? "inline" : "hidden"}>
            <Dropdown items={dropddownnavbaradmin} judul="Menu" className={`${
              isAdmin() ? "inline" : "hidden"} text-biru-tua text-[18px] md:text-[22px] bg-transparent bg-putih md:hidden inline`} />
          </li>
          <li className={isAuth() ? "inline" : "hidden"}>
            <Dropdown items={dropddownnavbar} judul="Menu" className={`${
              isAdmin() ? "hidden" : "inline"} text-biru-tua text-[18px] md:text-[22px] bg-transparent bg-putih md:hidden inline`}/>
          </li>
        </ul>
      </nav>
    </>
  );
}
