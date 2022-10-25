const { orderDao, enums } = require('../models');

const getOrders = async(userId) => {
     return await orderDao.getOrders(userId)
};

const addToOrders = async(userId, totalPrice) => {
    const userPoint = await orderDao.checkPoints(userId);

    if(userPoint<totalPrice||totalPrice<0){
        const error = new Error('Not_Enough_Points');
        error.statusCode = 400;

        throw error;
    };
    return orderDao.MoveCartToOrder(userId, totalPrice);
};

const cancelOrders = async(userId, orderId, totalPrice) => {
    const orderStatus = await orderDao.checkOrderStatus(orderId);
    
    if(orderStatus==enums.orderStatusEnum.cancelOrder){
        const error = new Error('Already_canceled');
        error.statusCode = 400;

        throw error;
    };

    return await orderDao.cancelOrders(userId, orderId, totalPrice);
}; 

module.exports = {
    getOrders,
    addToOrders,
    cancelOrders
}