const { wishlistDao } = require('../models');

const clickWishlist = async(userId, productId) => {
    const findWishlistId = await wishlistDao.findWishlistId(userId, productId);

    if(findWishlistId.length==0){
        return await wishlistDao.addWishlist(userId, productId);
    }
    else{
        return await wishlistDao.oneDeleteWishlist(userId, productId);
    }
};

const getWishlist = async(userId) => {
    return await wishlistDao.getWishlist(userId);
};

const replaceWishlist = async(userId) => {
    await wishlistDao.addCart(userId)
    await wishlistDao.allDeleteWishlist(userId);
}

const oneDeleteWishlist = async(userId, productId) => {
    return await wishlistDao.oneDeleteWishlist(userId, productId);
}

const messageName = async(productId) => {
    return await wishlistDao.messageName(productId);
}

module.exports = {
    clickWishlist,
    getWishlist,
    replaceWishlist,
    oneDeleteWishlist,
    messageName
}