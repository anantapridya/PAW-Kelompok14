import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import BtnBiru from "./Buttons/BtnBiru";

export default function Register() {
  return (
    <div
      className="w-full h-screen bg-putih bg-repeat bg-auto flex"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <div className="w-[780px] h-[490px] bg-biru-muda/[.3] rounded-3xl backdrop-blur shadow-3xl m-auto">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto my-[100px] gap-8">
          <Link to="/signup">
            <BtnBiru
              type="button"
              judulButton="Masuk"
              className="w-[474px] h-[84px] text-2xl py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <Link to="/loginuser">
            <BtnBiru
              type="button"
              judulButton="Daftar"
              className="w-[474px] h-[84px] text-2xl py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <Link to="/loginadmin" className="mt-4">
            <p className="font-body text-xl hover:underline">
              Masuk sebagai Admin
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
