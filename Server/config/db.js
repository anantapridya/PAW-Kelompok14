const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:admin@testmongo.rbvgcyd.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
    const connection = await mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(err => {
        console.log('Database connection failed')
        console.log(err)
        process.exit()
    })
}
module.exports = { connectDB, uri }