const mongoose = require('mongoose');

const connectdb =async()=>{
    await mongoose.connect("mongodb+srv://siddheshpatil0533:sid0533@cluster0.5ce4j9m.mongodb.net/dev-tinder")
} 

module.exports = {connectdb}

