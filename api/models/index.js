const dataSource = require('./dataSource');
const enums = require('./enums')
const userDao = require('./userDao');
<<<<<<< HEAD
const productDao = require('./productDao');
=======
const categoryDao = require('./categoryDao');
const productDao = require('./productDao');
const orderDao = require('./orderDao');
>>>>>>> main

module.exports = {
    dataSource,
    userDao,
<<<<<<< HEAD
    productDao
=======
    categoryDao,
    productDao,
    orderDao,
    enums
>>>>>>> main
}
