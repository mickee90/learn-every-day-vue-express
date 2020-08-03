const postController = require("../controllers/post");

const postRoutes = require("express").Router();

postRoutes.get("/", postController.getPosts);

module.exports = postRoutes;
