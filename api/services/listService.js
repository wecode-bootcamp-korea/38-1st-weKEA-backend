const { listDao } = require('../models');

const listService = async (categoryId) => {
    console.log('listService!');
    return await listDao.listInfo(categoryId);
};

module.exports = {
    listService
}