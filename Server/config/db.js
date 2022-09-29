const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const uri = process.env.MONGO_URI

const connectDB = async () => {
    await mongoose
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