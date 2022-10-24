const { cartDao } = require('../models');

const addCart = async(userId, productOId, quantity) => {
    const findCartId = await cartDao.findCartId(userId, productOId);

    if(findCartId.length==0){
        return await cartDao.addCart(userId, productOId, quantity);
    }
    else{
        return await cartDao.updateCart(findCartId[0].id, quantity);
    }
};

const getCart = async(userId) => {
    return await cartDao.getCart(userId);
};

const allDeleteCart = async(userId) => {
    return await cartDao.allDeleteCart(userId);
}

const oneDeleteCart = async(userId, productOptionId) => {
    return await cartDao.oneDeleteCart(userId, productOptionId);
}

module.exports = {
    addCart,
    getCart,
    allDeleteCart,
    oneDeleteCart
}