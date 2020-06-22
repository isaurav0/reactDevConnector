const express = require("express")
const cors = require('cors');
const connectDB = require('./config/db.js')
const path = require("path")

//initialize app
app = express()

//connect Database
connectDB()

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.static("../client/build"))

//Routes
app.use("/api/users", require('./routes/api/users'))
app.use("/api/profile", require('./routes/api/profile'))
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/post", require('./routes/api/post'))

app.get("*", (req, res)=>{
    try{
        res.sendFile('index.html', { root: '../client/build/' });
    }
    catch(err){
        res.send("Hello")
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("server running on PORT ", PORT)
})