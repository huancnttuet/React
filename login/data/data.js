const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('demo', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  checkSignUp: async function (emailSignUp, usernameSignUp) {
    var checkSignUp = await sequelize.query(`SELECT COUNT(email) AS email FROM user WHERE email='${emailSignUp}' OR username='${usernameSignUp}'`).then(result => {
      if(result[0][0].email > 0){
        return false
      }
      return true
    })
    return checkSignUp;
  },
  createUser: async function (emailSignUp, usernameSignUp, pwdSignUp) {
    var createUser = await sequelize.query(`INSERT INTO user(email,username,pwd) VALUES('${emailSignUp}','${usernameSignUp}','${pwdSignUp}') `).then(result => {
      console.log(result);
      if(result[0] === 0 && result[1] === 1)
        return true;
      return false
    })
    return createUser
  },
  checkSignIn: async function (usernameSignIn, pwdSignIn) {
    var id = await sequelize.query(`SELECT id,username FROM user WHERE pwd='${pwdSignIn}' AND username='${usernameSignIn}'`).then(result => {
      console.log(result);

      if(result[0][0] != null){
        return result[0][0]
      }
      return 0
    })
    return id;
  },
  changePwd: async function (id, pwd){
    var updatePwd = await sequelize.query(`UPDATE user SET pwd='${pwd}' WHERE id='${id}'`).then(result => {
      if(result[0].changedRows === 1){
        return true
      }
      return false
    })
    return updatePwd
  },
  checkIdPwd: async function ( id, pwd) {
    var rs = await sequelize.query(`SELECT id FROM user WHERE pwd='${pwd}' AND id='${id}'`).then(result => {
      console.log(result);

      if(result[0][0] != null){
        return true
      }
      return false
    })
    return rs;
  },
  checkEmailFA: async function ( emailFA ) {
    var pwd = await sequelize.query(`SELECT pwd FROM user WHERE email='${emailFA}'`).then(result => {
      console.log(result);

      if(result[0][0] != null){
        return result[0][0].pwd
      }
      return null
    })
    return pwd
  }
}
