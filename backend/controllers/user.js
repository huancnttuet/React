const UserService = require('../services/users')
exports.signin = async (req, res) => {
	const userService = new UserService(req)
	var username = req.body.data.usernameSignIn
	var password = req.body.data.pwdSignIn
	userService
		.signin(username, password)
		.then((userInfo) => {
			return res.json({
				status: 'Success',
				data: userInfo[0]
			})
		})
		.catch((error) => {
			return res.json({
				status: 'Failed',
				message: error.message
			})
		})
}
