const express = require("express");
const { connectdb } = require("./config/database")
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectdb().then(() => {
    console.log("connected")
    app.listen(7777, () => {
        console.log("running on port 7777");
    })
}).catch(err => {
    console.log("could not connected");
})


