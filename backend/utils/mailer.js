
exports.sendMail = (pwd, callback) => {
  var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'huancnttuet@gmail.com',
    pass: '341997mok'
  }
  });

  var mailOptions = {
  from: 'huancnttuet@gmail.com',
  to: 'huancnttmta@gmail.com',
  subject: 'Password demo',
  text: `Yourpassword: ${pwd}`
  };

  transporter.sendMail(mailOptions, callback);
}