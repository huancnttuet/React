const { use } = require('../routes/user')
const UserService = require('../services/users')
const mailer = require('../utils/mailer')
const pwdGenerator = require('../utils/pwd_generator')
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

exports.signUp = async (req, res) => {
	const userService = new UserService(req)
	var usernameSignUp = req.body.data.usernameSignUp
	var emailSignUp = req.body.data.emailSignUp
	userService
		.checkSignUp(emailSignUp, usernameSignUp)
		.then((data) => {
			if (data) {
				var pwdSignUp = pwdGenerator.createPwdSignUp()
				userService
					.createUser(emailSignUp, usernameSignUp, pwdSignUp)
					.then((newUser) => {
						if (newUser) {
							mailer.sendMail(password, function (error, info) {
								if (error) {
									console.log(error)
									res.json({ status: 'Failed', message: error.message })
								} else {
									console.log('Email sent: ' + info.response)
									return res.json({
										status: 'Success',
										data: {
											username: usernameSignUp,
											email: emailSignUp,
											info: info.response
										}
									})
								}
							})
						} else {
							res.json({ status: 'Failed', message: 'error create new user' })
						}
					})
					.catch((err) => {
						return res.json({
							status: 'Failed',
							message: err.message
						})
					})
			} else {
				res.json({ status: 'Failed', message: 'user or mail exist' })
			}
		})
		.catch((error) => {
			return res.json({
				status: 'Failed',
				message: error.message
			})
		})
}
