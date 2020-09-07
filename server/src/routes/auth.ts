const userRoutes = require("express").Router();
const passwordUtils = require("../utils/passwordUtils");
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const { validateRegisterUser } = require("../validators/user");

userRoutes.post("/login", async function (req: Request, res: Response) {
  const user: User = await User.findOne({
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
    const tokenObject = passwordUtils.issueJWT(user, false);

    res
      .status(200)
      .cookie("jwt", tokenObject.token, { httpOnly: true })
      .json({
        success: true,
        user: {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          address: user.address,
          zip_code: user.zip_code,
          city: user.city,
          phone: user.phone,
        },
      });
  }
});

userRoutes.post("/register", validateRegisterUser, async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const buildUser: User = User.build({
    username: req.body.username,
    email: req.body.username,
    password: passwordUtils.generateHash(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  try {
    const newUser = await buildUser.save();
    return res.json({ success: true, user: newUser });
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/logout", async (req: Request, res: Response) => {
  await req.logout();
  res.clearCookie("jwt");

  res.sendStatus(200);
});

module.exports = userRoutes;