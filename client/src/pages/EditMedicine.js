import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import React from "react";
import { useSearchParams } from "react-router-dom";

const EditMedicine = () => {

  const [ medicine, setMedicine ] = React.useState({
    name: '',
    description: '',
    stock: 0,
    manufacturer: ''
  })

  console.log(medicine)

  // ambil value awal dari 'medicine'
  const [searchParams, setSearchParams] = useSearchParams()
  const medicineId = searchParams.get('id')
  React.useEffect(() => {
    fetch(`http://localhost:9000/${medicineId}`)
      .then(res => res.json())
      .then(data => setMedicine({
        name: data.name,
        description: data.description,
        stock: data.stock,
        manufacturer: data.manufacturer // data.log tdk dibutuhkan
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
    // cek medicine.stock
    if (medicine.stock < 0) {
      // to do: beri notif modal (?)
      // fungsi sementara:
      alert('stok obat tidak boleh negatif')
    } else {
      fetch(`http://localhost:9000/${medicineId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicine)
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
        alert(data.message) // kode sementara, delete soon
        window.location.href = '/desc?id=' + medicineId
      })
    }
  }
  
  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl">
          Edit Obat
        </h1>

        <p>Nama Obat :</p>
        <div className="inline-block">
          <DefaultInput
            className="w-[330px] h-[50px]"
            name="name"
            value={medicine.name}
            onChange={handleChange}
          />
        </div>

        <p>Manufacturer Obat :</p>
        <div className="inline-block">
          <DefaultInput
            className="w-[330px] h-[50px]"
            name="manufacturer"
            value={medicine.manufacturer}
            onChange={handleChange}
          />
        </div>

        <p>Stok Obat :</p>
        <div className="inline-block">
          <DefaultInput
            type="number"
            className="w-[330px] h-[50px]"
            name="stock"
            value={medicine.stock}
            onChange={handleChange}
          />
          <button type="button" name="stock--increment" onClick={handleChange}>+</button>
          <button type="button" name="stock--decrement" onClick={handleChange}>-</button>
        </div>

        <p>Deskripsi Obat :</p>
        <DefaultTxtArea
          name="description"
          value={medicine.description}
          onChange={handleChange}
        />

        <button
        onClick={() => {window.location.href = '/list'}}
        >Batal</button>

        <DefaultBtn
          onClick={handleSubmit}
          type="button"
          judulButton="Edit Obat"
          className=""
        />
      </div>
    </div>
  )
};
 
export default EditMedicine;