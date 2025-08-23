const express = require("express");
const { AdminAuth } = require("./middleware/AdminAuth");
const { UserAuth } = require("./middleware/UserAuth");

const app = express();

app.use("/admin", AdminAuth)

app.get("/admin/data", (req, res) => {
    res.send("all data")
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("user Deleted")
});

app.get("/user",UserAuth, (req, res, next) => {
    res.send("hello test")
});

app.listen(7777, () => {
    console.log("running on port 7777");
})
