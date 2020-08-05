const userController = require("../controllers/user");

const userRoutes = require("express").Router();

userRoutes.get("/", userController.getUser);
userRoutes.put("/", userController.editUser);
userRoutes.post("/editPassword", userController.editPassword);

module.exports = userRoutes;
