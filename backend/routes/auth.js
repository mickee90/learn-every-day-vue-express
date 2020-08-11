const userRoutes = require("express").Router();
const passwordUtils = require("../utils/passwordUtils");
const models = require("../models");

const { validateRegisterUser } = require("../validators/user");

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

userRoutes.post("/register", validateRegisterUser, async function (
  req,
  res,
  next
) {
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
