var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

var crypto = require("crypto");
var userServices = require("./services/user.js");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const md5 = () => {
//   var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
//   var mystr = mykey.update("abc", "utf8", "hex");
//   mystr += mykey.update.final("hex");
// };

//test :::
var data = require("./model/user.js");
app.get("/test", async (req, res) => {
  var value = await data.test("dasdas", "huanhuan12314141");
  res.json({ value: value });
  console.log(value);
});

app.post("/signin", async (req, res) => {
  var usernameSignIn = req.body.usernameSignIn;
  var pwdSignIn = req.body.pwdSignIn;

  res.json(await userServices.signin(usernameSignIn, pwdSignIn));
});

app.post("/signup", async (req, res) => {
  var usernameSignUp = req.body.usernameSignUp;
  var emailSignUp = req.body.emailSignUp;

  res.json(await userServices.signup(emailSignUp, usernameSignUp));
});

app.post("/changepwd", async (req, res) => {
  var id = req.body.id;
  var pwd = req.body.pwd;
  var pwdNew = req.body.pwdNew;
  res.json(await userServices.changepwd(id, pwd, pwdNew));
});

app.post("/forgottenacc", async (req, res) => {
  var emailFA = req.body.emailFA;
  res.json(await userServices.forgottenacc(emailFA));
});

app.listen(8000, function() {
  console.log("Started on PORT 8000");
});
