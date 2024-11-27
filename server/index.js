const express = require('express')
const cors = require('cors')
const connect = require('./dbConfig')
const path = require("path");


const app = express()
app.use(cors())
app.use(express.json())

connect()

const userRoutes = require("./routes/user") 

app.use('/user', userRoutes)

const DIST_FOLDER = path.join(__dirname, "dist");
app.use(express.static(DIST_FOLDER));

// Fallback to serve index.html for SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, "index.html"));
});

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

app.listen(5000)