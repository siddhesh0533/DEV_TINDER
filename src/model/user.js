const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is weak")
            }
        }
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{value} is not a valid gender`
        }
        // validate(value){
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("gender is not valid")
        //     }
        // }
    },
    age: {
        type: Number,
        min: 18
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
    },
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?w=360",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo URL");
            }
        }
    }
},
    {
        timestamps: true,
    });

userSchema.methods.getJWT = function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, "Galaxy@07", { expiresIn: "1d" })

    return token;
}

userSchema.methods.validatePassword = async function (passwordinputbyuser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordinputbyuser, passwordHash)

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);