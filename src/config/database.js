const mongoose = require('mongoose');

const connectdb =async()=>{
    await mongoose.connect("mongodb+srv://siddheshpatil0533_db_user:2wTcYypcpANGv2hC@cluster0.odcr7k2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
} 

module.exports = {connectdb}

