const mongoose = require('mongoose')
mongoose.set('debug', false)
const config = require('config')
const db = config.get('MONGO_URI')

const connectDB = async () => {
    try{
        await mongoose.connect(db, { 
            useNewUrlParser: true ,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log("mongo connected")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;