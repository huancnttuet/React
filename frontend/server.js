var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
var data = require('./data/data.js')
var tour = require('./data/tour.js')
var crud = require('./data/CRUD.js')
var order = require('./data/order.js')
var nodemailer = require('nodemailer')
var crypto = require('crypto')
var multer = require('multer')
var fs = require('fs')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const md5 = () => {
	var mykey = crypto.createCipher('aes-128-cbc', 'mypassword')
	var mystr = mykey.update('abc', 'utf8', 'hex')
	mystr += mykey.update.final('hex')
}

app.get('/test', async (req, res) => {
	res.json({ huan: 'huan' })
})

app.post('/signin', async (req, res) => {
	var usernameSignIn = req.body.data.usernameSignIn
	var pwdSignIn = req.body.data.pwdSignIn
	var valueSignIn = await data.checkSignIn(usernameSignIn, pwdSignIn)

	if (valueSignIn !== 0) {
		console.log('login true')
		res.json({
			login: true,
			username: valueSignIn.username,
			id: valueSignIn.id,
			level: valueSignIn.level
		})
	} else {
		console.log('login false')
		res.json({ login: false, message: 'Sai mat khau' })
	}
})

app.post('/signup', async (req, res) => {
	var usernameSignUp = req.body.data.usernameSignUp
	var emailSignUp = req.body.data.emailSignUp

	const sendMail = (pwd) => {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'huanuet@gmail.com',
				pass: '341997mok'
			}
		})

		var mailOptions = {
			from: 'huanuet@gmail.com',
			to: 'huancnttuet@gmail.com',
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

app.post('/changepwd', async (req, res) => {
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

app.post('/forgottenacc', async (req, res) => {
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

app.get('/getList', async (req, res) => {
	var list = await tour.getList()
	console.log(list)
	res.json({ list: list[0] })
})

app.post('/getListTour', async (req, res) => {
	const id = req.body.id
	var list = await tour.getListTour(id)
	var idArr = []
	list[0].map((value, index) => {
		idArr.push(value.id_tour)
	})
	var path = await crud.getImgFisrt(idArr)
	var pathImg = []
	path.map((value, index) => {
		list[0][index].path = value.dataValues.path
	})

	res.json({ list: list[0] })
})

app.post('/detail', async (req, res) => {
	const id = req.body.id
	var detail = await tour.getDetailTour(id)
	res.json({ detail: detail[0][0] })
})

app.post('/getimg', async (req, res) => {
	const id = req.body.id
	var path = await tour.getImg(id)
	res.json({ path: path[0] })
})

app.post('/getTour', async (req, res) => {
	const id = req.body.id
	var arr = await crud.getListTourById(id)
	var arr1 = []
	arr[0].map((value, index) => {
		arr1.push(value.dataValues)
	})

	res.json({ list: arr1, diadiem: arr[1] })
})

app.post('/getAll', async (req, res) => {
	const table = req.body.table
	console.log(table)
	var list = await crud.getAll(table)
	res.json({ list: list[0] })
})

var dir = ''

app.post('/uploadimg', async (req, res) => {
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public/img')
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})

	var excelFilter = function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|xlsm)$/)) {
			return cb(new Error('Only jpg,png file are allowed!'), false)
		}
		cb(null, true)
	}
	var upload = multer({ storage: storage, fileFilter: excelFilter })
	var excelUpload = upload.single('foo')
	excelUpload(req, res, (err) => {
		if (err) {
			console.log(err)
			return res.json({ message: 'must a file excel' })
		}
		var file = req.file
		if (!file) {
			return res.json({ message: 'please upload a file' })
		} else {
			console.log('upload success!')

			res.json({ message: 'upload success' })
		}
	})
})

app.post('/createFolder', async (req, res) => {
	dir = `./public/img/${req.body.id}`
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir)
	}
})

app.post('/uploadimgs', async (req, res) => {
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, dir)
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})

	var excelFilter = function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|xlsm)$/)) {
			return cb(new Error('Only jpg,png file are allowed!'), false)
		}
		cb(null, true)
	}
	var upload = multer({ storage: storage, fileFilter: excelFilter })
	var excelUpload = upload.array('foo', 10)
	excelUpload(req, res, (err) => {
		if (err) {
			console.log(err)
			return res.json({ message: 'must a file excel' })
		}
		console.log(req.body)
		console.log(req.files)
		var file = req.files
		if (!file) {
			return res.json({ message: 'please upload a file' })
		} else {
			console.log('upload success!')

			res.json({ message: 'upload success' })
		}
	})
})

app.post('/pathImg', async (req, res) => {
	var arr = req.body.path
	var id = req.body.id
	var path = []
	arr.map((value, index) => {
		path[index] = `/img/${id}/${value}`
	})
	var rs = await crud.insertImg(id, path)
})

app.post('/showImg', async (req, res) => {
	var id_tour = req.body.id
	var listImg = await crud.getImg(id_tour)
	res.json({ listImg: listImg })
})

app.post('/deleteImg', async (req, res) => {
	var id_img = req.body.id
	console.log(id_img)
	var rs = await crud.deleteImg(id_img)
	if (rs) {
		res.json({ message: 'delete ok' })
	} else {
		res.json({ message: 'delete error' })
	}
	var path = req.body.path
	var pathDelete = `public${path}`
	try {
		fs.unlinkSync(pathDelete)
		//file removed
	} catch (err) {
		console.error(err)
	}
})

