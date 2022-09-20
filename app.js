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