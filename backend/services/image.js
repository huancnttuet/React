const models = require('../models')
var multer = require('multer')

class ImageService {
	constructor(req) {
		this.req = req
		this.model = models.Image
	}

	 upload() {
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
		var uploadImg = multer({ storage: storage, fileFilter: excelFilter })
		console.log('-----UPLOAD----')
		return uploadImg.single('foo')
	}
}

module.exports = ImageService
