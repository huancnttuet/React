var user = require("./user.js");
var sequelize = require("../model/configORM.js");

test("test signin", async done => {
  const data = {
    usernameSignIn: `huanhuan`,
    pwdSignIn: `12`
  };
  var result = await user.signin(data.usernameSignIn, data.pwdSignIn);
  expect(result).toMatchObject({ code: "ERROR" });
  done();
});

test("test signup", async done => {
  const data = {
    usernameSignUp: `huanhuan12`,
    emailSignUp: `huanhuan12`
  };
  var result = await user.signup(data.emailSignUp, data.usernameSignUp);
  expect(result).toMatchObject({ code: "EXIST" });
  done();
});
test("test forgotten password", async done => {
  const data = {
    email: `huanhuan`
  };
  var result = await user.forgottenacc(data.email);
  expect(result).toMatchObject({ code: "SUCCESS" });
  done();
});
test("test change password", async done => {
  const data = {
    id: `47`,
    pwd: `KkwRtRHg`,
    pwdNew: `12`
  };
  var result = await user.changepwd(data.id, data.pwd, data.pwdNew);
  expect(result).toMatchObject({ code: "SUCCESS" });
  done();
});

afterAll(async done => {
  sequelize.close();
  done();
});
