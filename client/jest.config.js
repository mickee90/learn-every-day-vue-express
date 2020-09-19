module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/unit/setup"],
  testMatch: ["**/(*.)spec.js"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$":
      "jest-transform-stub"
  },
  transformIgnorePatterns: ["/node_modules/(?!vue-spinner)"]
};
