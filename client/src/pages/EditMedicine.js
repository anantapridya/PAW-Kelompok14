import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";

const EditMedicine = () => {
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
          />
        </div>

        <p>Manufacturer Obat :</p>
        <div className="inline-block">
          <DefaultInput
            className="w-[330px] h-[50px]"
          />
        </div>

        <p>Stok Obat :</p>
        <div className="inline-block">
          <DefaultInput
            className="w-[330px] h-[50px]"
          />
          <button>+</button>
          <button>-</button>
        </div>

        <p>Deskripsi Obat :</p>
        <DefaultTxtArea/>

        <button>Batal</button>

        <DefaultBtn
          type="button"
          judulButton="Edit Obat"
          className=""
        />
      </div>
    </div>
  )
};
 
export default EditMedicine;