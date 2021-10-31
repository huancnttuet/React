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

	async createUser(emailSignUp, usernameSignUp, pwdSignUp) {
		var newUser = await this.model.findOrCreate({
			where: {
				email: emailSignUp,
				username: usernameSignUp
			},
			defaults: {
				password: pwdSignUp,
				level: 1
			}
		})
		return newUser[0]
	}

	async changePwd(id, pwd) {
		var updatePwd = await this.model
			.update(
				{
					password: pwd
				},
				{ where: { id: id } }
			)
			.then((result) => {
				console.log(result)
				return result[0] === 1
			})
		return updatePwd
	}

	async checkIdPwd(id, pwd) {
		var rs = await this.model
			.findOne({
				where: {
					id: id,
					password: pwd
				}
			})
			.then((result) => {
				return !!result
			})
		return rs
	}

	async checkEmailFA(emailFA) {
		var pwd = await this.model
			.findOne({
				attributes: ['username','password'],
				where: { email: emailFA }
			})
			.then((result) => {
				let data = result.dataValues
				console.log(data)
				if (data != null) {
					return data
				}
				return null
			})
		return pwd
	}
}

module.exports = UserService
