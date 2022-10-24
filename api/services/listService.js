const { listDao } = require('../models');

const listService = async(categoryId, limit, minPrice, maxPrice, sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName) => {
    

    return await listDao.getProductsByCat(categoryId, limit, minPrice, maxPrice, sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName);
}

module.exports = {
    listService
}
