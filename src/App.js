const express = require("express");

const app = express();

app.use("/test",(req, res)=>{
    res.send("hello test")
});

app.use("/get",(req, res)=>{
    res.send("hello get")
});

app.use((req, res)=>{
    res.send("hello")
});

app.listen(7777, ()=>{
    console.log("running on port 7777");
})
 