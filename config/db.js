const mongoose = require('mongoose')
var db = require('./default.json')

db = JSON.stringify(db)

const connectDB = async () => {
    try{
        await mongoose.connect(db, { useNewUrlParser: true});
        console.log("mongo connected ")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;