app.post('/update', async (req, res) => {
	var del = req.body.del
	if (del) {
		var path = req.body.data.imgKey
		const pathDelete = `./public${path}`
		try {
			fs.unlinkSync(pathDelete)
			//file removed
		} catch (err) {
			console.error(err)
		}
	}
	var imgKey
	if (del) {
		imgKey = '/img/' + req.body.fileName
	} else {
		imgKey = req.body.data.imgKey
	}
	console.log(req.body)
	var updateDiadiem = await crud.updateDiadiem(
		req.body.data.id,
		req.body.data.diadiem,
		imgKey
	)
	if (updateDiadiem) {
		res.json({ message: 'success' })
	} else res.json({ message: 'error' })
})

app.post('/updateTour', async (req, res) => {
	var id_tour = req.body.id_tour
	var id_diadiem = req.body.id_diadiem
	var tentour = req.body.tentour
	var gia = req.body.gia
	var lichtrinh = req.body.lichtrinh

	var updateTour = await crud.updateTour(
		id_tour,
		id_diadiem,
		tentour,
		gia,
		lichtrinh
	)
	if (updateTour) {
		res.json({ message: 'success' })
	} else res.json({ message: 'error' })
})

app.post('/insert', async (req, res) => {
	var table = req.body.table
	console.log(req.body.data)
	if (table === 'diadiem') {
		var diadiem = req.body.data.diadiem
		var imgKey = req.body.data.imgKey
		var insertDiadiem = await crud.insertDiadiem(diadiem, imgKey)
		if (insertDiadiem) {
			res.json({ message: 'success' })
		} else {
			res.json({ message: 'error' })
		}
	} else if (table === 'tour') {
		console.log(req.body.data)
		var id_diadiem = req.body.data.id_diadiem
		var tentour = req.body.data.tentour
		var gia = req.body.data.gia
		var lichtrinh = req.body.data.lichtrinh
		var insertTour = await crud.insertTour(id_diadiem, tentour, gia, lichtrinh)
		if (insertTour) {
			res.json({ message: 'success' })
		} else {
			res.json({ message: 'error' })
		}
	}
})

app.post('/delete', async (req, res) => {
	var id = req.body.id.id
	console.log('delete')
	console.log(id)
	var deleteDiadiem = await crud.deleteDiadiem(id)
	if (deleteDiadiem) {
		res.json({ message: 'success' })
	} else {
		res.json({ message: 'error' })
	}
})

app.post('/deletetour', async (req, res) => {
	var id = req.body.id
	console.log('delete')
	console.log(id)
	var deleteTour = await crud.deleteTour(id)
	if (deleteTour) {
		res.json({ message: 'success' })
	} else {
		res.json({ message: 'error' })
	}
})

var code

app.post('/sendCode', async (req, res) => {
	var email = req.body.email
	const createCode = () => {
		var length = 6,
			charset =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			retVal = ''
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n))
		}
		return retVal
	}
	const sendMail = (email, code) => {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'huancnttuet@gmail.com',
				pass: '341997mok'
			}
		})

		var mailOptions = {
			from: 'huancnttuet@gmail.com',
			to: email,
			subject: 'Xác nhận đặt tour',
			text: `Vui lòng quay lại trang đặt tour và nhập code: ${code}`
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
				res.json({ message: 'Lỗi trong quá trình gửi mail' })
			} else {
				console.log('Email sent: verify code ' + info.response)
				res.json({ message: 'Code verify đã được gửi lại về mail của bạn' })
			}
		})
	}

	code = createCode()
	sendMail(email, code)
})

app.post('/booktour', async (req, res) => {
	var hovaten = req.body.hovaten
	var coded = req.body.code
	var id_tour = req.body.id_tour
	console.log(code)
	console.log(coded)
	if (code === coded) {
		res.json({ result: true })
	} else {
		res.json({ result: false })
	}
})

app.post('/find', async (req, res) => {
	var data = req.body.data
	var rs = await crud.findTour(data)
	res.json({ list: rs })
})

app.post('/createOrder', async (req, res) => {
	var id_tour = req.body.id_tour
	var email = req.body.email
	var hovaten = req.body.hovaten
	var trangthai = req.body.trangthai
	var rs = await order.createOrder(id_tour, email, hovaten, trangthai)
	if (rs) {
		res.json({ message: 'ok' })
	} else {
		res.json({ message: 'error' })
	}
})

app.get('/getAllOrder', async (req, res) => {
	var list = await order.getAllOrder()
	var arr = []
	list.map((value, index) => {
		arr.push(value.dataValues)
	})
	console.log(arr)
	res.json({ list: arr })
})

app.post('/updateOrder', async (req, res) => {
	var id_order = req.body.id_order
	var id_tour = req.body.id_tour
	var email = req.body.email
	var hovaten = req.body.hovaten
	var trangthai = req.body.trangthai
	var rs = await order.updateOrder(id_order, email, hovaten, id_tour, trangthai)
	res.json({ result: rs })
})

app.post('/getOneOrder', async (req, res) => {
	var id = req.body.id
	var rs = await order.getOneOrder(id)
	res.json({ result: rs[0].dataValues })
})

app.post('/deleteOrder', async (req, res) => {})

app.listen(8000, function () {
	console.log('Started on PORT 8000')
})
