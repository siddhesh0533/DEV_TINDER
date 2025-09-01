const express = require("express");
const User = require("../model/user")
const ConnectionRequest = require("../model/connectionRequest");
const { UserAuth } = require("../middleware/UserAuth");

const requestsRouter = express.Router();

requestsRouter.post("/request/send/:status/:toUserId",UserAuth, async(req, res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message: "invalid status type "+ status});
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(404).json({message: "User Not found"})
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ],
        });

        if (existingConnectionRequest) {
            return res.status(400).send({message: "connection request already exist"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save();

        res.json({message: req.user.firstName+" is "+ status+ " in " + toUser.firstName,
            data,
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

requestsRouter.post("/request/review/:status/:requestId",UserAuth, async (req, res) => {
    try {
        console.log("review api");
        console.log(req.user)
        
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Invalid status type"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if (!connectionRequest) {
            return res.status(400).json({message:"connection request is not found"})
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({message:"Connection Request "+status, data});

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = requestsRouter;