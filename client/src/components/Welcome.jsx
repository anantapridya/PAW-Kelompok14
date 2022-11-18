import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Pharmaweb1 from "../img/Pharmaweb1.png";
import { useState } from "react";

export default function Welcome() {
  return (
    <>
      <ToastContainer />
      <div className="bg-putih xl:h-screen">
        <Navbar />
        <div className="grid grid-cols-3 w-3/4 mx-auto md:gap-4 lg:gap-8 pt-24 2xl:pt-48 pb-12">
          <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start gap-2">
            <h1 className="text-biru-tua font-heading font-bold text-xl md:text-3xl 2xl:text-5xl my-0.5 md:my-2">
              Selamat Datang di
            </h1>
            <h1 className="text-biru-tua font-heading font-bold text-3xl md:text-5xl 2xl:text-7xl my-0.5 md:my-2">
              Pharma-Web
            </h1>
            <p className="font-body md:text-lg 2xl:text-2xl text-justify italic mt-4 sm:w-3/4 md:w-auto">
              Pharma-Web merupakan aplikasi manajemen obat dalam apotek berbasis
              web. Web ini ditujukan kepada para apoteker (admin) agar lebih
              mudah dalam mencatat dan mengakses data obat setiap waktunya.
              Selain itu, pengguna juga dapat menggunakan web untuk mengetahui
              informasi mengenai obat.
            </p>
          </div>
          <div className="col-span-3 md:col-span-1 flex items-center justify-center mt-8 md:mt-0">
            <img
              src={Pharmaweb1}
              alt=""
              className="w-3/4 sm:w-1/2 md:w-full 2xl:w-3/4"
            />
          </div>
        </div>
      </div>
      <footer className="w-full md:h-16 flex md:absolute md:bottom-0 pb-8 bg-putih">
        <p className="font-body text-biru-tua text-center text-xs md:text-[20px] mx-auto">
          &copy; Kelompok 14 - Pengembangan Aplikasi Web
        </p>
      </footer>
    </>
  );
}
