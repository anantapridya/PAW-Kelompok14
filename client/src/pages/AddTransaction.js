import { Link } from "react-router-dom";
import DefaultBtn from "../components/DefaultBtn";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";
import SetTime from "../components/SetTime";
import Stock from "../components/Stock";

const AddTransaction = () => {
  // Data dummy
  const medicine = {"_id":{"$oid":"633167d72a825657dc598ad2"},"name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}

  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl pb-3">
          Tambah Transaksi
        </h1>
        <p className="text-gray-400 italic text-2xl pb-10">
          {medicine.name}
        </p>

        <p>Tanggal Transaksi</p>
        <SetDate/>
        <p>Waktu Transaksi</p>
        <SetTime/>

        <p>Stok</p>
        <Stock/>

        <p>Keterangan</p>
        <DefaultTxtArea
          placeholder="Tambahkan catatan keterangan transaksi"
        />

        <div className="flex justify-between w-full grid grid-cols-[100px_218px]">
          <Link to="/desc">
            <DefaultBtn
              type="button"
              judulButton="Batal"
              className="bg-white text-gray-400 outline outline-2 outline-gray-300 hover:text-biru-tua hover:border-4 hover:border-biru-tua hover:transition-all"
            />
          </Link>
          
          <DefaultBtn
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