var nodemailer = require("nodemailer");

module.exports = {
  sendMailPwd: pwd => {
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
  },
  sendMailForgottenPwd: pwd => {
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
        return {
          code: "ERROR",
          message: "Lỗi trong quá trình gửi mail"
        };
      } else {
        console.log("Email sent: Quen pass " + info.response);
        return {
          code: "SUCCESS",
          message: "Pass đã được gửi lại về mail của bạn"
        };
      }
    });
  }
};
