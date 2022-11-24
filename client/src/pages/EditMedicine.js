import React from "react";

import { useSearchParams, Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DefaultBtn from "../components/common/DefaultBtn";
import DefaultInput from "../components/common/DefaultInput";
import DefaultTxtArea from "../components/common/DefaultTxtArea";
import Navbar from "../components/Navbar";
import { isAdmin, getUser } from "../helpers/auth"

const EditMedicine = () => {

  const [ medicine, setMedicine ] = React.useState({
    name: '',
    description: '',
    stock: '',
    manufacturer: '',
    price:''
  })

  console.log(medicine)

  // ambil value awal dari 'medicine'
  const [searchParams, setSearchParams] = useSearchParams()
  const medicineId = searchParams.get('id')

  React.useEffect(() => {
    const { __token } = getUser()
    if (!( isAdmin() && __token ))
      window.location.href = '/'
    fetch(`http://localhost:9000/${medicineId}`, {
      headers: {
        "Authorization": "Bearer " + __token,
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setMedicine({
        name: data.name,
        description: data.description,
        stock: data.stock,
        manufacturer: data.manufacturer, // data.log tdk dibutuhkan
        price: data.price
      }))
  }, [])

  function handleChange(event) {
    const { type, name, value } = event.target
    if (type === "button" && !isNaN(parseInt(medicine.stock))) {
      if (name === "stock--increment")
        setMedicine(prev => ({...prev, stock: (parseInt(prev.stock) + 1).toString()}))
      else if (name === "stock--decrement")
        setMedicine(prev => ({...prev, stock: (parseInt(prev.stock) - 1).toString()}))
    } else
    setMedicine(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    const { __token, __id } = getUser()
    // cek medicine.stock
    if (medicine.stock < 0) {
      toast.error("Stok obat tidak boleh negatif")
    } else {
      fetch(`http://localhost:9000/${medicineId}`, {
        method: 'PUT',
        headers: {
          "Authorization": "Bearer " + __token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...medicine,
          userId: __id
        })
      })
      .then(res => res.json())
      .then(data => {
        /*
        NOTE:
        'data' berisi object { message:  } yg dapat berisi:
          "Medicine was updated successfully"
          "Error updating medicine with id ${id}"

        TO DO:
        tampilkan komponen modal tergantung isi respon dari API
        */
        toast.success(data.message)
        setTimeout(() => {
          window.location.href = "/desc?id=" + medicineId;
        }, 2000);
      })
    }
  }
  
  return (
    <div className="bg-putih h-screen">
      <ToastContainer/>
      <Navbar/>
      <div className="font-body mx-9 my-4 md:mx-[120px] md:my-[30px] text-[15px] md:text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-3xl md:text-5xl pb-3">
          Edit Obat
        </h1>

        <div className="w-full md:grid grid-cols-2">
          <div>
            <p>Nama Obat :</p>
            <div className="inline-block">
              <DefaultInput
                className="w-[200px] md:w-[350px] h-[50px]"
                name="name"
                onChange={handleChange}
                value={medicine.name}
              />
            </div>
          </div>
          <div className="order-1">
            <p>Manufacturer Obat :</p>
            <div className="inline-block">
              <DefaultInput
                className="w-[200px] md:w-[350px] h-[50px]"
                name="manufacturer"
                onChange={handleChange}
                value={medicine.manufacturer}
              />
            </div>
          </div>  
          <div className="order-1">
            <p>Stok Obat :</p>
            <DefaultInput
              type="number"
              className="w-[200px] h-[50px]"
              name="stock"
              onChange={handleChange}
              value={medicine.stock}
            />
          </div>      
          <div>
            <p>Harga Obat :</p>
            <p className="text-[15px] italic text-gray-400"></p>
            <DefaultInput
              type="number"
              className="w-[200px] h-[50px]"
              name="price"
              onChange={handleChange}
              value={medicine.price}
            />
          </div>
        </div>

        <div>
          <p>Deskripsi Obat :</p>
          <DefaultTxtArea
            name="description"
            value={medicine.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full mt-2 sm:mt-12 gap-2 sm:gap-0">
          <Link to={
                searchParams.get('todesc')
                ? {pathname: '../desc/', search: '?id=' + medicineId}
                : '../list'
                }>
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <DefaultBtn
            type="submit"
            judulButton="Edit Obat"
            className="text-putih text-sm lg:text-xl lg:w-[250px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            onClick={handleSubmit}
          />
        </div>

      </div>
    </div>
  )
};
 
export default EditMedicine;