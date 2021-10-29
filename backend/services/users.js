const models = require('../models')
class UserService {
	constructor(req) {
		this.req = req
		this.model = models.User
	}

	async signin(username, password) {
		return await this.model.findAll({
			attributes: ['id', 'level'],
			where: { password: password, username: username }
		})
	}

	async checkSignUp(emailSignUp, usernameSignUp) {
		var checkSignUp = await this.model.findAll({
			attributes: ['email'],
			where: {
				email: emailSignUp,
				username: usernameSignUp
			}
		})
		if (checkSignUp.length === 0) {
			return true
		}
    return false
    
  }
  
  async createUser (emailSignUp, usernameSignUp, pwdSignUp) {
    var newUser = await this.model.findOrCreate({
      where: {
        email: emailSignUp,
        username: usernameSignUp
      },
      defaults: {
        pwd: pwdSignUp
      }
    })
    return newUser[0]
  }

}

module.exports = UserService
