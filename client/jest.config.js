const _ = require("lodash");

// Use a random port number for the mock API by default,
// to support multiple instances of Jest running
// simultaneously, like during pre-commit lint.
process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999);

module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/unit/setup"],
  globalSetup: "<rootDir>/tests/unit/global-setup",
  globalTeardown: "<rootDir>/tests/unit/global-teardown",
  testMatch: ["**/(*.)spec.js"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$":
      "jest-transform-stub"
  },
  transformIgnorePatterns: ["/node_modules/(?!vue-spinner)"],
  // https://facebook.github.io/jest/docs/en/configuration.html#testurl-string
  // Set the `testURL` to a provided base URL if one exists, or the mock API base URL
  // Solves: https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
  testURL: process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`
};
