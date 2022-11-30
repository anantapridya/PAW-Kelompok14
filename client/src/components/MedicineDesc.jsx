import React, { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import backArrow from "../img/back-arrow.png";
import editMedicine from "../img/edit-medicine.png";
import Navbar from "./Navbar.jsx";
import { isAdmin } from "../helpers/auth";

export default function MedicineDesc() {
  const [medicine, setMedicine] = useState({
    _id: "",
    name: "",
    manufacturer: "",
    description: "",
    price: 0,
    log: [],
  });

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const medicineId = searchParams.get("id"); // id di pass dari URL

  // // DATA DUMMY:
  // const med = {"_id":"633167d72a825657dc598ad2","name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
      setIsAuthorized(true);
    } else {
      return <Navigate replace to="/" />;
    }

    fetch(`https://pharmaweb14.herokuapp.com/${medicineId}`, {
      headers: {
        Authorization: "Bearer " + `${token}`,
        "Content-Type": "application/json",
      },
      // ,
      // credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      setMedicine(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main
        className={`bg-putih relative w-full grid h-full md:h-[calc(100vh_-_64px)] overflow-y-hidden ${
          isAdmin() ? "md:grid-cols-desc-page md:grid-rows-desc-page" : ""
        }`}
      >
        <Link
          to="/list"
          className="absolute h-[20px] md:h-[40px] top-[15px] md:top-[20px] left-[25px] md:left-[50px] z-[1] hover:-translate-y-1  transition-all"
        >
          <img
            src={backArrow}
            alt="back arrow"
            className=" h-[20px] md:h-[40px] drop-shadow-4xl"
          />
        </Link>
        <MedicineDescArticle
          isAuthorized={isAuthorized}
          medicineData={medicine}
        />
        {isAdmin() && (
          <MedicineDescAside medicineLog={medicine.log} medId={medicineId} />
        )}
      </main>
    </>
  );
}

// sub components:

function MedicineDescAside({ medicineLog, medId }) {
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
  }, []);
  const transactions = medicineLog.map((log) => (
    <MedicineDescLog
      date={log[2].split(", ")[0]}
      time={log[2].split(", ")[1]}
      desc={log[1]}
      stockChange={parseInt(log[0])}
    />
  ));
  return (
    <div className="bg-[#FFFFFF] md:grid-cols-2 py-[20px] md:py-[40px] px-[25px] md:px-[50px] text-[18px] font-body relative rounded-tl-3xl rounded bl-3xl shadow-4xl">
      <h3 className="font-body text-2xl md:text-[40px] font-bold text-center">
        CATATAN TRANSAKSI
      </h3>
      <div className="px-[5px] rounded-[20px] md:absolute md:top-[100px] md:left-[50px] md:right-[50px] md:bottom-[50px] overflow-y-scroll scroll-smooth no-scrollbar mt-[20px] text-[12px] md:text-[20px]">
        {transactions}
      </div>
      {isAdmin() && (
        <Link
          to={{
            pathname: "/log",
            search: "?id=" + medId,
          }}
        >
          <div className="fixed bg-biru-tua overflow-hidden shadow-5xl h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full text-white flex items-center justify-center bottom-[50px] right-[50px] font-body text-[50px] md:text-[100px] z-[1] transition ease-out duration-150 hover:-rotate-90 hover:scale-105 peer">
            +
          </div>
          <div className="hidden md:block md:absolute bg-biru-tua text-white overflow-hidden shadow-5xl h-[25px] md:h-[60px] bottom-[130px] right-[80px] md:w-[60px] rounded-[30px] text-xs md:text-[20px] leading-[60px] indent-[10px] md:indent-[20px] duration-200 ease-in-out delay-100 peer-hover:right-[120px] peer-hover:w-[290px] ">
            Buat Catatan Transaksi
          </div>
        </Link>
      )}
    </div>
  );
}

function MedicineDescArticle({ medicineData, isAuthorized }) {
  return (
    <article
      className={`h-screen flex items-center justify-center ${
        isAdmin() ? "" : "nosidebar"
      })`}
    >
      <div className="relative box-border w-[80%] md:h-[80%] rounded-[30px] bg-[#FFFFFF] py-[20px] md:py-[40px] px-[25px] md:px-[50px] shadow-6xl ">
        <h1 className="font-body font-bold text-xl lg:text-7xl mb-3">
          {medicineData.name}
        </h1>
        <h2 className="font-body text-sm lg:text-4xl">
          Produksi {medicineData.manufacturer}
        </h2>
        <p className="lg:leading-9 mt-[15px] lg:mt-[50px] font-body text-xs lg:text-[27px] italic">
          {medicineData.description}
        </p>
        <p className="font-body text-xs lg:text-[35px] md:absolute md:bottom-[40px] md:left-[50px]">
          Stok: {medicineData.stock}
        </p>
        <p className="font-body text-xs lg:text-[27px] md:absolute md:bottom-[40px] md:right-[120px]">
          Harga: Rp{medicineData.price.toLocaleString("id-ID")},00
        </p>
        {isAdmin() && (
          <Link
            to={{
              pathname: "../edit",
              search: "?id=" + medicineData._id + "&todesc=true",
            }}
          >
            <div className="fold:max-md:mt-4 rounded-[20px] h-8 md:w-24 md:h-24 md:absolute flex items-center justify-center bg-biru-tua md:right-[-20px] md:bottom-[50px] shadow-5xl hover:scale-105 ease-out duration-100">
              <img
                className="h-[60%]"
                alt="edit medicine logo"
                src={editMedicine}
              />
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}

function MedicineDescLog(props) {
  return (
    <div className="mb-[17px]">
      <div className="h-8 leading-8 font-body font-bold text-[12px] md:text-[20px] md:w-44 md:h-7 md:leading-[30px] text-center rounded-t-[20px] border-2 border-biru-sedang border-b-0">
        {props.date}
      </div>
      <div className="md:rounded-tr-[20px] rounded-b-[20px] bg-putih relative pb-[35px] border-2 border-biru-sedang">
        <p className="max-md:text-center italic py-[15px] px-[20px]">
          {props.desc}
        </p>
        <p className="text-center md:absolute md:bottom-[10px] font-semibold md:left-[20px]">
          {props.time}
        </p>
        <p
          className={`text-center md:absolute md:bottom-[10px] font-semibold md:right-[20px] ${
            props.stockChange > 0 ? "text-[#146311]" : "text-[#941616]"
          }`}
        >
          {Math.abs(props.stockChange)} obat{" "}
          {props.stockChange > 0 ? "masuk" : "keluar"}
        </p>
      </div>
    </div>
  );
}
