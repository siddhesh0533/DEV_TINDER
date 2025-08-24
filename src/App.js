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
        res.status(400).send("bad input"+ error.message)
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
});

app.get("/feed", async(req, res)=>{
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong")
    }
});

app.delete("/user", async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete({_id: req.body.userId})
        res.send("user deleted by id!!!")
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong")
    }
});

app.delete("/user", async(req, res)=>{
    try {
        const user = await User.deleteOne({firstName: req.body.firstName})
        res.send("user deleted by firstname!!!")
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong")
    }
});

app.patch("/user/:id", async(req, res)=>{
    try {

        const allowed_change = ["firstName", "lastName", "skills"];
        const isUpdateAllowed = Object.keys(req.body).every((k)=>allowed_change.includes(k))

        if (!isUpdateAllowed) {
            throw new Error("update not allow")
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.send("user Updated successfully !!!")
    } catch (error) {
        console.error(error.message);
        res.send("something went wrong " + error.message)
    }
})

// app.patch("/user", async(req, res)=>{
//     try {
//         const user = await User.updateOne({firstName: req.body.firstName},{firstName: req.body.newName})
//         res.send("user Updated successfully !!!")
//     } catch (error) {
//         console.error(error.message);
//         res.send("something went wrong")
//     }
// })


connectdb().then(() => {
    console.log("connected")
    app.listen(7777, () => {
        console.log("running on port 7777");
    })
}).catch(err => {
    console.log("could not connected");
})


