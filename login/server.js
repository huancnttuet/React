var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var data = require("./model/user.js");

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
  console.log(req.body);
  var id = req.body.id;
  var pwd = req.body.pwd;
  var pwdNew = req.body.pwdNew;
  if (await data.checkIdPwd(id, pwd)) {
    if (await data.changePwd(id, pwdNew)) {
      res.json({
        code: "SUCCESS",
        message: "Đổi mật khẩu thành công"
      });
    } else {
      res.json({
        code: "ERROR",
        message: "Đã có lỗi xảy ra"
      });
    }
  } else {
    res.json({
      code: "SAIPASS",
      message: "Sai mật khẩu"
    });
  }
});

app.post("/forgottenacc", async (req, res) => {
  var emailFA = req.body.emailFA;
  var pwd = await data.checkEmailFA(emailFA);
  const sendMail = pwd => {
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "huancnttuet@gmail.com",
        pass: "341997mok"
      }
    });

    var mailOptions = {
      from: "huancnttuet@gmail.com",
      to: "huancnttmta@gmail.com",
      subject: "Forgotten Password demo",
      text: `Yourpassword: ${pwd}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.json({
          code: "ERROR",
          message: "Lỗi trong quá trình gửi mail"
        });
      } else {
        console.log("Email sent: Quen pass " + info.response);
        res.json({
          code: "SUCCESS",
          message: "Pass đã được gửi lại về mail của bạn"
        });
      }
    });
  };
  if (pwd !== null) {
    sendMail(pwd);
  } else {
    res.json({
      code: "NOTFOUND",
      message: "Mail chưa được đăng ký"
    });
  }
});

app.listen(8000, function() {
  console.log("Started on PORT 8000");
});
