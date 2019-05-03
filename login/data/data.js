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
  queryUser: async function (emailSignUp, usernameSignUp) {
    var checkSignUp = await sequelize.query(`SELECT COUNT(email) AS email FROM user WHERE email='${emailSignUp}' OR username='${usernameSignUp}'`).then(result => {
      if(result[0][0].email > 0){
        return false
      }
      return true
    })
    return checkSignUp;
  },
  createUser: async function (emailSignUp, usernameSignUp, pwdSignUp) {
    var createUser = await sequelize.query(`INSERT INTO user(email,pwd,username) VALUES('${emailSignUp}','${usernameSignUp}','${pwdSignUp}') `).then(result => {
      console.log(result);
      if(result[0] === 0 && result[1] === 1)
        return true;
      return false
    })
    return createUser
  }

}
