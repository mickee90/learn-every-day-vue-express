const models = require("../models");

exports.getPosts = (req, res) => {
  const posts = [{ name: "yo" }, { name: "yo1" }, { name: "yo2" }];

  res.status(200).json(posts);
};
