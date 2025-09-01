const express = require("express");
const { UserAuth } = require("../middleware/UserAuth");
const ConnectionRequest = require("../model/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/received",UserAuth, async(req, res)=>{
    try {
        
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status: "interested"
        }).populate(
            "fromUserId",
            ["firstName", "lastName", "age", "skills"]
        );
        if (connectionRequest.length === 0) {
            return res.status(404).json({message:"connection request is not found"})
        }

        res.json({
            message: "Data fetched successfully",
            Data: connectionRequest
        });
    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
})

userRouter.get("/user/requests/connections", UserAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser, status:"interested"},
                {fromUserId:loggedInUser, status:"interested"}
            ],
        }).populate("fromUserId", "firstName lastName age skills gender").populate("toUserId", "firstName lastName age skills gender")

        const data = connectionRequests.map((row)=> {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data});
    
    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
})

module.exports = userRouter;