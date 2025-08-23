const express = require("express");

const app = express();

app.get("/user", (req, res, next) => {
    try {
        throw new error("hvshvsnsl")
        res.send("hello test")
    } catch (error) {
        res.status(500).send("Something goes wrong")
    }

});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
})

app.listen(7777, () => {
    console.log("running on port 7777");
})
