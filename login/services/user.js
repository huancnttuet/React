var user = require("../model/user.js");
var sendMail = require("../helper/sendmail.js");
var createPwdSignUp = require("../helper/createPwdRamdom.js");
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
    var checkSU = await user.checkSignUp(emailSignUp, usernameSignUp);
    console.log(checkSU);
    if (!checkSU) {
      var pwdSignUp = createPwdSignUp();
      if (await user.createUser(emailSignUp, usernameSignUp, pwdSignUp)) {
        sendMail.sendMailPwd(pwdSignUp);
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
  },
  changepwd: async (id, pwd, pwdNew) => {
    if (await user.checkIdPwd(id, pwd)) {
      if (await user.changePwd(id, pwdNew)) {
        return {
          code: "SUCCESS",
          message: "Đổi mật khẩu thành công"
        };
      } else {
        return {
          code: "ERROR",
          message: "Đã có lỗi xảy ra"
        };
      }
    } else {
      return {
        code: "SAIPASS",
        message: "Sai mật khẩu"
      };
    }
  },
  forgottenacc: async emailFA => {
    var pwd = await user.checkEmailFA(emailFA);

    if (pwd !== null) {
      sendMail.sendMailForgottenPwd(pwd);
      return {
        code: "SUCCESS",
        message: "Đã gửi password tới mail"
      };
    } else {
      return {
        code: "NOTFOUND",
        message: "Mail chưa được đăng ký"
      };
    }
  }
};
