const PlaceService = require('../services/place')
exports.insert = async (req, res) => {
	const placeService = new PlaceService(req)
  var place_name = req.body.data.diadiem
  var img_key = req.body.data.imgKey
	placeService
		.insert(place_name, img_key)
		.then((data) => {
			return res.json({
				status: 'Success',
				data: data
			})
		})
		.catch((error) => {
			return res.json({
				status: 'Failed',
				message: error.message
			})
		})
}

exports.getAll = async (req, res) => {
	const placeService = new PlaceService(req)

	placeService
		.getAll()
		.then((data) => {
			return res.json({
				status: 'Success',
				data: data
			})
		})
		.catch((error) => {
			return res.json({
				status: 'Failed',
				message: error.message
			})
		})
}

