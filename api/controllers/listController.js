const { listService } = require('../services');
const { catchAsync } = require('../utils/error');

const listInfo = catchAsync(async(req, res) => {
    const { categoryId } = req.params;
    const { limit, minPrice, maxPrice, sortBy } = req.query;

    if(!categoryId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!limit) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    const getProductsByCategoryId = await listService.listService(categoryId, limit, minPrice, maxPrice, sortBy);
    res.status(200).json({getProductsByCategoryId});
    
});

module.exports = {
    listInfo
}