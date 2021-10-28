const TourService = require('../services/tour')
exports.getTourByPlaceID = async (req, res) => {
  const tourService = new TourService(req)
  console.log(req.body)
	var placeID = req.body.id
	tourService
		.getTourByPlaceID(placeID)
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

exports.insert = async (req, res) => {
	const tourService = new TourService(req)
	var placeID = req.body.data.id_diadiem
	var tourName = req.body.data.tentour
	var price = req.body.data.gia
	var description = req.body.data.lichtrinh
	tourService.insert(placeID, tourName, price, description)
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
