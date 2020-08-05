// const userController = require("../controllers/user");

const userRoutes = require("express").Router();
const passwordUtils = require("../utils/passwordUtils");
const models = require("../models");
const passport = require("passport");
require("../config/passport")(passport);

userRoutes.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "Yey", success: true });
  }
);

userRoutes.post("/login", async function (req, res, next) {
  const user = await models.Users.findOne({
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
  } else {
    const tokenObject = passwordUtils.issueJWT(user);
    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  }
});

userRoutes.post("/register", async function (req, res, next) {
  if (!req.body.username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!req.body.first_name) {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!req.body.last_name) {
    return res.status(400).json({ message: "Last name is required" });
  }

  const usernameExists = await models.Users.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (usernameExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = models.Users.build({
    username: req.body.username,
    email: req.body.username,
    password: passwordUtils.generateHash(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  return newUser
    .save()
    .then((user) => {
      res.json({ success: true, user });
    })
    .catch((err) => next(err));
});

userRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = userRoutes;
