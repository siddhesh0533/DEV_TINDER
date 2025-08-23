const mongoose = require('mongoose');

const connectdb =async()=>{
    await mongoose.connect("mongodb://localhost:27017/devTinder")
} 

module.exports = {connectdb}

