const { mainDao } = require('../models');

const randomProducts = async () => {
    return await mainDao.randomProducts();
};

module.exports = {
    randomProducts
};