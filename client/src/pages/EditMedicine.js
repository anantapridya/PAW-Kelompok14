import React from "react";

import { useSearchParams, Link } from "react-router-dom";

import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";

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
    fetch(`http://localhost:9000/${medicineId}`)
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
        <h1 className="text-biru-sedang font-heading font-bold text-4xl pb-10">
          Edit Obat
        </h1>

        <div className="w-full grid grid-cols-2">
          <div>
            <p>Nama Obat :</p>
            <div className="inline-block">
              <DefaultInput
                className="w-[450px] h-[50px]"
                name="name"
                onChange={handleChange}
                value={medicine.name}
              />
            </div>
          </div>
          <div>
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
            <p>Manufacturer Obat :</p>
            <div className="inline-block">
              <DefaultInput
                className="w-[450px] h-[50px]"
                name="manufacturer"
                onChange={handleChange}
                value={medicine.manufacturer}
              />
            </div>
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

        <div className="flex justify-between w-full grid grid-cols-[100px_125px]">
          <Link to={
          searchParams.get('todesc')
          ? {pathname: '../desc/', search: '?id=' + medicineId}
          : '../list'
          }>
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          <DefaultBtn
            type="button"
            judulButton="Edit Obat"
            className="hover:bg-putih hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            onClick={handleSubmit}
          />
        </div>

      </div>
    </div>
  )
};
 
export default EditMedicine;