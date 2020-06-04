const mongoose = require('mongoose')
// var db = require('./keys.json');
const config = require('config')
const db = config.get('MONGO_URI')

const connectDB = async () => {
    try{
        await mongoose.connect(db, { 
            useNewUrlParser: true ,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("mongo connected")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;