const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('demo', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  define: {
    timestamps: false
  },
  dialectOptions: {
      useUTC: true, // for reading from database
      dateStrings: true,
      typeCast: true
    },
  timezone: '+07:00',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const Order = sequelize.define('order', {
  id_order:  {type: Sequelize.INTEGER, primaryKey: true},
  id_tour: Sequelize.INTEGER,
  email: Sequelize.STRING,
  hovaten: Sequelize.STRING,
  trangthai: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
})

module.exports = {
  createOrder: async function (id_tour,email,hovaten,trangthai) {
    var rs = await Order.findOrCreate({
      where: {id_tour: 0},
      defaults: {
        id_tour: id_tour,
        email: email,
        hovaten: hovaten,
        trangthai: trangthai
      }
    })
    if(rs[1] === true){
      return true
    }
    return false
  },
  getAllOrder: async function () {
    var list = await Order.findAll()
    return list
  },
  updateOrder: async function (id_order, email, hovaten, id_tour, trangthai) {
    var rs = await Order.update({email: email, hovaten: hovaten, id_tour: id_tour, trangthai: trangthai},{where: {id_order: id_order}})
    console.log(rs);
    if(rs[0] === 1) {
      return true
    }
    return false
  },
  deleteOrder: async function (id_order) {
    var rs = await Order.destroy({
      where: {
        id_order: id_order
      }
    })
    console.log(rs);
    if(rs === 1)
      return true
    return false
  },
  getOneOrder: async function (id) {
    var list = await Order.findAll({
      where: {
        id_order: id
      }
    })
    return list
  },
}
