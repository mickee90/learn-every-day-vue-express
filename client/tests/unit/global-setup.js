const app = require("express")();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req);
  next();
});

require("../mock-api")(app);

module.exports = () => {
  return new Promise((resolve, reject) => {
    global.mockApiServer = app.listen(process.env.MOCK_API_PORT, resolve);
  });
};
