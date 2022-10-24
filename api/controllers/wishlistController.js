const { wishlistService } = require('../services');
const { catchAsync }      = require('../utils/error');

const addWishlist = catchAsync(async (req, res) => {
    const addWishlist = await wishlistService.addWishlist(productId);
    res.status(201).json({ addWishlist });
})

module.exports = {
    wishlistService,
    addWishlist
}