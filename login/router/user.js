const express = require("express");
const user_router = express.Router();
var userServices = require("../services/user.js");

user_router.post("/signin", async (req, res) => {
  var usernameSignIn = req.body.usernameSignIn;
  var pwdSignIn = req.body.pwdSignIn;
  res.json(await userServices.signin(usernameSignIn, pwdSignIn));
});

user_router.post("/signup", async (req, res) => {
  var usernameSignUp = req.body.usernameSignUp;
  var emailSignUp = req.body.emailSignUp;
  res.json(await userServices.signup(emailSignUp, usernameSignUp));
});

user_router.post("/changepwd", async (req, res) => {
  var id = req.body.id;
  var pwd = req.body.pwd;
  var pwdNew = req.body.pwdNew;
  res.json(await userServices.changepwd(id, pwd, pwdNew));
});

user_router.post("/forgottenacc", async (req, res) => {
  var emailFA = req.body.emailFA;
  res.json(await userServices.forgottenacc(emailFA));
});

module.exports = user_router;
