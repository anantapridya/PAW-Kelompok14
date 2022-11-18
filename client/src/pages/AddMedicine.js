import React from "react";

import { Link, useSearchParams } from "react-router-dom";

import DefaultBtn from "../components/common/DefaultBtn";
import DefaultInput from "../components/common/DefaultInput";
import DefaultTxtArea from "../components/common/DefaultTxtArea";
import Navbar from "../components/Navbar";
import Modal from '../components/common/Modal';
import { isAdmin, getUser } from "../helpers/auth";

const AddMedicine = () => {

  React.useEffect(() => {
    if (!isAdmin())
      window.location.href = '/'
  }, [])

  const [formData, setFormData] = React.useState({
    name: '',
    manufacturer: '',
    stock: '',
    description: '',
    price:''
  })

  console.log(formData)

  function handleChange(event) {
    const { type, name, value } = event.target
    if (type === "button" && !isNaN(parseInt(formData.stock))) {
      if (name === "stock--increment")
        setFormData(prevData => ({...prevData, stock: (parseInt(prevData.stock) + 1).toString()}))
      else if (name === "stock--decrement")
        setFormData(prevData => ({...prevData, stock: (parseInt(prevData.stock) - 1).toString()}))
    } else
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    const { __token, __id } = getUser()
    const submittedForm = {
      ...formData,
      stock: parseInt(formData.stock),
      price: parseInt(formData.price),
      userId: __id
    }
    fetch('https://pharmaweb14.herokuapp.com/add', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + __token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submittedForm)
    },)
    .then(res => res.json())
    .then(data => {

      /*
        apabila berhasil, 'data' berisi object obat yg ditambahkan ke database,
        apabila gagal, 'data' dapat berisi:
        {message: "request's body must contain 'name', 'manufacturer', 'description', and 'stock' field"}
        {message: "Error creating medicine."}
        {message: errorException}
      */
      if (data.message) {
        setModalState(prev => ({
          ...prev,
          isOpen: true,
          desc: data.message
        }))
      } else {
        setModalState(prev => ({
          ...prev,
          isOpen: true,
          desc: "Data obat berhasil ditambahkan!",
          onClose() {
            window.location.href = '../list'
          }
        }))
      }

    })
  }

  const [modalState, setModalState] = React.useState({
    isOpen: false,
    desc: '',
    onClose() {
      setModalState(prev => ({...prev, isOpen:false}))
    }
  })

  return (
    <div className="bg-putih md:h-screen">
      <Modal
        show={modalState.isOpen}
        onClose={modalState.onClose}
        onClick={modalState.onClose}
        className="bg-[#FF0000]"
        desc={modalState.desc}
        title="Message Box"
        button="OK"
      />
      <Navbar/>
      <div className="font-body mx-9 my-4 md:mx-[120px] md:my-[30px] text-[15px] md:text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-3xl md:text-5xl pb-3">
          Tambah Obat
        </h1>

        <div className="md:grid grid grid-cols-2">
          <div>
            <p>Nama Obat :</p>
            <div className="inline-block">
              <DefaultInput
                placeholder="Paracetamol"
                className="w-[200px] md:w-[350px] h-[50px]"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          </div>
          <div>
            <p>Stok Obat :</p>
            <DefaultInput
              type="number"
              placeholder="1000"
              className="w-[200px] h-[50px]"
              name="stock"
              onChange={handleChange}
              value={formData.stock}
              min="0"
            />
          </div>
          <div>
            <p>Manufacturer Obat :</p>
            <div className="inline-block">
              <DefaultInput
                placeholder="PT Sindo Farma"
                className="w-[200px] md:w-[350px] h-[50px]"
                name="manufacturer"
                onChange={handleChange}
                value={formData.manufacturer}
              />
            </div>
          </div>        
          <div>
            <p>Harga Obat :</p>
            <p className="text-[15px] italic text-gray-400"></p>
            <DefaultInput
              type="number"
              placeholder="10000"
              className="w-[200px] h-[50px]"
              name="price"
              onChange={handleChange}
              value={formData.price}
            />
          </div>
        </div>
    
        <div>
          <p>Deskripsi Obat :</p>
          <DefaultTxtArea
            placeholder="Tambahkan deskripsi mengenai obat"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full mt-2 sm:mt-12 gap-2 sm:gap-0">
        <Link to="/list">
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <DefaultBtn
            type="submit"
            judulButton="Tambah Obat"
            className="text-sm lg:text-xl lg:w-[250px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            onClick={handleSubmit}
          />
        </div>

      </div>
    </div>
  )
};
 
export default AddMedicine;