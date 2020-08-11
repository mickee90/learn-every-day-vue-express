const models = require("../models");

exports.getPosts = async (req, res, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  try {
    const posts = await models.Posts.findAll({
      where: { user_id: req.user.id },
    });

    res.status(200).json({ message: "All posts", posts });
  } catch (error) {
    next(error);
  }
};

exports.createPost = (req, res, next) => {
  const newPost = models.Posts.build({
    user_id: req.user.id,
    status: req.body.status || 0,
    title: req.body.title,
    ingress: req.body.ingress || "",
    content: req.body.content,
    published_date: req.body.published_date || Date.now(),
  });

  return newPost
    .save()
    .then((post) => {
      res.status(201).json({ message: "Post created", post });
    })
    .catch((err) => next(err));
};

exports.editPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await models.Posts.findByPk(postId);

    if (!post) {
      const error = new Error("The post cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (post.user_id !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    post.title = req.body.title;
    post.ingress = req.body.ingress || post.ingress;
    post.content = req.body.content;
    post.status = req.body.status || post.status;
    post.deleted = req.body.deleted || post.deleted;
    post.published_date = req.body.published_date || post.published_date;

    const savedPost = await post.save();

    if (!savedPost) {
      const error = new Error("The post could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ message: "Post is updated", post });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await models.Posts.findByPk(postId);

    if (!post) {
      const error = new Error("The post cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (post.user_id !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    const deletedPost = await models.Posts.destroy({
      where: { id: postId },
    });

    if (!deletedPost) {
      const error = new Error("The post could not be deleted");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ message: "The post is deleted" });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
