const { listService } = require('../services');
const { catchAsync } = require('../utils/error');

const listInfo = catchAsync(async(req, res) => {
    const { categoryId, size, cursorId, cursorPrice } = req.params;
    if(!categoryId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!size) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!cursorId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    if(!cursorPrice) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    const getProductsByCategoryId = await listService.listService(categoryId, size, cursorId, cursorPrice);
    res.status(200).json({getProductsByCategoryId});

});

module.exports = {
    listInfo
}