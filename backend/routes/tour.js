const express = require('express')
const tour_route = express.Router()
const tourController = require('../controllers/tour')
tour_route.post('/get-tour-list', tourController.getTourByPlaceID)
tour_route.post('/insert', tourController.insert)

module.exports = tour_route