const Users = require("../resources/users");

module.exports = app => {
  app.post("/api/v1/login", async (req, res) => {
    console.log("mock /api/v1/login hit");
    await res.json({});
    // Users.authenticate(req.body)
    //   .then(user => {
    //     res.json(user);
    //   })
    //   .catch(error => {
    //     res.status(401).json({ message: error.message });
    //   });
  });

  app.post("/api/v1/logout", (req, res) => {
    res.json({});
  });

  app.put("/api/v1/updateUser", (req, res) => {
    res.json(req.body);
  });
};
