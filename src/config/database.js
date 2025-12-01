const mongoose = require('mongoose');
require("dotenv").config();

const connectdb =async()=>{
    await mongoose.connect(process.env.DB_URL)
} 

module.exports = {connectdb}

    