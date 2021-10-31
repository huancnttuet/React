var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'huanuet@gmail.com',
		pass: '341997mok'
	}
})
exports.sendMail = (email, pwd, callback) => {
	var mailOptions = {
		from: 'huanuet@gmail.com',
		to: email,
		subject: 'Password demo',
		text: `Yourpassword: ${pwd}`
	}
	transporter.sendMail(mailOptions, callback)
}

exports.sendFAMail = (email, data, callback) => {
	var mailOptions = {
		from: 'huanuet@gmail.com',
		to: email,
		subject: 'Forgotten password',
		text: `Username: ${data.username} \nYourpassword: ${data.password}`
	}

	transporter.sendMail(mailOptions, callback)
}
