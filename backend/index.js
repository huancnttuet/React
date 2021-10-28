const express = require('express') // Require module express vào project
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express() // Tạo một app mới
const port = 8080 // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server
// Require user route
const userRoute = require('./routes/user')
const tourRoute = require('./routes/tour')
const place_route = require('./routes/place')
const image_route = require('./routes/image')

app.use(cors())
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

app.use(express.static(__dirname + '/public'))
app.set('views', './views') // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug') // Sử dụng pug làm view engine

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Routes
app.use('/users', userRoute)
app.use('/tour', tourRoute)
app.use('/place', place_route)
app.use('/image', image_route)

app.get('/', function (req, res) {
	res.send('<h2>API is running</h2>')
})

app.listen(port, function () {
  console.log(__dirname + '/public/img')
	console.log('Your app running on port ' + port)
})
