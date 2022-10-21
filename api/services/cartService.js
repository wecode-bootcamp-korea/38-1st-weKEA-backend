const { cartDao } = require('../models');

const getCart = async() => {
    return await cartDao.getCart();
};

module.exports = {
    getCart
}