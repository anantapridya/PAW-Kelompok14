import React from "react";

import { Link, useSearchParams } from "react-router-dom";

import { isAdmin, getUser } from "../helpers/auth"

import DefaultBtn from "../components/common/DefaultBtn";
import DefaultTxtArea from "../components/common/DefaultTxtArea";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";
import SetTime from "../components/SetTime";
import DefaultInput from "../components/common/DefaultInput";
import Modal from "../components/common/Modal";

const AddTransaction = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const medicineId = searchParams.get('id')

  const [medicine, setMedicine] = React.useState({
    name: '',
    stock: ''
  })
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
        stock: data.stock
      }))
  }, [])

  const [formData, setFormData] = React.useState({
    description: '',
    stock: ''
  })
  // state untuk time picker
  const now = new Date()
  const [date, setDate] = React.useState(now)
  const [time, setTime] = React.useState(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)


  console.log(formData, time, date)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    const { __token, __id } = getUser()
    const transactionTime = ( date == null ? now.toLocaleDateString() : date.toLocaleDateString() ) + ', ' + time
    console.log(JSON.stringify({
      description: formData.description,
      stock: parseInt(formData.stock),
      date: transactionTime
    }))
    fetch(`http://localhost:9000/${medicineId}/log`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + __token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: formData.description,
        stock: parseInt(formData.stock),
        date: transactionTime,
        userId: __id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message.startsWith("Transaksi ditambahkan untuk obat dengan id"))
          setModalState({
            isOpen: true,
            desc: "Transaksi obat berhasil ditambahkan.",
            onClose() {
              window.location.href = "../desc/?id=" + medicineId
            }
          })
        else
          setModalState(prev => ({
            ...prev,
            isOpen: true,
            desc: data.message
          }))
        /*
        'data' akan berisi object { message:  }
        apabila sukses, 'message' akan berisi:
          "Transaction log added for medicine with id ${id}"
        apabila gagal, 'message' dapat berisi:
          "Medicine stock cannot be less than zero." (400)
          "Medicine with id ${id} not found" (404)
          "Cannot add empty transaction log" (400)
        */
      })
  }

  console.log(formData)

  const [modalState, setModalState] = React.useState({
    isOpen: false,
    desc: '',
    onClose() {
      setModalState(prev => ({
        ...prev,
        isOpen: false
      }))
    }
  })

  return (
    <div className="bg-putih h-screen">
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
        <div>
          <h1 className="text-biru-sedang font-heading font-bold text-3xl md:text-5xl pb-3">
            Tambah Transaksi
          </h1>
          <p className="text-gray-400 italic text-xl md:text-2xl pb-5 md:pb-10">
            {medicine.name}
          </p>
        </div>
        
        <div className="md:grid grid-cols-2">
          <div>
            <p>Tanggal Transaksi</p>
            <SetDate onChange={newDate => setDate(newDate)} value={date} />
          </div>
          <div>
            <p>Waktu Transaksi</p>
            <SetTime onChange={newTime => setTime(newTime)} value={time} />
          </div>
          <div>
            <div>
              <p>Transaksi Stok </p>
              <p className="text-[10px] md:text-[15px] italic text-gray-400">(Stok saat ini: {medicine.stock})</p>
            </div>
            <DefaultInput
              type="number"
              placeholder="-10"
              className="w-[200px] h-[50px]"
              name="stock"
              onChange={handleChange}
              value={formData.stock}
              min={"-"+medicine.stock}
            />
          </div>
        </div>           
        
        <div>
          <p>Keterangan</p>
          <DefaultTxtArea
            placeholder="Tambahkan catatan keterangan transaksi"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full mt-2 sm:mt-12 gap-2 sm:gap-0">
          <Link to={{
                pathname: "/desc",
                search: "?id=" + medicineId
                }}>
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="text-sm lg:text-xl lg:w-[150px] lg:h-[52px] py-2 bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <DefaultBtn
            type="submit"
            judulButton="Tambah Transaksi"
            className="text-putih text-sm lg:text-xl lg:w-[250px] lg:h-[52px] py-2 hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            onClick={handleSubmit}
          />
        </div>
        
      </div>
    </div>
  )
};
 
export default AddTransaction;