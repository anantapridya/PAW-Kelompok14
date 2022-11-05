import React from "react";
import { Link } from "react-router-dom";
import Pattern from "../img/bg-login.svg";
import DefaultBtn from "./DefaultBtn";
import DefaultInput from "./DefaultInput";

export default function UserLogin() {

  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    /*
    NOTE:
      untuk sementara, fitur sign in tidak berfungsi karena
      JWT token belum disimpan ke session & belum dikirimkan
      ke API setiap fetch()
    */
    fetch("http://localhost:9000/api/auth/signin", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => {

        localStorage.setItem('user', JSON.stringify(data))
        
        /*
        jika berhasil, 'data' akan berisi:
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
          },
          token
        }
        jika gagal, 'data' dapat berisi:
        { message: "User Not found." } (404)
        { message: "Invalid Password!" } (401)

        NOTE:
        to do: penyimpanan JWT token ke session/cookie
        */
      })
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
            onChange={handleChange}
          />
          <DefaultInput
            placeholder="Password"
            className="w-full text-sm md:text-xl"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full mt-4 sm:mt-12 gap-2 sm:gap-0">
            <Link to="/welcome">
              <DefaultBtn
                type="button"
                judulButton="Kembali"
                className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
            <Link to="/loginusert">
              <DefaultBtn
                type="submit"
                judulButton="Masuk"
                className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
                onClick={handleSubmit}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
