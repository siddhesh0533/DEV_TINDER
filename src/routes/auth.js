const express = require("express")
const User = require("../model/user")
const { validateSignUpData } = require("../utils/validate")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
    try {
        // validate Data helper function
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            password: passwordHash,
            emailId
        });

        const savedUser = await user.save();

        const token = savedUser.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "none", // allow cross-origin cookie
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        } 
        // { expires: new Date(Date.now() + 7 * 3600000) }
    )

        res.json({ message: "user added successfully", data: savedUser })
    } catch (error) {
        res.status(400).send("bad input" + error.message)
    }

});

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {

            const token = user.getJWT();

            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 3600000) })

            res.send(user)
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send();
});

module.exports = authRouter;