const { productService } = require('../services');
const { catchAsync }  = require('../utils/error');

const getRandomProducts = catchAsync(async (req, res) => {
    const products = await productService.getRandomProducts();

    res.status(200).json({ data : products });
});

module.exports = {
    getRandomProducts
}