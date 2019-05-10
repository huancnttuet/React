var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
var data = require('./data/data.js')
var nodemailer = require('nodemailer');
var crypto = require('crypto');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const md5 = () => {
  var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
  var mystr = mykey.update('abc', 'utf8', 'hex')
  mystr += mykey.update.final('hex');
  }

app.get('/test', async (req, res) => {
  res.json({huan:'huan'})
})

app.post('/signin', async (req, res) => {
  var usernameSignIn = req.body.data.usernameSignIn
  var pwdSignIn = req.body.data.pwdSignIn
  var valueSignIn = await data.checkSignIn(usernameSignIn, pwdSignIn)

  if(valueSignIn !== 0){
    console.log('login true');
    res.json({login: true, username: valueSignIn.username, id: valueSignIn.id})
  }else {
    console.log('login false');
    res.json({login: false, message: 'Sai mat khau'})
  }
})

app.post('/signup', async (req, res) => {
  var usernameSignUp = req.body.data.usernameSignUp
  var emailSignUp = req.body.data.emailSignUp

  const sendMail = (pwd) => {
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

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  const createPwdSignUp = () => {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


  if(await data.checkSignUp(emailSignUp, usernameSignUp)){
    var pwdSignUp = createPwdSignUp();

    if(await data.createUser(emailSignUp, usernameSignUp, pwdSignUp)){
      res.json({message:'create new user success '})
      sendMail(pwdSignUp)
    }else {
      res.json({message:'error create new user'})
    }
  } else{
    res.json({message:'user or mail exist'})
  }


})


app.post('/changepwd', async (req, res) => {
  console.log(req.body.data);
  var id = req.body.data.id
  var pwd = req.body.data.pwd
  var pwdNew = req.body.data.pwdNew
  if(await data.checkIdPwd(id, pwd)){
    if(await data.changePwd(id, pwdNew)){
      res.json({result: true ,message:'ok'})
    }else {
      res.json({result: false , message: 'da co loi xay ra'})
    }
  } else {
    res.json({ result: false, message: 'Sai pass'})
  }
})

app.post('/forgottenacc', async (req, res) => {
  var emailFA = req.body.data.emailFA
  var pwd = await data.checkEmailFA(emailFA)
  const sendMail = (pwd) => {
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
    subject: 'Forgotten Password demo',
    text: `Yourpassword: ${pwd}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.json({message: 'Lỗi trong quá trình gửi mail'})
      } else {
        console.log('Email sent: Quen pass ' + info.response);
        res.json({message: 'Pass đã được gửi lại về mail của bạn'})
      }
    });
  }
  if( pwd !== null){
    sendMail(pwd)
  } else {
    res.json({result:false, message:'Mail chưa được đăng ký'})
  }
})


app.listen(8000, function(){
  console.log("Started on PORT 8000");
})
