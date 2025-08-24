const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:2,
        maxLength:15
    },
    lastName: {
        type:String
    },
    emailId: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type:String,
        required:true,
        minLength:8,
        validate(value){
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is weak")
            }
        }
    },
    gender: {
        type:String,
        validate(value){
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("gender is not valid")
            }
        }
    },
    age: {
        type:Number,
        min:18
    },
    skills:{
        type:[String]
    }    
},
{
    timestamps:true,
})

module.exports = mongoose.model("User", userSchema);