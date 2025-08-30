const express = require("express");
const User = require("../model/user")
const { UserAuth } = require("../middleware/UserAuth");

const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest",UserAuth, async(req, res)=>{
    const user = req.user;
    console.log("sending connection request");
    res.send(user.firstName + "sent the connect request!");
});

module.exports = requestsRouter;