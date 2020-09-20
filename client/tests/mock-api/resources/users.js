/**
 * Fake users and authentication when working with tests
 */
const _ = require("lodash");

module.exports = {
  all: [
    {
      id: 1,
      username: "admin@mail.com",
      password: "password",
      first_name: "Super",
      last_name: "Admin"
    },
    {
      id: 2,
      username: "johndoe@mail.com",
      password: "password",
      first_name: "John",
      last_name: "Doe"
    },
    {
      id: 3,
      username: "joedoe@mail.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe"
    }
  ].map(user => {
    return {
      ...user,
      token: `valid-token-for-${user.username}`
    };
  }),
  authenticate({ username, password }) {
    return new Promise((resolve, reject) => {
      const matchedUser = this.all.find(
        user => user.username === username && user.password === password
      );

      if (matchedUser) {
        resolve(this.json(matchedUser));
      } else {
        reject(new Error("Invalid user credentials"));
      }
    });
  },
  findBy(propertyName, value) {
    const matchedUser = this.all.find(user => user[propertyName] === value);
    return this.json(matchedUser);
  },
  json(user) {
    return user && _.omit(user, ["password"]);
  }
};
