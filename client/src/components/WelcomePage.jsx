import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Pharmaweb1 from "../img/Pharmaweb1.png";
const WelcomePage = () => {
  return (
    <div className="h-screen bg-putih">
      <Navbar />

      <div className="grid grid-cols-3 w-3/4 mx-auto gap-8 pt-24 2xl:pt-48">
        <div className="col-span-2 flex flex-col items-start gap-2">
          <h1 className="text-biru-sedang font-heading font-bold md:text-3xl 2xl:text-5xl my-2">
            Selamat Datang di
          </h1>
          <h1 className="text-biru-sedang font-heading font-bold md:text-5xl 2xl:text-7xl my-2">
            Pharma-Web
          </h1>
          <p className="font-body text-lg 2xl:text-2xl text-justify italic mt-4">
            Pharma-Web merupakan aplikasi manajemen obat dalam apotek berbasis
            web. Web ini ditujukan kepada para apoteker (admin) agar lebih mudah
            dalam mencatat dan mengakses data obat setiap waktunya. Selain itu,
            pengguna juga dapat menggunakan web untuk mengetahui informasi
            mengenai obat.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={Pharmaweb1} alt="" className="w-7/8 2xl:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
