const models = require('../models')
class PlaceService {
  constructor (req) {
    this.req = req
    this.model = models.Place
  }

  async insert (name, img_path) {
    var rs = await this.model.findOrCreate({
      where: {name: name},
      defaults: {img_key: img_path}
    })
    if(rs[1] === true){
      return true
    }
    return false
  }
  async getAll () {
    return await this.model.findAll()
  }
}

module.exports = PlaceService