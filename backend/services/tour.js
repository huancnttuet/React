const models = require('../models')
class TourService {
	constructor(req) {
		this.req = req
		this.model = models.Tour
		this.placeModel = models.Place
	}

  async getTourByPlaceID (id) {
    let place = await this.placeModel.findAll({
      attributes: ['name'],
      where: { id: id }
    })
		return {
			list: await this.model.findAll({ where: { id_place: id } }),
			place: place[0].name
		}
	}
	async insert(placeID, name, price, description) {
		var rs = await this.model.findOrCreate({
			where: { id_place: 0 },
			defaults: {
				id_place: placeID,
				tour_name: name,
				price: price,
				description: description
			}
		})
		if (rs[1] === true) {
			return true
		}
		return false
	}
}

module.exports = TourService
