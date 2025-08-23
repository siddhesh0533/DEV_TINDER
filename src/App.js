const express = require("express");

const app = express();

app.get("/abc",(req, res)=>{
    console.log(req.query);
    
    res.send("hello test")
});

app.get("/abc/:userId/:password/:age/:data",(req, res)=>{
    console.log(req.params);
    
    res.send("hello test")
});



app.listen(7777, ()=>{
    console.log("running on port 7777");
})
 