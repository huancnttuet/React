var user = require("./user.js");
const Sequelize = require("sequelize");
var sequelize = require("../model/configORM.js");

var User = sequelize.define("user", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  pwd: Sequelize.STRING
});

test("test signin success", async () => {
  const data = {
    usernameSignIn: `huanhuan`,
    pwdSignIn: `12`
  };
  var result = await user.signin(data.usernameSignIn, data.pwdSignIn);
  expect(result).toMatchObject({ code: "SUCCESS" });
});

test("test signin error", async () => {
  const data = {
    usernameSignIn: `huanhuan`,
    pwdSignIn: `121`
  };
  var result = await user.signin(data.usernameSignIn, data.pwdSignIn);
  expect(result).toMatchObject({ code: "ERROR" });
});

test("test signup success", async () => {
  const data = {
    usernameSignUp: `hua1nhuan111`,
    emailSignUp: `12123123123`
  };
  var result = await user.signup(data.emailSignUp, data.usernameSignUp);
  expect(result).toMatchObject({ code: "SUCCESS" });
  User.destroy({
    where: {
      username: data.usernameSignUp
    }
  });
});

test("test signup exist", async () => {
  const data = {
    usernameSignUp: `hua1nhuan`,
    emailSignUp: `121231`
  };
  var result = await user.signup(data.emailSignUp, data.usernameSignUp);
  expect(result).toMatchObject({ code: "EXIST" });
});

test("test forgotten acc not found", async () => {
  const data = {
    emailFA: `hua1nhuan`
  };
  var result = await user.forgottenacc(data.emailFA);
  expect(result).toMatchObject({ code: "NOTFOUND" });
});

test("test forgotten acc success", async () => {
  const data = {
    emailFA: `huanhuan`
  };
  var result = await user.forgottenacc(data.emailFA);
  expect(result).toMatchObject({ code: "SUCCESS" });
});

test("test change pwd sai passs", async () => {
  const data = {
    id: 6,
    pwd: `hua1nhuan`,
    pwdNew: `121231`
  };
  var result = await user.changepwd(data.id, data.pwd, data.pwdNew);
  expect(result).toMatchObject({ code: "SAIPASS" });
});

test("test change pwd success", async () => {
  const data = {
    id: 47,
    pwd: `12`,
    pwdNew: `121`
  };
  var result = await user.changepwd(data.id, data.pwd, data.pwdNew);
  expect(result).toMatchObject({ code: "SUCCESS" });

  User.update({ pwd: data.pwd }, { where: { id: data.id } });
});
