import Users from "../resources/users";
import Posts from "../resources/posts";

module.exports = app => {
  app.get("/api/v1/posts", (req, res) => {
    const currentUser = Users.findBy("token", req.headers.authorization);

    if (!currentUser) {
      return res.status(401).json({
        message: "You are unauthorized"
      });
    }

    const posts = Posts.findByUserId(currentUser.id);

    res.json(posts);
  });

  app.get("/api/v1/posts/:id", (req, res) => {
    const currentUser = Users.findBy("token", req.headers.authorization);

    if (!currentUser) {
      return res.status(401).json({
        message: "You are unauthorized"
      });
    }

    const post = Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "The post was not found"
      });
    }

    res.json(post);
  });

  app.delete("/api/v1/posts/:id", (req, res) => {
    const currentUser = Users.findBy("token", req.headers.authorization);

    if (!currentUser) {
      return res.status(401).json({
        message: "You are unauthorized"
      });
    }

    const post = Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "The post was not found"
      });
    }

    res.json(true);
  });

  app.put("/api/v1/posts/:id", (req, res) => {
    const currentUser = Users.findBy("token", req.headers.authorization);

    if (!currentUser) {
      return res.status(401).json({
        message: "You are unauthorized"
      });
    }

    const post = Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "The post was not found"
      });
    }

    res.json(post);
  });
};
