const express = require("express");

const app = express();

app.get("/user",
    [(req, res, next) => {
        // res.send("hello test")
        next();
    }],
    (req, res) => {
        res.send("hell0 2")
    }
);

app.get("/abc/:userId/:password/:age/:data", (req, res) => {
    console.log(req.params);

    res.send("hello test")
});



app.listen(7777, () => {
    console.log("running on port 7777");
})
