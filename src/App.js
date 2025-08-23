const express = require("express");

const app = express();

app.use("/test",(req, res)=>{
    res.send("hello test")
});

app.post("/", (req, res)=>{
    res.send("/ post request ")
});

app.delete("/", (req, res)=>{
    res.send("/ delete request ")
});

app.put("/", (req, res)=>{
    res.send("/ put request ")
});

app.use("/get",(req, res)=>{
    res.send("hello get")
});

app.use("/",(req, res)=>{
    res.send("hello")
});

app.listen(7777, ()=>{
    console.log("running on port 7777");
})
 