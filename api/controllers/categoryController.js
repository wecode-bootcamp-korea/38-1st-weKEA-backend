const { categoryService } = require('../services');
const { catchAsync } = require('../utils/error');

const categoryInfo = catchAsync(async(req, res) => {
    const { categoryId } = req.params;
    const { offset, limit, minPrice, maxPrice, sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName } = req.query;

    if(!categoryId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!limit) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    const getProductsByCategoryId = await categoryService.categoryService(categoryId, offset, limit, minPrice, maxPrice, sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName);
    res.status(200).json({getProductsByCategoryId});
    
});

module.exports = {
    categoryInfo
}