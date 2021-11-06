
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
			if (userInfo[0]) {
				return res.json({
					status: 'Success',
					data: userInfo[0]
				})
			} else {
				return res.json({
					status: 'Failed',
					message: 'Username and password incorrect'
				})
			}
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
							console.log('-------------SENDMAIL------------')
							mailer.sendMail(emailSignUp, usernameSignUp, pwdSignUp, function (error, info) {
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
										},
										message: 'Mật khẩu đã được gửi về tài khoản của bạn'
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

exports.changePwd = async (req, res) => {
	const userService = new UserService(req)
	console.log(req.body.data)
	var id = req.body.data.id
	var pwd = req.body.data.pwd
	var pwdNew = req.body.data.pwdNew
	try {
		if (await userService.checkIdPwd(id, pwd)) {
			if (await userService.changePwd(id, pwdNew)) {
				res.json({ status: 'Success', result: true, message: 'OK' })
			} else {
				res.json({ status: 'Failed', result: false, message: 'Error!' })
			}
		} else {
			res.json({
				status: 'Failed',
				result: false,
				message: 'Password incorrect'
			})
		}
	} catch (err) {
		return res.json({
			status: 'Failed',
			message: err.message
		})
	}
}

exports.forgottenAccount = async (req, res) => {
	const userService = new UserService(req)
	var emailFA = req.body.data.emailFA
	try {
		var data = await userService.checkEmailFA(emailFA)
	} catch (error) {
		return res.json({
			status: 'Failed',
			message: error.message
		})
	}

	if (data !== null) {
		mailer.sendFAMail(emailFA, data, function (error, info) {
			if (error) {
				console.log(error)
				res.json({ status: 'Failed', message: 'Lỗi trong quá trình gửi mail' })
			} else {
				console.log('Email sent: Quen pass ' + info.response)
				res.json({
					status: 'Success',
					message: 'Pass đã được gửi lại về mail của bạn'
				})
			}
		})
	} else {
		res.json({
			status: 'Failed',
			result: false,
			message: 'Mail chưa được đăng ký'
		})
	}
}
