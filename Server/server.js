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
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`)
})


// database connection
const db = require('./models')
const Role = db.role

db.connectDB()

function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0){
            new Role({
                name: 'user'
            }).save(err => {
                if (err){
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection")
            })

            new Role({
                name: 'admin'
            }).save(err => {
                if (err){
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection")
            })
        }
    })
}
// initial();