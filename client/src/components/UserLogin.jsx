import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./DefaultBtn";
import DefaultInput from "./DefaultInput";

export default function UserLogin() {
  return (
    <div
      className="w-full h-screen bg-putih bg-repeat bg-auto flex"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <div className="w-[780px] bg-biru-muda/[.1] rounded-3xl backdrop-blur-sm shadow-3xl m-auto">
        <div className="flex flex-col items-center justify-center w-3/4 mx-auto my-[100px]">
          <DefaultInput placeholder="Username" className="w-full text-xl" />
          <DefaultInput placeholder="Password" className="w-full text-xl" />

          <div className="flex justify-between w-full mt-12">
            <Link to="/welcome">
              <DefaultBtn
                type="button"
                judulButton="Kembali"
                className="w-[150px] h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
            <Link to="/loginuser">
              <DefaultBtn
                type="button"
                judulButton="Masuk"
                className="w-[150px] h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
