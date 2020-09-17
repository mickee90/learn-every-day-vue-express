module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/unit/setup"],
  testMatch: ["**/(*.)spec.js"],
  moduleFileExtensions: ["js", "json", "vue"]
};
