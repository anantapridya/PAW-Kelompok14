import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import React from "react";

const AddMedicine = () => {

  const [formData, setFormData] = React.useState({
    name: '',
    manufacturer: '',
    stock: '',
    description: ''
  })

  console.log(formData)

  function changeHandler(event) {
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

  function submitHandler(event) {
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
        NOTE:
        apabila berhasil, 'data' berisi object obat yg ditambahkan ke database,
        apabila gagal, 'data' dapat berisi:
        {message: "request's body must contain 'name', 'manufacturer', 'description', and 'stock' field"}
        {message: "Error creating medicine."}
        {message: errorException}
      
        todo:
        buat agar elemen modal keluar tergantung output dari API
      */
      console.log(data)
    })
  }

  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl">
          Tambah Obat
        </h1>

        <p>Nama Obat :</p>
        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="Paracetamol"
            className="w-[330px] h-[50px]"
            name="name"
            onChange={changeHandler}
            value={formData.name}
          />
        </div>

        <p>Manufacturer Obat :</p>
        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="PT Sindo Farma"
            className="w-[330px] h-[50px]"
            name="manufacturer"
            onChange={changeHandler}
            value={formData.manufacturer}
          />
        </div>

        <p>Stok Obat :</p>
        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="1000"
            className="w-[330px] h-[50px]"
            name="stock"
            onChange={changeHandler}
            value={formData.stock}
          />
          <button type="button" name="stock--increment" onClick={changeHandler}>+</button>
          <button type="button" name="stock--decrement" onClick={changeHandler}>-</button>
        </div>

        {/* TODO: Buat jadi paragraf multiline */}
        <p>Deskripsi Obat :</p>
        <DefaultTxtArea
          placeholder="Tambahkan deskripsi mengenai obat"
          name="description"
          onChange={changeHandler}
          value={formData.description}
        />

        {/* TODO: Buat ke tengah */}
        {/* Ket: Button "Batal" bisa dibuat pake "DefaultBtn", buat style kayak warna, outline bisa disesuaiin di className */}
        <button>Batal</button>

        <DefaultBtn
          type="button"
          judulButton="Tambah Obat"
          className=""
          onClick={submitHandler}
        />
      </div>
    </div>
  )
};
 
export default AddMedicine;