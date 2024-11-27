const mongoose = require('mongoose')

const connect = async()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://rishi:nrarVWGs6IJLpADk@cluster0.sirc6hl.mongodb.net/adminDashboard?retryWrites=true&w=majority")
        console.log("Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connect