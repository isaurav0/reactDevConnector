const express = require("express")
const connectDB = require('./config/db.js')

app = require("express")()

app.get('/', (req, res)=>{
    res.send("API Running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("server running on PORT ", PORT)
})