"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes = require("express").Router();
const passwordUtils = require("../utils/passwordUtils");
const User_1 = require("../models/User");
const { validateRegisterUser } = require("../validators/user");
userRoutes.post("/login", async function (req, res) {
    const user = await User_1.User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "The user could not be found" });
    }
    if (!passwordUtils.validatePassword(req.body.password, user.password)) {
        return res
            .status(401)
            .json({ success: false, message: "You entered the wrong password" });
    }
    else {
        const tokenObject = passwordUtils.issueJWT(user);
        res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
        });
    }
});
userRoutes.post("/register", validateRegisterUser, async function (req, res, next) {
    const buildUser = User_1.User.build({
        username: req.body.username,
        email: req.body.username,
        password: passwordUtils.generateHash(req.body.password),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    });
    try {
        const newUser = await buildUser.save();
        return res.json({ success: true, user: newUser });
    }
    catch (error) {
        next(error);
    }
});
userRoutes.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
module.exports = userRoutes;
//# sourceMappingURL=auth.js.map