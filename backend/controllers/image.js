const ImageService = require('../services/image')
var multer = require('multer')

exports.upload = async (req, res) => {
	// 	const imageService = new ImageService(req)
	// 	console.log(req)
	// 	imageService
	// 		.upload()
	//     .then(req, res, (err) => {
	//       console.log('--------------------')
	// 			if (err) {
	// 				console.log(err)
	// 				return res.json({ message: 'must a file excel' })
	// 			}
	// 			var file = req.file
	// 			if (!file) {
	// 				return res.json({ message: 'please upload a file' })
	// 			} else {
	// 				console.log('upload success!')

	// 				res.json({ message: 'upload success' })
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			return res.json({
	// 				status: 'Failed',
	// 				message: error.message
	// 			})
	//     })

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
}
