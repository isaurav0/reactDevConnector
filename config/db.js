const mongoose = require('mongoose')
const config = require('./default.json')

console.log(config)

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log("mongo connected ")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;