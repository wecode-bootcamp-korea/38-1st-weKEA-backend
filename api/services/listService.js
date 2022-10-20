const { listDao } = require('../services');

const listService = async (categoryId) => {
    return await listDao.listInfo(categoryId);
};

module.exports = {
    listService
}