const models = require('../models')
class UserService {
  constructor (req) {
    this.req = req
    this.model = models.User
  }

  async signin (username, password) {
    return await this.model.findAll({attributes : ['id','level'], where: {password: password, username: username}})
  }
}

module.exports = UserService