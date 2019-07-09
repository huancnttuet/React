var user = require("../model/user.js");
var nodemailer = require("nodemailer");

module.exports = {
  signin: async (usernameSignIn, pwdSignIn) => {
    var valueSignIn = await user.checkSignIn(usernameSignIn, pwdSignIn);

    if (valueSignIn !== 0) {
      console.log("login true");
      return {
        code: "SUCCESS",
        message: "Đăng nhập thành công",
        result: {
          username: valueSignIn.username,
          id: valueSignIn.id
        }
      };
    } else {
      console.log("login false");
      return {
        code: "ERROR",
        message: "Sai mật khẩu"
      };
    }
  },
  signup: async (emailSignUp, usernameSignUp) => {
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
        subject: "Password demo",
        text: `Yourpassword: ${pwd}`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    };
    const createPwdSignUp = () => {
      var length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    };

    var checkSU = await user.checkSignUp(emailSignUp, usernameSignUp);
    console.log(checkSU);
    if (!checkSU) {
      var pwdSignUp = createPwdSignUp();

      if (await user.createUser(emailSignUp, usernameSignUp, pwdSignUp)) {
        sendMail(pwdSignUp);
        return {
          code: "SUCCESS",
          message: "create new user success"
        };
      } else {
        return {
          code: "ERROR",
          message: "error create new user"
        };
      }
    } else {
      return {
        code: "EXIST",
        message: "user or mail exist"
      };
    }
  }
};
