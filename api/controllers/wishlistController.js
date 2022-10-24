const { wishlistService } = require('../services');
const { catchAsync }      = require('../utils/error');

const addWishlist = catchAsync(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    const addWishlist = await wishlistService.addWishlist(userId, productId, quantity);
    res.status(200).json({ addWishlist });
});

const getWishlist = catchAsync(async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        const error = new Error('USER_ID_IS_NOT_VALID');
        error.statusCode = 400;

        throw error;
    }

    const getWishlist = await wishlistService.getWishlist(userId);
    res.status(200).json({ getWishlist });
});

const allDeleteWishlist = catchAsync(async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        const error = new Error("ALL DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const allDeleteWishlist = await wishlistService.allDeleteWishlist(userId);
    res.status(200).json({ allDeleteWishlist });
})

const oneDeleteWishlist = catchAsync(async (req, res) => {
    const { userId, productOptionId } = req.body;

    if(!userId || !productOptionId) {
        const error = new Error("DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const oneDeleteWishlist = await wishlistService.oneDeleteWishlist(userId, productId);
    res.status(200).json({ oneDeleteWishlist });
})

module.exports = {
    addWishlist,
    getWishlist,
    allDeleteWishlist,
    oneDeleteWishlist
}