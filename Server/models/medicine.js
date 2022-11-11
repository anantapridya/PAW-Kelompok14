const mongoose = require('mongoose')

const MedSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    manufacturer: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true,
        default: "" 
    },
    stock: { 
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    log: { type: Array, default: [] }
})

const logEnum = {STOCK:0, DESC:1, DATE:2} // enumerasi akses array log
const medicineLog = (stock_io, description="", date=new Date().toLocaleString()) => {
    return [stock_io, description, date]
}

const Medicine = mongoose.model('Medicine', MedSchema)
module.exports = {Medicine, medicineLog, logEnum}