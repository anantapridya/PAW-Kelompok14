import DefaultBtn from "../components/DefaultBtn";
import DefaultInput from "../components/DefaultInput";
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
        <DefaultInput
          type="textarea"
          placeholder="Tambahkan deskripsi mengenai obat"
          className="w-full h-[200px]"
        />

        {/* TODO: Buat ke tengah */}
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