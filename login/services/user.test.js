var user = require("./user.js");

test("test signin", async () => {
  const data = {
    usernameSignIn: `huanhuan`,
    pwdSignIn: `12`
  };
  var result = await user.signin(data.usernameSignIn, data.pwdSignIn);
  expect(result).toMatchObject({ code: "SUCCESS" });
});

test("test signup", async () => {
  const data = {
    usernameSignUp: `hua1nhuan`,
    emailSignUp: `121231`
  };
  var result = await user.signup(data.emailSignUp, data.usernameSignUp);
  expect(result).toMatchObject({ code: "SUCCESS" });
});
