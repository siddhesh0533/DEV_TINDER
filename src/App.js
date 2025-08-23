const express = require("express");
const { connectdb } = require("./config/database")
const User = require("./model/user")

const app = express();

app.post("/user", async (req, res) => {

    const user = new User({
        firstName: "sidd",
        lastName: "patil",
        age: 22,
        gender: "male",
        emailId: "sid@123.com"
    });

    try {
        await user.save();
        res.send("user added successfully")
    } catch (error) {
        res.status(400).send("bad input")
    }

})

connectdb().then(() => {
    console.log("connected")
    app.listen(7777, () => {
        console.log("running on port 7777");
    })
}).catch(err => {
    console.log("could not connected");
})


