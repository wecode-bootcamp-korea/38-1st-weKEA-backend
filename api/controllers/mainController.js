const { mainService } = require('../services');
const { catchAsync }  = require('../utils/error');

const randomProducts = catchAsync(async (req, res) => {
    const products = await mainService.randomProducts();

    res.status(200).json({ data : products });
});

module.exports = {
    randomProducts
}