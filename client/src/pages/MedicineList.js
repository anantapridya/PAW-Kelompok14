import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import DefaultBtn from "../components/DefaultBtn";

const MedicineList = () => {
  
  const [medicineData, setMedicineData] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:9000/")
      .then(response => response.json())
      .then(data => setMedicineData(data))
      /*
        TO DO:
        - autentikasi JWT token pada header saat fetch()
        - data untuk harga obat tidak ada di database
      */

  }, [])


  return (
    <>
    <Navbar />
    <div className="mx-[120px] my-[30px] flex flex-col">
      <div className="flex justify-between items-center mb-[50px]">
        <h2 className="text-[58px] font-body font-semibold">Daftar Obat</h2>
        <div className="flex">
          <Dropdown />
          <input className="ml-[40px] rounded-[0.375rem] text-center h-[36px] border-[#3F65FF] border-2 placeholder:text-center placeholder:text-black" type="text" placeholder="Search"></input>
        </div>
      </div>
      <MedicineConfig items={medicineData}/>
    </div>
    </>
  );
};

export default MedicineList;

const MedicineConfig = ({items}, props) =>{
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () =>{
    setIsOpen(false);
  }
  const openModal = () =>{
    setIsOpen(true);
  }
  return(
    <>
    {/* Modal Config */}
    <Modal show={isOpen} onClose={closeModal} onClick={closeModal} className="bg-[#FF0000]" desc="Apakah Anda Yakin Akan Menghapus Obat" title="Message Box" button="Delete" />
    <div className="flex flex-col">
      {items.map((data, index) => {
        const {_id, name, price} = data;
        return(
          <div key={index}>
            <div className="flex justify-between py-[30px] px-[50px] bg-[#B2FCFF] mb-[20px] rounded-[16px] hover:drop-shadow-xl transition">
              <Link to={{
                pathname: "/desc",
                search: "?id=" + _id
              }}>
                <div className="hover:font-bold transition-all flex w-[500px] justify-between border-black border-b-2 border-solid items-end pb-1" >
                  <p className="font-body text-[25px]">{name}</p>
                  <p className="font-body">Rp{price}</p>
                </div>
              </Link>
              <div className="items-center fitur flex">
              <Link to={{
                pathname: "/edit",
                search: "?id=" + _id
              }} >
                <DefaultBtn judulButton="Edit" className="border-biru-sedang bg-white text-black border-2 mr-[30px] px-[25px]" />
              </Link>
                <DefaultBtn onClick={openModal} className="bg-[#FF0000] border-2 border-[#FF0000]" judulButton="Delete"/>              
              </div>
            </div>
          </div>
        )
      })}
    </div>
    </>
  )
}