import { Link } from 'react-router-dom'
import backArrow from '../img/back-arrow.png'
import Navbar from './Navbar.jsx'
// import '../css/MedicineDesc.css'

export default function MedicineDesc() {
    
    // ini data dummy, nanti diganti dgn fetch() ke database
    // const medicine = fetch blablabla where id=blablabla
    const medicine = {"_id":{"$oid":"633167d72a825657dc598ad2"},"name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}
    const isAuthorized = true

    return (
        <>
            <Navbar />
            <main className='bg-putih relative w-full grid h-[calc(100vh_-_64px)] overflow-y-hidden grid-cols-desc-page grid-rows-desc-page'>
                <Link to="/list" className="absolute h-[40px] top-[20px] left-[50px] z-[1] hover:-translate-y-1  transition-all">
                    <img src={backArrow} alt="back arrow" className='h-[40px] drop-shadow-4xl'/>
                </Link>
                <MedicineDescArticle isAuthorized={isAuthorized} medicineData={medicine} />
                {isAuthorized && <MedicineDescAside medicineLog={medicine.log} />}
            </main>
        </>
    )
    
}



// sub components:

function MedicineDescAside({ medicineLog }) {
    const transactions = medicineLog.map(log => (
        <MedicineDescLog 
            date={log[2].split(', ')[0]}
            time={log[2].split(', ')[1]}
            desc={log[1]}
            stockChange={parseInt(log[0])}
        />
    ));
    return (
        <aside className='bg-[#FFFFFF] grid-cols-2 py-[40px] px-[50px] text-[18px] font-body relative rounded-tl-3xl rounded bl-3xl shadow-4xl'>
            <h3 className='font-body text-[40px] font-bold text-center'>CATATAN TRANSAKSI</h3>
            <div className="px-[5px] rounded-[20px] absolute top-[100px] left-[50px] right-[50px] bottom-[50px] overflow-y-scroll scroll-smooth no-scrollbar mt-[20px] text-[20px]">
                {transactions}
            </div>
            <Link to="/log">
                <div className="absolute bg-biru-tua overflow-hidden shadow-5xl h-[100px] w-[100px] rounded-full text-white flex items-center justify-center bottom-[50px] right-[50px] font-body text-[100px] z-[1] transition ease-out duration-150 hover:-rotate-90 hover:scale-105 peer">+</div>
                <div className="absolute bg-biru-tua text-white overflow-hidden shadow-5xl h-[60px] bottom-[70px] right-[80px] w-[60px] rounded-[30px] text-[20px] leading-[60px] indent-[20px] duration-200 ease-in-out delay-100 peer-hover:right-[120px] peer-hover:w-[290px] ">Buat Catatan Transaksi</div>
            </Link>
        </aside>
    )
}

function MedicineDescArticle({ medicineData, isAuthorized }) {
    return (
        <article className={`flex items-center justify-center ${isAuthorized ? "" : "nosidebar"})`}>
            <div className="relative box-border w-[80%] h-[80%] rounded-[30px] bg-[#FFFFFF] py-[40px] px-[50px] shadow-6xl ">
                <h1 className='font-body font-bold text-7xl mb-3'>{medicineData.name}</h1>
                <h2 className='font-body text-4xl'>Produksi {medicineData.manufacturer}</h2>
                <p className="mt-[50px] font-body text-[27px] italic">{medicineData.description}</p>
                <p className="font-body text-[35px] absolute bottom-[40px] left-[50px]">Stok: {medicineData.stock}</p>
            </div>
        </article>
    )
}

function MedicineDescLog(props) {
    return (
        <div className='mb-[17px]'>
            <div className="font-body font-bold text-[20px] w-44 h-7 leading-[30px] text-center rounded-t-[20px] border-2 border-biru-sedang border-b-0 ">{props.date}</div>
            <div className="rounded-tr-[20px] rounded-b-[20px] bg-putih relative pb-[35px] border-2 border-biru-sedang">
                <p className="italic py-[15px] px-[20px]">{props.desc}</p>
                <p className="absolute bottom-[10px] font-semibold left-[20px]">{props.time}</p>
                <p className={`absolute bottom-[10px] font-semibold right-[20px] ${(props.stockChange > 0) ? "text-[#146311]" : "text-[#941616]"}`}>
                    {Math.abs(props.stockChange)} obat {props.stockChange > 0 ? "masuk" : "keluar"}
                </p>
            </div>
        </div>
    )
}
