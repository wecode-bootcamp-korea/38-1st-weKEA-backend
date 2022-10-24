const dataSource = require('./dataSource');

const userDao = require('./userDao');
const pageDao = require('./pageDao');
const orderDao = require('./orderDao');

module.exports = {
    dataSource,
    userDao,
    pageDao,
    orderDao
}
