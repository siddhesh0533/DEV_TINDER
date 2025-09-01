const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ["accepted", "interested", "ignored", "rejected"],
            message: `{value} is not a valid status`
        }
    }
},
{
    timestamps:true
});

connectionRequestSchema.index({fromUserId:1, toUserId:1}, {unique:true})

connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("cannot send connection request to yourself!!");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel