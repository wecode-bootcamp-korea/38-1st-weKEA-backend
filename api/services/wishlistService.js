const { wishDao } = require('../models');

const addWishlist = async (req, res) => {
    return await wishDao.addWishlist(productId);
};

module.exports = { 
    addWishlist
}
