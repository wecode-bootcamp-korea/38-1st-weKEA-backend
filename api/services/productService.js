const { productDao } = require('../models');

const getRandomProducts = async () => {
    return await productDao.getRandomProducts();
};

module.exports = {
    getRandomProducts
};