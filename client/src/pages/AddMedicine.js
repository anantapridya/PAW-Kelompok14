import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
import DefaultTxtArea from "../components/DefaultTxtArea";
import Navbar from "../components/Navbar";

const AddMedicine = () => {
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
          />
        </div>

        <p>Manufacturer Obat :</p>
        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="PT Sindo Farma"
            className="w-[330px] h-[50px]"
          />
        </div>

        <p>Stok Obat :</p>
        {/* TODO: Buat sejajar */}
        <div className="inline-block">
          <DefaultInput
            placeholder="1000"
            className="w-[330px] h-[50px]"
          />
          <button>+</button>
          <button>-</button>
        </div>

        {/* TODO: Buat jadi paragraf multiline */}
        <p>Deskripsi Obat :</p>
        <DefaultTxtArea
          placeholder="Tambahkan deskripsi mengenai obat"
        />

        {/* TODO: Buat ke tengah */}
        {/* Ket: Button "Batal" bisa dibuat pake "DefaultBtn", buat style kayak warna, outline bisa disesuaiin di className */}
        <button>Batal</button>

        <DefaultBtn
          type="button"
          judulButton="Tambah Obat"
          className=""
        />
      </div>
    </div>
  )
};
 
export default AddMedicine;