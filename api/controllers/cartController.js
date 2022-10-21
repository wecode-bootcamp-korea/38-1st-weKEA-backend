const { cartService } = require('../services');
const { catchAsync }  = require('../utils/error');

const getCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    
    if(!userId) {
        const error = new Error('USER_ID OR PRODUCT_ID_IS_NOT_VALID');
        error.statusCode = 400;

        throw error;
    }

    const getCart = await cartService.getCart();
    res.status(200).json({ getCart });
});

module.exports = {
    getCart
}