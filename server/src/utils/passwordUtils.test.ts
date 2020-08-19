const { generateHash, validatePassword } = require("./passwordUtils");

test("Validate a truthy entered and generated password", async () => {
  const newPassword = await generateHash("password");
  expect(validatePassword("password", newPassword)).toBeTruthy();
});
