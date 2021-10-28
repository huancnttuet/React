const express = require('express')
const place_route = express.Router()
const placeController = require('../controllers/place')
place_route.post('/insert', placeController.insert)
place_route.post('/get-all', placeController.getAll)

module.exports = place_route