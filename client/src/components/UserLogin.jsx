import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./common/DefaultBtn";
import DefaultInput from "./common/DefaultInput";
import { isAuth } from "../helpers/auth";

export default function UserLogin() {
  const [isLoged, setIsLoged] = useState(isAuth());
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:9000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success("Selamat datang!");
        setTimeout(() => {
          setIsLoged(true);
        }, 1000);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  if (isLoged) {
    return <Navigate replace to="/list" />;
  }

  return (
    <div
      className="w-full h-screen bg-putih bg-repeat bg-auto flex"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <ToastContainer />
      <div className="w-[240px] sm:w-[500px] lg:w-[780px] bg-biru-muda/[.1] rounded-3xl backdrop-blur-sm shadow-3xl m-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-3/4 mx-auto mt-[50px] md:mt-[100px] mb-[33px] md:mb-[66px]"
        >
          <DefaultInput
            placeholder="Username"
            className="w-full text-sm md:text-xl"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <DefaultInput
            placeholder="Password"
            className="w-full text-sm md:text-xl"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />

          <div className="flex items-center justify-between w-full mt-4 sm:mt-12 gap-2 sm:gap-0">
            <Link to="/">
              <DefaultBtn
                type="button"
                judulButton="Kembali"
                className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>

            {/* <Link to="/"> */}
            <DefaultBtn
              type="submit"
              judulButton="Masuk"
              className="text-putih text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              onClick={handleSubmit}
            />
            {/* </Link> */}
          </div>
        </form>

        <p className="font-body text-xs md:text-xl text-center mb-8">
          Belum memiliki akun?{" "}
          <span className="hover:underline">
            <Link to="/signup">Daftar disini</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
