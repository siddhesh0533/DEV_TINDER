const express = require("express");
const { connectdb } = require("./config/database")
const User = require("./model/user")

const app = express();

app.use(express.json());

app.post("/signUp", async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("user added successfully")
    } catch (error) {
        res.status(400).send("bad input")
    }

});

app.get("/user", async(req, res)=>{
    try {
        const user =await User.find({emailId: req.body.emailId})
        res.send(user);
    } catch (error) {
       console.error(error.message);
        res.send("something went wrong") 
    }
})

app.get("/feed", async(req, res)=>{
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong")
    }
});

connectdb().then(() => {
    console.log("connected")
    app.listen(7777, () => {
        console.log("running on port 7777");
    })
}).catch(err => {
    console.log("could not connected");
})


