import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import DefaultBtn from "../components/DefaultBtn";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";
import SetTime from "../components/SetTime";
import DefaultInput from "../components/DefaultInput";
import Modal from "../components/Modal";

const AddTransaction = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const medicineId = searchParams.get('id')

  const [medicine, setMedicine] = React.useState({
    name: '',
    stock: 0
  })
  React.useEffect(() => {
    fetch(`http://localhost:9000/${medicineId}`)
      .then(res => res.json())
      .then(data => setMedicine({
        name: data.name,
        stock: data.stock
      }))
  }, [])

  const [formData, setFormData] = React.useState({
    description: '',
    stock: 0
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
    const transactionTime = ( date == null ? now.toLocaleDateString() : date.toLocaleDateString() ) + ', ' + time
    console.log(JSON.stringify({
      description: formData.description,
      stock: parseInt(formData.stock),
      date: transactionTime
    }))
    fetch(`http://localhost:9000/${medicineId}/log`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: formData.description,
        stock: parseInt(formData.stock),
        date: transactionTime
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message.startsWith("Transaction log added for medicine with id"))
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
        <div>
          <h1 className="text-biru-sedang font-heading font-bold text-4xl pb-3">
            Tambah Transaksi
          </h1>
          <p className="text-gray-400 italic text-2xl pb-10">
            {medicine.name}
          </p>
        </div>
        
        <div className="grid grid-cols-[300px_300px]">
          <div>
            <p>Tanggal Transaksi</p>
            <SetDate onChange={newDate => setDate(newDate)} value={date} />
          </div>
          <div>
            <p>Waktu Transaksi</p>
            <SetTime onChange={newTime => setTime(newTime)} value={time} />
          </div>
        </div>

        <div>
            <p>Transaksi Stok</p>
            <p className="text-[15px] italic text-gray-400">Stok saat ini: {medicine.stock}</p>
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
        
        <div>
          <p>Keterangan</p>
          <DefaultTxtArea
            placeholder="Tambahkan catatan keterangan transaksi"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        
        <div className="flex justify-between w-full grid grid-cols-[100px_218px]">
          <Link to={{
                pathname: "/desc",
                search: "?id=" + medicineId
              }}>
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          
          <DefaultBtn
            onClick={handleSubmit}
            type="button"
            judulButton="Tambah Transaksi"
            className="hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
          />
        </div>
        
      </div>
    </div>
  )
};
 
export default AddTransaction;