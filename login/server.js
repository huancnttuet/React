var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
var data = require('./data/data.js')
var nodemailer = require('nodemailer');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/test', async (req, res) => {
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
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.post('/login', async (req, res) => {
  var usernameSignIn = req.body.data.usernameSignIn
  var pwdSignIn = req.body.data.pwdSignIn
  if(await data.checkSignIn(usernameSignIn, pwdSignIn)){
    console.log('login true');
    res.json({login: true})
  }else {
    console.log('login false');
    res.json({login: false})
  }
})

app.post('/signup', async (req, res) => {
  var usernameSignUp = req.body.data.usernameSignUp
  var emailSignUp = req.body.data.emailSignUp
  var pwdSignUp = req.body.data.pwdSignUp
  if(await data.checkSignUp(emailSignUp, usernameSignUp)){
    if(await data.createUser(emailSignUp, usernameSignUp, pwdSignUp)){
      res.json({message:'create new user success '})
    }else {
      res.json({message:'error create new user'})
    }
  } else{
    res.json({message:'user or mail exist'})
  }


})




// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.

app.listen(8000, function(){
  console.log("Started on PORT 8000");
})
