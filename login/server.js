var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
var data = require('./data/data.js')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/test', (req, res) => {
  data.then((result) => {
    console.log(result);
  })
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.json({rep:'OKKK'})
})

app.listen(8000, function(){
  console.log("Started on PORT 8000");
})
