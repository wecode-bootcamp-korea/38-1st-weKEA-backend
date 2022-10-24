const { orderDao } = require('../models');

const getOrders = async(userId) => {
     return await orderDao.getOrders(userId)
};

const addToOrders = async(userId, totalPrice) => {
    await orderDao.checkPoints(userId, totalPrice);
    return orderDao.MoveCartToOrder(userId);
};

const removeOrders = async(userId, orderId, totalPrice) => {
    return await orderDao.removeOrders(userId, orderId, totalPrice);
}; 

module.exports = {
    getOrders,
    addToOrders,
    removeOrders
}