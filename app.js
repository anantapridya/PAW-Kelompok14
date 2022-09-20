const express = require('express')
const app = express()
const PORT = 3000

app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// koneksi dengan database
const { Medicine, medicineLog, logEnum } = require('./utils/db')
const { ObjectId } = require('mongodb')

app.get('/', async (req, res) => {
    const medicines = await Medicine.find() 
    res.render('index', {
        medicines
    })
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
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