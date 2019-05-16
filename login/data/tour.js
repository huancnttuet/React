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
  getList: async function () {
    var list = await sequelize.query(`SELECT * FROM diadiems`).then(result => {
      return result
    })
    return list;
  },
  getListTour: async function (id) {
    var list = await sequelize.query(`SELECT * FROM tours t JOIN diadiems d WHERE t.id_diadiem = d.id AND d.id=${id}`).then(result => {
      return result
    })
    return list;
  },
  getDetailTour: async function (id) {
    var detail = await sequelize.query(`SELECT * FROM tours  WHERE id_tour=${id}`).then(result => {
      return result
    })
    return detail;
  },
  getImg: async function (id) {
    var path = await sequelize.query(`SELECT * FROM imgs WHERE id_tour=${id}`).then(result => {
      return result
    })
    return path;
  }

}
