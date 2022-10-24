const { orderDao } = require('../models');

const getOrders = async(userId) => {
     return await orderDao.getOrders(userId)
};
 
module.exports = {
    getOrders
}