const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { pageDao } = require('../models');

const productDetail = async(id) => {
     console.log(id);
     const productDetail = await pageDao.productDetail(id);
     return productDetail;
};

module.exports = {
    productDetail
}