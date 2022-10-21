const { listDao } = require('../models');

const listService = async (categoryId) => {
    return await listDao.listInfo(categoryId);
};

module.exports = {
    listService
}