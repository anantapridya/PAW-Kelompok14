import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import Navbar from "../components/Navbar";
import SetDate from "../components/SetDate";

const AddTransaction = () => {
  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <div className="font-body mx-[150px] my-[30px] text-xl">
        <h1 className="text-biru-sedang font-heading font-bold text-4xl">
          Tambah Transaksi
        </h1>
        <p className="text-gray-400 italic text-2xl py-3">
          Nama Obat
        </p>
        <p>Waktu Transaksi</p>

        {/* TODO: Benerin style */}
        <SetDate/>
        <p>Stok</p>

        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="1000"
            className="w-[200px] h-[50px]"
          />
          <button>+</button>
          <button>-</button>
        </div>

        {/* TODO: Buat jadi paragraf multiline */}
        <p>Keterangan</p>
        <DefaultInput
          type="textarea"
          placeholder="Tambahkan catatan keterangan transaksi"
          className="w-full h-[200px]"
        />

        {/* TODO: Buat ke tengah */}
        <DefaultBtn
          type="button"
          judulButton="Tambah Transaksi"
          className=""
        />
      </div>
    </div>
  )
};
 
export default AddTransaction;