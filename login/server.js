var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
var data = require('./data/data.js')
var tour = require('./data/tour.js')
var crud = require('./data/CRUD.js')
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var multer = require('multer')
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

app.get('/getList', async (req, res) => {
  var list = await tour.getList()
  console.log(list);
  res.json({list:list[0]})
})

app.post('/getListTour', async (req, res) => {
  const id = req.body.data.id
  var list = await tour.getListTour(id)
  res.json({list:list[0]})
})

app.post('/detail', async (req, res) => {
  const id = req.body.id
  var detail = await tour.getDetailTour(id)
  res.json({detail: detail[0][0]})
})

app.post('/getimg', async (req, res) => {
  const id = req.body.id
  var path = await tour.getImg(id)
  res.json({path: path[0]})
})

app.post('/getTour', async (req, res) => {
  const id = req.body.id
  var arr = await crud.getListTourById(id)
  var arr1 = []
  arr[0].map((value, index) => {
    arr1.push(value.dataValues)
  })

  res.json({list: arr1, diadiem: arr[1]})
})

app.post('/getAll', async (req, res) => {
  const table = req.body.table
  console.log(table);
  var list = await crud.getAll(table)
  res.json({list: list[0]})
})

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

var excelFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|png|xlsm)$/)) {
    return cb(new Error('Only jpg,png file are allowed!'), false);
  }
  cb(null, true);
}
var upload = multer({storage: storage, fileFilter: excelFilter});
var excelUpload = upload.single('foo');

app.post('/uploadimg', async (req, res) => {

  excelUpload(req, res, (err) => {
    if(err) {
      console.log(err);
      return res.json({message:'must a file excel'});
    }
    var file = req.file;
    if (!file) {
        return res.json({message: "please upload a file"});
    } else {

        console.log('upload success!');

        res.json({message: 'upload success'})
      }
  });
})

app.post('/update', async (req, res) => {
  const fs = require('fs')
  var del = req.body.del
  if(del){
    var path = req.body.data.imgKey
    const pathDelete = `./public${path}`
    try {
      fs.unlinkSync(pathDelete)
      //file removed
    } catch(err) {
      console.error(err)
    }
  }
  var imgKey
  if(del){
    imgKey = '/img/' + req.body.fileName
  } else{
    imgKey = req.body.data.imgKey
  }
  console.log(req.body);
  var updateDiadiem = await crud.updateDiadiem(req.body.data.id, req.body.data.diadiem, imgKey)
  if(updateDiadiem){
    res.json({message:'success'})
  } else
    res.json({message:'error'})
})

app.post('/updateTour', async (req, res) => {
  var id_tour = req.body.id_tour
  var id_diadiem = req.body.id_diadiem
  var tentour = req.body.tentour
  var gia = req.body.gia
  var lichtrinh = req.body.lichtrinh

  var updateTour = await crud.updateTour(id_tour, id_diadiem, tentour, gia, lichtrinh)
  if(updateTour){
    res.json({message:'success'})
  } else
    res.json({message:'error'})

})

app.post('/insert', async (req, res) => {

  var table = req.body.table
  console.log(req.body.data);
  if(table === 'diadiem'){
    var diadiem = req.body.data.diadiem
    var imgKey = req.body.data.imgKey
    var insertDiadiem = await crud.insertDiadiem(diadiem,imgKey)
    if(insertDiadiem){
      res.json({message:'success'})
    } else {
      res.json({message: 'error'})
    }
  } else if (table === 'tour') {
    console.log(req.body.data);
      var id_diadiem = req.body.data.id_diadiem
      var tentour = req.body.data.tentour
      var gia = req.body.data.gia
      var lichtrinh = req.body.data.lichtrinh
      var insertTour = await crud.insertTour(id_diadiem, tentour, gia, lichtrinh)
      if(insertTour){
        res.json({message:'success'})
      } else {
        res.json({message: 'error'})
      }
  }

})

app.post('/delete', async (req, res) => {
  var id = req.body.id.id
  console.log("delete");
  console.log(id);
  var deleteDiadiem = await crud.delete(id)
  if(deleteDiadiem){
    res.json({message:'success'})
  } else {
    res.json({message:'error'})
  }
})

app.listen(8000, function(){
  console.log("Started on PORT 8000");
})
