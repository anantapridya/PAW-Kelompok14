import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import DefaultBtn from "../components/DefaultBtn";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";
import SetTime from "../components/SetTime";
import DefaultInput from "../components/DefaultInput";

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
    // cek apakah stock menjadi negatif
    if (medicine.stock + parseInt(formData.stock) < 0) {
      // to do: tambahkan modal/fungsi yg akan dijalankan
      // fungsi sementara:
      alert('stok obat yang tersisa tidak boleh negatif')
      return
    } else {
      const transactionTime = ( date == null ? now.toLocaleDateString() : date.toLocaleDateString() ) + ', ' + time
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
          /*
          NOTE:
          'data' akan berisi object { message:  }
          apabila sukses, 'message' akan berisi:
            "Transaction log added for medicine with id ${id}"
          apabila gagal, 'message' dapat berisi:
            "Medicine stock cannot be less than zero." (400)
            "Medicine with id ${id} not found" (404)
            "Cannot add empty transaction log" (400)

          TO DO:
          tampilkan komponen modal tergantung dgn response yg diterima
          dari API
          */

          // fungsi sementara, delete soon
          alert(data.message)
          if(data.message.startsWith("Transaction"))
            window.location.href = '/desc?id=' + medicineId
        })
    }
      
  }

  // Data dummy
  // const medicine = {"_id":{"$oid":"633167d72a825657dc598ad2"},"name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}

  return (
    <div className="bg-putih md:h-screen">
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
            <p>Stok masuk (stok saat ini: {medicine.stock})</p>
            <DefaultInput
              type="number"
              placeholder="-10"
              className="w-[200px] h-[50px]"
              name="stock"
              onChange={handleChange}
              value={formData.stock}
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