const express = require('express')
const image_route = express.Router()
const imageController = require('../controllers/image')
image_route.post('/upload', imageController.upload)

module.exports = image_route