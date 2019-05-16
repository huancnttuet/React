const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('demo', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  define: {
    timestamps: false
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Diadiem = sequelize.define('diadiem', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    diadiem: Sequelize.STRING,
    imgKey: Sequelize.STRING
})

const Tour = sequelize.define('tour', {
  id_tour: {type: Sequelize.INTEGER, primaryKey: true},
  id_diadiem: Sequelize.INTEGER,
  tentour: Sequelize.STRING,
  id_img: Sequelize.INTEGER,
  img_main: Sequelize.STRING,
  gia: Sequelize.INTEGER,
  lichtrinh: Sequelize.STRING
})

module.exports = {
  getAll: async function (table) {
    var list = await sequelize.query(`SELECT * FROM ${table}s ORDER BY id DESC` ).then(result => {
      return result
    })
    return list;
  },
  updateDiadiem: async function (id, diadiem, imgKey) {
    var rs = await Diadiem.update({diadiem: diadiem, imgKey: imgKey},{where: {id: id}})
    console.log(rs);
    if(rs[0] === 1) {
      return true
    }
    return false
  },
  updateTour: async function (id_tour, id_diadiem, tentour, gia, lichtrinh) {
    var rs = await Tour.update({tentour: tentour, gia: gia, lichtrinh:lichtrinh},{where: {id_tour: id_tour}})
    console.log(rs);
    if(rs[0] === 1) {
      return true
    }
    return false
  },
  insertDiadiem: async function (diadiem, imgKey) {
    var rs = await Diadiem.findOrCreate({
      where: {diadiem: diadiem},
      defaults: {imgKey: imgKey}
    })
    if(rs[1] === true){
      return true
    }
    return false
  },
  insertTour: async function (id_diadiem, tentour, gia, lichtrinh) {
    var rs = await Tour.findOrCreate({
      where: {id_diadiem: 0},
      defaults: {id_diadiem: id_diadiem, tentour: tentour, gia: gia, lichtrinh: lichtrinh}
    })
    if(rs[1] === true){
      return true
    }
    return false
  },
  deleteDiadiem: async function (id) {
    var rs = await Diadiem.destroy({
      where: {
        id: id
      }
    })
    console.log(rs);
    if(rs === 1)
      return true
    return false
  },
  deleteTour: async function (id) {
    var rs = await Tour.destroy({
      where: {
        id_tour: id
      }
    })
    console.log(rs);
    if(rs === 1)
      return true
    return false
  },
  getListTourById: async function (id) {
    var list = await Tour.findAll({
      where: {
        id_diadiem: id
      }
    })
    var diadiem = await Diadiem.findAll({
      where: {
        id: id
      }
    })
    console.log(diadiem);
    return [list,diadiem[0].dataValues.diadiem]
  },
  getListTour: async function (id) {
    var list = await Tour.findAll({
      where: {
        id_diadiem: id
      }
    })

    return list
  }
}
