const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.url);
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("../mock-api")(app);

module.exports = () => {
  return new Promise((resolve, reject) => {
    global.mockApiServer = app.listen(process.env.MOCK_API_PORT, resolve);
  });
};
