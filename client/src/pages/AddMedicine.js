import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import Modal from '../components/Modal';

const AddMedicine = () => {

  const [formData, setFormData] = React.useState({
    name: '',
    manufacturer: '',
    stock: '',
    description: ''
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
    const submittedForm = {
      ...formData,
      stock: parseInt(formData.stock)
    }
    fetch('http://localhost:9000/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        let modalMessage = ''
        switch (data.message) {
          case "request's body must contain 'name', 'manufacturer', 'description', and 'stock' field":
            modalMessage = "Data obat untuk ditambahkan belum lengkap."
            break
          default:
            modalMessage = "Terjadi kesalahan saat menambah data obat"
        }
        setModalState(prev => ({
          ...prev,
          isOpen: true,
          desc: modalMessage
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
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl pb-10">
          Tambah Obat
        </h1>

        <p>Nama Obat :</p>
        <div className="inline-block">
          <DefaultInput
            placeholder="Paracetamol"
            className="w-[330px] h-[50px]"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <p>Manufacturer Obat :</p>
        <div className="inline-block">
          <DefaultInput
            placeholder="PT Sindo Farma"
            className="w-[330px] h-[50px]"
            name="manufacturer"
            onChange={handleChange}
            value={formData.manufacturer}
          />
        </div>

        <p>Stok Obat :</p>
        <DefaultInput
          type="number"
          placeholder="1000"
          className="w-[330px] h-[50px]"
          name="stock"
          onChange={handleChange}
          value={formData.stock}
          min="0"
        />
        
        <p>Deskripsi Obat :</p>
        <DefaultTxtArea
          placeholder="Tambahkan deskripsi mengenai obat"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />

        <div className="flex justify-between w-full grid grid-cols-[100px_173px]">
          <Link to="/list">
              <DefaultBtn
                type="button"
                judulButton="Batal"
                className="bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              />
            </Link>
          
            <DefaultBtn
              type="button"
              judulButton="Tambah Obat"
              className="hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
              onClick={handleSubmit}
            />
          </div>
      </div>
    </div>
  )
};
 
export default AddMedicine;