import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";

const AddTransaction = () => {
  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl pb-3">
          Tambah Transaksi
        </h1>
        <p className="text-gray-400 italic text-2xl pb-10">
          Nama Obat
        </p>
        <p>Waktu Transaksi</p>
        <SetDate/>
        <p>Stok</p>

        <div className="grid grid-cols-[220px_60px_50px] flex flex-col items-center">
          <DefaultInput
            placeholder="1000"
            className="w-[200px] h-[50px]"
          />
          <DefaultBtn
            type="button"
            judulButton="-"
            className="w-[40px] h-[50px] text-2xl text-biru-tua bg-biru-muda rounded-lg outline outline-2"
          />
          <DefaultBtn
            type="button"
            judulButton="+"
            className="w-[40px] h-[50px] text-2xl text-biru-tua bg-biru-muda rounded-lg outline outline-2"
          />
        </div>

        <p>Keterangan</p>
        <DefaultTxtArea
          placeholder="Tambahkan catatan keterangan transaksi"
        />

        <div className="flex flex-col items-center justify-center py-3">
          <DefaultBtn
            type="button"
            judulButton="Tambah Transaksi"
            className=""
          />
        </div>
        
      </div>
    </div>
  )
};
 
export default AddTransaction;