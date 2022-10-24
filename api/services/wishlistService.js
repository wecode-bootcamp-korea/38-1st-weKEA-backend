const { wishlistDao } = require('../models');

const addWishlist = async(userId, productId, quantity) => {
    const findWishlistId = await wishlistDao.findWishlistId(userId, productId);

    if(findWishlistId.length==0){
        return await wishlistDao.addWishlist(userId, productId, quantity);
    }
    else{
        return await wishlistDao.updateWishlist(findWishlistId[0].id, quantity);
    }
};

const getWishlist = async(userId) => {
    return await wishlistDao.getWishlist(userId);
};

const allDeleteWishlist = async(userId) => {
    return await wishlistDao.allDeleteWishlist(userId);
}

const oneDeleteWishlist = async(userId, productId) => {
    return await wishlistDao.oneDeleteWishlist(userId, productId);
}

module.exports = {
    addWishlist,
    getWishlist,
    allDeleteWishlist,
    oneDeleteWishlist
}