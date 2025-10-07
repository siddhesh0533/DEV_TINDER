const express = require("express");
const User = require("../model/user");
const { UserAuth } = require("../middleware/UserAuth");
const { validateEditData } = require("../utils/validate")
const bcript = require("bcrypt")

const profileRouter = express.Router();

profileRouter.get("/profile/view", UserAuth, async (req, res) => {
    try {

        const user = req.user;
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }


        res.send(user)
    } catch (error) {
        res.status(400).send("something went wrong " + error.message)
    }
})

profileRouter.patch("/profile/edit",UserAuth, async (req, res) => {
    try {
        if (!validateEditData(req)) {
            throw new Error("Edit not possible");          
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save();

        res.json({ message: `${loggedInUser.firstName}, your profile is updated successfully!!`, data: loggedInUser })
    } catch (error) {

        res.status(400).json({ error: error.message });

    }
})

profileRouter.patch("/profile/changePassword", UserAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = req.user;

        const isPasswordValid = await user.validatePassword(oldPassword)

        if (!isPasswordValid) {
            throw new Error("OLd password is incorrect!!");
        }

        user.password = await bcript.hash(newPassword, 10);

        await user.save();

        res.send("password change successfully!!!")


    } catch (error) {

        res.send("something went wrong " + error.message)
    }
})

module.exports = profileRouter;