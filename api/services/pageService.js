const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { pageDao } = require('../models');

const getProductDetailById = async(id) => {
     const productDetail = await pageDao.getProductDetailById(id);
     return productDetail;
};

module.exports = {
    getProductDetailById
}