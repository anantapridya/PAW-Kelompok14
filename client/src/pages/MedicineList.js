import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

const MedicineList = () => {
  
  const [medicineData, setMedicineData] = React.useState([])
  
  // // Data Dummy
  const data = [
    {
      id: 1,
      name: "Panadol",
      price: 25000,
    },
    {
      id: 2,
      name: "Promag",
      price: 10000,
    },
    {
      id: 3,
      name: "Obat Pilek",
      price: 30000,
    },
    {
      id: 4,
      name: "Obat Diare",
      price: 50000,
    },
    {
      id: 5,
      name: "Antibiotik",
      price: 15000
    },
    {
      id: 6,
      name: "Mylanta",
      price: 10000
    },
    {
      id: 7,
      name: "Bodrex",
      price: 10000
    }
  ]

  React.useEffect(() => {
    fetch("http://localhost:9000") // temporary URL
      .then(response => response.json())
      .then(data => setMedicineData(data))
    // setMedicineData(data)

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

const MedicineConfig = ({items}) =>{
  return(
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
                <a className="font-body text-[20px] px-[50px] py-[5px] bg-white rounded-[8px] mr-[15px] no-underline text-black" href="/edit">Edit</a>
                <Modal btn="Delete" desc="Apakah Anda Yakin Untuk Menghapus Obat" btnmodal="Delete" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}