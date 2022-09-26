const express = require('express')
const connectDB = require('./utils/db')
const app = express()
const PORT = 3000

app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// koneksi dengan database
const { Medicine, medicineLog, logEnum } = require('./model/Med')
const { ObjectId } = require('mongodb')
connectDB();

// halaman index
app.get('/', async (req, res) => {
    const medicines = await Medicine.find() 
    res.render('index', {
        medicines
    })
})

//tambah data obat ke database
app.get('/add', async (req, res) => {
    res.render('add')
})
app.post('/add', async (req, res) => {
    req.body.log = [medicineLog(
        req.body.stock, "Data obat ditambahkan ke database"
    )]
    await Medicine.insertMany(req.body)
    res.redirect('/')
})

// hapus data obat dari database
app.get('/delete/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        await Medicine.deleteOne({_id: ObjectId(req.params.id)})
        res.redirect('/')
    } else {
        res.status(404)
        res.send('<h1>Error 404: Not Found</h1>')
    }
})

// edit data obat dari database
app.get('/edit/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        res.render('edit', { medicine })
    } else {
        res.status(404)
        res.send('<h1>Error 404: Not Found</h1>')
    }
})
app.post('/edit', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.body._id)})
    if (medicine) {
        await Medicine.updateOne(
            {_id: ObjectId(req.body._id)},
            {
                $set: {
                    name: req.body.name,
                    manufacturer: req.body.manufacturer,
                    description: req.body.description
                }
            }
        )
        res.redirect('/')
    }
})

// edit data transaksi obat
app.get('/transaction/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        res.render('transaction', {
            medicine
        })
    }
})
app.post('/transaction', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.body._id)})
    if (medicine) {
        const newLog = medicine.log
        // newLog.push(medicineLog(
        //     req.body.stock, req.body.description
        // ))
        newLog.push(medicineLog(
            req.body.stock, req.body.description
        ))
        const newStock = medicine.stock + parseInt(req.body.stock)
        await Medicine.updateOne(
            {_id: ObjectId(req.body._id)},
            {
                $set: {
                    log: newLog,
                    stock: newStock
                }
            }
        )
        res.redirect(`/info/${medicine._id}`)
    }
})

// menampilkan deskripsi obat
app.get('/info/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        res.render('description', {
            medicine,
            STOCK: logEnum.STOCK,
            DESC: logEnum.DESC,
            DATE: logEnum.DATE
        })
    } else {
        res.status(404)
        res.send('<h1>Error 404: Not Found</h1>')
    }
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})
