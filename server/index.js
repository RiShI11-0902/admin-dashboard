const express = require('express')
const cors = require('cors')
const connect = require('./dbConfig')

const app = express()
app.use(cors())
app.use(express.json())

connect()

const userRoutes = require("./routes/user") 

app.use('/user', userRoutes)

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(5000)