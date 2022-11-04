import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./DefaultBtn";
import DefaultInput from "./DefaultInput";

export default function SignupPage() {

  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    email: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

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
            name="username"
            value={formData.username}
          />
          <DefaultInput
            placeholder="Email"
            className="w-full text-sm md:text-xl"
            name="email"
            value={formData.email}
          />
          <DefaultInput
            placeholder="Password"
            className="w-full text-sm md:text-xl"
            name="password"
            value={formData.password}
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
                judulButton="Daftar"
                className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
