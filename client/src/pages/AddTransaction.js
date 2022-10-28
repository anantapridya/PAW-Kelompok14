import BtnBiru from "../components/Buttons/BtnBiru";
import Navbar from "../components/Navbar";

const AddTransaction = () => {
  return (
    <div className="bg-putih md:h-screen">
      <Navbar/>
      <h1 className="text-biru-sedang font-heading font-bold text-xl md:text-3xl 2xl:text-5xl my-0.5 md:my-2">
        Tambah Transaksi
      </h1>
      <BtnBiru judulButton={"Tambah Transaksi"}/>
    </div>
  )
};
 
export default AddTransaction;