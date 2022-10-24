const { cartDao } = require('../models');

const addCart = async(userId, productOptionId, quantity) => {
    const findCartId = await cartDao.findCartId(userId, productOptionId);
    
    if(findCartId.length==0){
        return await cartDao.addCart(userId, productOptionId, quantity);
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