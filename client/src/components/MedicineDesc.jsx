import backArrow from '../img/back-arrow.png'
import Navbar from './Navbar.jsx'
import '../css/MedicineDesc.css'


export default function MedicineDesc() {
    
    // ini data dummy, nanti diganti dgn fetch() ke database
    // const medicine = fetch blablabla where id=blablabla
    const medicine = {"_id":{"$oid":"633167d72a825657dc598ad2"},"name":"Sanmol Paracetamol","manufacturer":"PT Sanbe Farma","description":"Digunakan untuk meringankan rasa sakit pada kepala dan menurunkan demam, mengandung paracetamol 500 mg. Obat ini bekerja di pusat pengatur panas tubuh secara antipiretik dan analgesik. Dosis dewasa 3x1 tablet per hari, anak-anak <12 tahun 2x1 tablet per hari, sesudah ataupun sebelum makan. Efek samping dapat menyebabkan kantuk.","stock":10,"log":[["25","Data obat ditambahkan ke database","9/26/2022, 15:50:31"], ["-3","Obat terjual ke Bpk. Nurhadi","9/27/2022, 12:03:11"], ["-2","Obat terjual ke Ibu Nahida","9/29/2022, 19:13:52"], ["-16","Obat expired","9/30/2022, 23:59:59"], ["20","Stok bulanan dari pusat","10/2/2022, 09:15:32"], ["-4","Obat terjual ke Bpk. Joko","10/3/2022, 19:13:52"], ["-1","Obat terjual ke Bpk. Budi","10/3/2022, 20:47:39"], ["-5","Obat terjual ke Ibu Siti","10/5/2022, 10:28:19"]],"__v":{"$numberInt":"0"}}
    const isAuthorized = true

    return (
        <>
            <Navbar />
            <main>
                <a className="back-arrow">
                    <img src={backArrow} alt="back arrow" />
                </a>
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
            <div className="tsc--add">+</div>
            <div className="tsc--add--text">Buat Catatan Transaksi</div>
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
