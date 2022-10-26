const dataSource = require('./dataSource');

const userDao = require('./userDao');
const categoryDao = require('./categoryDao');
const productDao = require('./productDao');

module.exports = {
    dataSource,
    userDao,
    categoryDao,
    productDao
}
