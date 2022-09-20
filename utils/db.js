const mongoose = require('mongoose')

const uri = "mongodb+srv://ananta:ananta@atlascluster.mbhpn8l.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// model struktur database
const Medicine = mongoose.model('Medicine', {
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String, default: "" },
    stock: { type: Number },
    log: { type: Array, default: [] }
})

const logEnum = {STOCK:0, DESC:1, DATE:2} // enumerasi akses array log
const medicineLog = (stock_io, description="", date=new Date().toLocaleString()) => {
    return [stock_io, description, date]
}

module.exports = { Medicine, medicineLog, logEnum }