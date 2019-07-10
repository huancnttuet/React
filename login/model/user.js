const Sequelize = require("sequelize");
var sequelize = require("./configORM.js");

var User = sequelize.define("user", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  pwd: Sequelize.STRING
});

module.exports = {
  checkSignUp: async function(emailSignUp, usernameSignUp) {
    // var checkSignUp = await sequelize.query(`SELECT COUNT(email) AS email FROM user WHERE email='${emailSignUp}' OR username='${usernameSignUp}'`).then(result => {
    //   if(result[0][0].email > 0){
    //     return false
    //   }
    //   return true
    // })
    // return checkSignUp;
    require("./configORM.js");
    var checkSignUp = await User.findAll({
      attributes: ["email"],
      where: {
        email: emailSignUp,
        username: usernameSignUp
      }
    });
    sequelize.close();
    if (checkSignUp.length === 0) {
      return false;
    }
    return true;
  },
  createUser: async function(emailSignUp, usernameSignUp, pwdSignUp) {
    // var createUser = await sequelize.query(`INSERT INTO user(email,username,pwd) VALUES('${emailSignUp}','${usernameSignUp}','${pwdSignUp}') `).then(result => {
    //   console.log(result);
    //   if(result[1] === 1)
    //     return true;
    //   return false
    // })
    // return createUser
    require("./configORM.js");
    var createUser = await User.findOrCreate({
      where: {
        email: emailSignUp,
        username: usernameSignUp
      },
      defaults: {
        pwd: pwdSignUp
      }
    });
    sequelize.close();
    return createUser[1];
  },
  checkSignIn: async function(usernameSignIn, pwdSignIn) {
    // var id = await sequelize.query(`SELECT id,username FROM user WHERE pwd='${pwdSignIn}' AND username='${usernameSignIn}'`).then(result => {
    //   console.log(result);
    //   if(result[0][0] != null){
    //     return result[0][0]
    //   }
    //   return 0
    // })
    // return id;
    require("./configORM.js");
    var id = await User.findAll({
      attributes: ["id", "username"],
      where: {
        pwd: pwdSignIn,
        username: usernameSignIn
      }
    });
    sequelize.close();
    if (id.length === 0) {
      return 0;
    }
    return id[0].dataValues;
  },
  changePwd: async function(id, pwd) {
    // var updatePwd = await sequelize.query(`UPDATE user SET pwd='${pwd}' WHERE id='${id}'`).then(result => {
    //   if(result[0].changedRows === 1){
    //     return true
    //   }
    //   return false
    // })
    // return updatePwd
    require("./configORM.js");
    var updatePwd = await User.update(
      { pwd: pwd },
      {
        where: {
          id: id
        }
      }
    );
    sequelize.close();
    if (updatePwd[0] === 1) {
      return true;
    }
    return false;
  },
  checkIdPwd: async function(id, pwd) {
    // var rs = await sequelize.query(`SELECT id FROM user WHERE pwd='${pwd}' AND id='${id}'`).then(result => {
    //   console.log(result);
    //   if(result[0][0] != null){
    //     return true
    //   }
    //   return false
    // })
    // return rs;
    require("./configORM.js");
    var rs = await User.findAll({
      attributes: ["id"],
      where: {
        pwd: pwd,
        id: id
      }
    });
    sequelize.close();
    if (rs.length === 0) return false;
    return true;
  },
  checkEmailFA: async function(emailFA) {
    // var pwd = await sequelize.query(`SELECT pwd FROM user WHERE email='${emailFA}'`).then(result => {
    //   console.log(result);
    //   if(result[0][0] != null){
    //     return result[0][0].pwd
    //   }
    //   return null
    // })
    // return pwd
    require("./configORM.js");
    var pwd = await User.findAll({
      attributes: ["pwd"],
      where: {
        email: emailFA
      }
    });
    sequelize.close();
    if (pwd.length === 0) {
      return null;
    }
    return pwd[0].dataValues.pwd;
  }
};
