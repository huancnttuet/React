const express = require('express')
const user_route = express.Router()
const userController = require('../controllers/user')
user_route.post('/signin', userController.signin)

user_route.post('/signup', userController.signUp)

user_route.post('/changepwd', userController.changePwd)

user_route.post('/forgottenacc', userController.forgottenAccount)

module.exports = user_route
