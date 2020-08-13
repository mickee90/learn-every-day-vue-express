const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Enables env variables from .env
require("dotenv").config();

const app = express();

// Enable jwt protections to routes
const passport = require("passport");
require("./config/passport")(passport);

const errorHandling = require("./middlewares/errorHandling");
const notFound = require("./middlewares/notFound");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const models = require("./models");

// HTTP request logger middleware
app.use(morgan("common"));

// Middleware which sets various HTTP headers for protection
app.use(helmet());

// Middleware which enables cors with various options
// Some of the defaults is:
// origin: *
// methods: GET,HEAD,PUT,PATCH,POST,DELETE
app.use(cors());

// Transform incoming request data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use(
  "/api/v1/posts",
  passport.authenticate("jwt", { session: false }),
  postRoutes
);
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
app.use("/api/v1", authRoutes);

app.use(notFound);
app.use(errorHandling);

const port = process.env.PORT || 3000;

return models.sequelize
  .sync()
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
