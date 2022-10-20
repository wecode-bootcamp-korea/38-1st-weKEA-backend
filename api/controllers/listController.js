const { listService } = require('../services');
const { catchAsync } = require('../utils/error');

const listInfo = catchAsync(async (req, res) => {
    const categoryId = req.params.categoryId;
    if(!categoryId) {
        const error = new Error('CATEGORY_ID_IS_NOT_VALID');
        error.statusCode = 400;

        console.log(error);
        throw error
    }
    const productsByCategory = await listService.listService(categoryId);
    res.status(200).json({productsByCategory});
});

module.exports = {
    listInfo
}
