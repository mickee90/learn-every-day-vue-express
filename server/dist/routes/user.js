const userController = require("../controllers/user");
const { validateEditUser, validateChangePassword, } = require("../validators/user");
const userRoutes = require("express").Router();
userRoutes.get("/", userController.getUser);
userRoutes.put("/", validateEditUser, userController.editUser);
userRoutes.post("/editPassword", validateChangePassword, userController.editPassword);
module.exports = userRoutes;
//# sourceMappingURL=user.js.map