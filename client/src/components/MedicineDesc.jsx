import { Link, useSearchParams } from 'react-router-dom'
import backArrow from '../img/back-arrow.png'
import Navbar from './Navbar.jsx'
import '../css/MedicineDesc.css'
import React from 'react'

export default function MedicineDesc() {
        
    const [medicine, setMedicine] = React.useState({
        _id: '',
        name: '',
        manufacturer: '',
        description: '',
        log: []
    })
    // set value awal isAuthorized menjadi false, lalu update berdasar token
    const [isAuthorized, setIsAuthorized] = React.useState(true)

    const [searchParams, setSearchParams] = useSearchParams()
    const medicineId = searchParams.get('id') // id di pass dari URL
    
    // // DATA DUMMY:
    // const med = {"_id":"633167d72a825657dc598ad2","name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}
    
    React.useEffect(() => {
        fetch(`http://localhost:9000/${medicineId}`)
            .then(res => res.json())
            .then(data => setMedicine(data))
            // to do: tambahkan JWT authorization
    }, [])

    


    return (
        <>
            <Navbar />
            <main>
                <Link to="/list" className="back-arrow">
                    <img src={backArrow} alt="back arrow" />
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
        <aside>
            <h3>CATATAN TRANSAKSI</h3>
            <div className="tsc--container">
                {transactions}
            </div>
            <Link to="/log">
                <div className="tsc--add">+</div>
                <div className="tsc--add--text">Buat Catatan Transaksi</div>
            </Link>
        </aside>
    )
}

function MedicineDescArticle({ medicineData, isAuthorized }) {
    return (
        <article className={isAuthorized ? "" : "nosidebar"}>
            <div className="card">
                <h1>{medicineData.name}</h1>
                <h2>Produksi {medicineData.manufacturer}</h2>
                <p className="card--description">{medicineData.description}</p>
                <p className="card--stock">Stok: {medicineData.stock}</p>
            </div>
        </article>
    )
}

function MedicineDescLog(props) {
    return (
        <div>
            <div className="tsc--date">{props.date}</div>
            <div className="tsc--content">
                <p className="tsc--desc">{props.desc}</p>
                <p className="tsc--abs tsc--hour">{props.time}</p>
                <p className={`tsc--abs tsc--io${(props.stockChange > 0) ? " tsc--in" : ""}`}>
                    {Math.abs(props.stockChange)} obat {props.stockChange > 0 ? "masuk" : "keluar"}
                </p>
            </div>
        </div>
    )
}
