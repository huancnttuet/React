var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var crypto = require("crypto");
const userRouter = require("./router/user.js");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRouter);

app.listen(8000, function() {
  console.log("Started on PORT 8000");
});

module.exports = app; //for testing
