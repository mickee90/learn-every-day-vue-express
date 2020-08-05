const postController = require("../controllers/post");

const postRoutes = require("express").Router();

postRoutes.get("/", postController.getPosts);
postRoutes.post("/", postController.createPost);
postRoutes.put("/:postId", postController.editPost);
postRoutes.delete("/:postId", postController.deletePost);

module.exports = postRoutes;
