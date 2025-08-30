const jwt = require("jsonwebtoken")
const User = require("../model/user")

const UserAuth = async(req, res, next)=>{
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error("token not valid!!")
        }

        const decodedmessage = jwt.verify(token, "Galaxy@07")
        const {_id} = decodedmessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("token not valid!!")
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong " + error.message)
    }
} 

module.exports = {UserAuth}