// const userController = require("../controllers/user");

const userRoutes = require("express").Router();
const passwordUtils = require("../utils/passwordUtils");
const models = require("../models");
const passport = require("passport");
const myPassport = require("../config/passport")(passport);

module.exports = userRoutes;
