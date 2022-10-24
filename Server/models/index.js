const dbConfig = require('../config/db')

module.exports = {
    //db
    mongoose: require('mongoose'),
    url: dbConfig.uri,
    connectDB: dbConfig.connectDB,

    // models
    medicines: require('./medicine'),
    user: require('./user')
}