const express = require('express')
const app = express()
const PORT = 3000

app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express.static('public'))

require('./utils/db')
require('mongodb')

app.get('/', async (req, res) => {
    
    res.render('index')
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})