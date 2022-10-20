const { listService } = require('../controllers');
const { catchAsync } = require('../utils/error');

const listInfo = catchAsync(async (req, res) => {
    const categoryId = req.params.categoryId;
    if(!categoryId) {
        const error = new Error('CATEGORY_ID_IS_NOT_VALID');
        error.statusCode = 400; // http status Code가 이게 맞나?

        throw error 
    }
    const getProductsByCategoryId = await listService.listInfo(categoryId);
    res.status(200).json({getProductsByCategoryId});
});

module.exports = {
    listInfo
}
