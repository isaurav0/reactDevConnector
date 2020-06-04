const express = require("express")
const connectDB = require('./config/db.js')


app = express()

connectDB()

const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/users", require('./routes/api/users'))
app.use("/api/profile", require('./routes/api/profile'))
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/posts", require('./routes/api/posts'))


app.listen(PORT, ()=>{
    console.log("server running on PORT ", PORT)
})

