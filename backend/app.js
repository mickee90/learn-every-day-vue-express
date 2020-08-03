const express = require("express");

require("dotenv").config();

const app = express();

const apiHeaders = require("./middlewares/apiHeaders");
const errorHandling = require("./middlewares/errorHandling");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const models = require("./models");

// Transform incoming request data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow headers for the API calls
app.use(apiHeaders);

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", authRoutes);

app.use(errorHandling);

const port = process.env.PORT || 3000;

return models.sequelize
  .sync()
  .then((result) => {
    // server.listen(port);
    app.listen(port);
    // app.on("error", onError);
    // app.on("listening", onListening);
  })
  .catch((err) => {
    console.log(err);
  });
