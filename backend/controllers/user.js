const models = require("../models");
const passwordUtils = require("../utils/passwordUtils");

exports.getUser = async (req, res, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const user = apiUserObject(req.user);

  res.status(200).json({ message: "Get user", user });
};

// TODO: Validate, username check, trim
exports.editUser = async (req, res, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  if (!req.body.username) {
    return res.status(400).json({ message: "Username is required" });
  }

  if (!req.body.first_name) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!req.body.last_name) {
    return res.status(400).json({ message: "Last name is required" });
  }

  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await models.Users.findByPk(req.user.id);

    if (!user) {
      const error = new Error("The user cannot be found");
      error.statusCode = 404;
      throw error;
    }

    user.username = req.body.username;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.zip_code = req.body.zip_code;
    user.city = req.body.city;
    user.phone = req.body.phone;
    user.country_id = req.body.country_id || user.country_id;

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error("The user could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res
      .status(200)
      .json({ message: "User is updated", user: apiUserObject(user) });
  } catch (error) {
    next(error);
  }
};

// TODO: Validate, password check, trim
exports.editPassword = async (req, res, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!req.body.confirm_password) {
    return res.status(400).json({ message: "Confirm the password" });
  }

  if (req.body.password.length < 3) {
    return res
      .status(400)
      .json({ message: "The password needs to be at least 3 characters" });
  }

  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).json({ message: "The passwords must match" });
  }

  try {
    const user = await models.Users.findByPk(req.user.id);

    if (!user) {
      const error = new Error("The user cannot be found");
      error.statusCode = 404;
      throw error;
    }

    user.password = passwordUtils.generateHash(req.body.password);

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error("The user could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res
      .status(200)
      .json({ message: "User is updated", user: apiUserObject(user) });
  } catch (error) {
    next(error);
  }
};

function apiUserObject(user) {
  return {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address || "",
    zip_code: user.zip_code || "",
    city: user.city || "",
    email: user.email,
    phone: user.phone || "",
    country_id: user.country_id || 1,
  };
}
