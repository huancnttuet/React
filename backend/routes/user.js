const express = require('express')
const user_route = express.Router()
const service = require('../services/users')
const userController = require('../controllers/user')
user_route.get('/signin', userController.signin)

user_route.post('/signup', async (req, res) => {
	var usernameSignUp = req.body.data.usernameSignUp
	var emailSignUp = req.body.data.emailSignUp

	const sendMail = (pwd) => {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'huancnttuet@gmail.com',
				pass: '341997mok'
			}
		})

		var mailOptions = {
			from: 'huancnttuet@gmail.com',
			to: 'huancnttmta@gmail.com',
			subject: 'Password demo',
			text: `Yourpassword: ${pwd}`
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log('Email sent: ' + info.response)
			}
		})
	}
	const createPwdSignUp = () => {
		var length = 8,
			charset =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			retVal = ''
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n))
		}
		return retVal
	}

	if (await data.checkSignUp(emailSignUp, usernameSignUp)) {
		var pwdSignUp = createPwdSignUp()

		if (await data.createUser(emailSignUp, usernameSignUp, pwdSignUp)) {
			res.json({ message: 'create new user success ' })
			sendMail(pwdSignUp)
		} else {
			res.json({ message: 'error create new user' })
		}
	} else {
		res.json({ message: 'user or mail exist' })
	}
})

user_route.post('/changepwd', async (req, res) => {
	console.log(req.body.data)
	var id = req.body.data.id
	var pwd = req.body.data.pwd
	var pwdNew = req.body.data.pwdNew
	if (await data.checkIdPwd(id, pwd)) {
		if (await data.changePwd(id, pwdNew)) {
			res.json({ result: true, message: 'ok' })
		} else {
			res.json({ result: false, message: 'da co loi xay ra' })
		}
	} else {
		res.json({ result: false, message: 'Sai pass' })
	}
})

user_route.post('/forgottenacc', async (req, res) => {
	var emailFA = req.body.data.emailFA
	var pwd = await data.checkEmailFA(emailFA)
	const sendMail = (pwd) => {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'huancnttuet@gmail.com',
				pass: '341997mok'
			}
		})

		var mailOptions = {
			from: 'huancnttuet@gmail.com',
			to: 'huancnttmta@gmail.com',
			subject: 'Forgotten Password demo',
			text: `Yourpassword: ${pwd}`
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
				res.json({ message: 'Lỗi trong quá trình gửi mail' })
			} else {
				console.log('Email sent: Quen pass ' + info.response)
				res.json({ message: 'Pass đã được gửi lại về mail của bạn' })
			}
		})
	}
	if (pwd !== null) {
		sendMail(pwd)
	} else {
		res.json({ result: false, message: 'Mail chưa được đăng ký' })
	}
})

module.exports = user_route
