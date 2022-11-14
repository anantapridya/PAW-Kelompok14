import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./common/DefaultBtn";
import DefaultInput from "./common/DefaultInput";

export default function UserLogin() {
  return (
    <div
      className="w-full h-screen bg-putih bg-repeat bg-auto flex"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <div className="w-[240px] sm:w-[500px] lg:w-[780px] bg-biru-muda/[.1] rounded-3xl backdrop-blur-sm shadow-3xl m-auto">
        <div className="flex flex-col items-center justify-center w-3/4 mx-auto my-[100px]">
          <DefaultInput
            placeholder="Username"
            className="w-full text-sm md:text-xl"
          />
          <DefaultInput
            placeholder="Password"
            className="w-full text-sm md:text-xl"
            type="password"
          />

          <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full mt-4 sm:mt-12 gap-2 sm:gap-0">
            <Link to="/welcome">
              <DefaultBtn
                type="button"
                judulButton="Kembali"
                className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
            <Link to="/loginuser">
              <DefaultBtn
                type="button"
                judulButton="Masuk sebagai Admin"
                className="lg:w-[300px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all text-sm lg:text-xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
