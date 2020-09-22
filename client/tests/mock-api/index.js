/**
 * Looping through all routing mock files to set up the routes
 */

const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

module.exports = app => {
  // app.use(bodyParser.json());

  fs.readdirSync(path.join(__dirname, "routes")).forEach(routeFileName => {
    if (/\.js$/.test(routeFileName)) {
      require(`./routes/${routeFileName}`)(app);
    }
  });
};
