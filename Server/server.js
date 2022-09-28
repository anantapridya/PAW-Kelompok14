const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:9000"
}

// middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("./routes/medicine.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`)
})


// database connection
const db = require('./models')
db.connectDB()