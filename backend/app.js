const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();

const passport = require("passport");
require("./config/passport")(passport);

const errorHandling = require("./middlewares/errorHandling");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const models = require("./models");

app.use(morgan("common"));
app.use(helmet());
app.use(cors());

// Transform incoming request data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
