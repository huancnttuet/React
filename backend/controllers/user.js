const UserService = require('../services/users')
exports.signin = async (req, res) => {
  const userService = new UserService(req)

  userService.signin().then(userInfo => {
    return res.json({
      status: "Success",
      data: userInfo
    })
  }).catch(error => {
    return res.json({
      status: "Failed",
      message: error.message
    })
  })
}