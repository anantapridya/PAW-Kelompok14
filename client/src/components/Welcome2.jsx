import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./common/DefaultBtn";

export default function Register() {
  return (
    <div
      className="w-full h-screen bg-putih bg-repeat bg-auto flex"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <div className="w-[240px] sm:w-[500px] lg:w-[780px] lg:h-[490px] bg-biru-muda/[.1] rounded-3xl backdrop-blur-sm shadow-3xl m-auto">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto my-[100px] gap-2 lg:gap-8">
          <Link to="/loginuser">
            <DefaultBtn
              type="button"
              judulButton="Masuk"
              className="text-putih w-[100px] sm:w-[300px] sm:h-[60px] lg:w-[474px] lg:h-[84px] text-md lg:text-2xl py-1 lg:py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all "
            />
          </Link>
          <Link to="/signup">
            <DefaultBtn
              type="button"
              judulButton="Daftar"
              className="text-putih w-[100px] sm:w-[300px] sm:h-[60px] lg:w-[474px] lg:h-[84px] text-md lg:text-2xl py-1 lg:py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all "
            />
          </Link>
          {/* <Link to="/loginadmin" className="mt-2 lg:mt-4">
            <p className="font-body text-sm lg:text-xl hover:underline">
              Masuk sebagai Admin
            </p>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
