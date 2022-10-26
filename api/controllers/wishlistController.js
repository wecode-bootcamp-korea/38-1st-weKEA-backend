const { wishlistService } = require('../services');
const { catchAsync }  = require('../utils/error');

const clickWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.query;
    
    const clickWishlist = await wishlistService.clickWishlist(userId, productId);
    const messageName = await wishlistService.messageName(productId);
    res.status(200).json({ clickWishlist, messageName });
});

const getWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        const error = new Error('USER_ID_IS_NOT_VALID');
        error.statusCode = 400;

        throw error;
    }

    const getWishlist = await wishlistService.getWishlist(userId);
    res.status(200).json({ getWishlist });
});

// const wishQuantityChange = catchAsync(async (req, res) => {
//     const userId = req.user.id;
//     const { productOptionId, quantity } = req.query;

//     if( !productOptionId || !quantity) {
//         const error = new Error("quantityPlus Error");
//         error.statusCode = 400;

//         throw error;
//     }

//     const wishQuantityChange = await wishlistService.wishQuantityChange(userId, productOptionId, quantity);
//     res.status(200).json({ wishQuantityChange });
// });

const replaceWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        const error = new Error("replace ERROR");
        error.statusCode = 400;

        throw error;
    }

    await wishlistService.replaceWishlist(userId);
    res.status(200)
});

const oneDeleteWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.query;

    if(!userId || !productId) {
        const error = new Error("DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const oneDeleteWishlist = await wishlistService.oneDeleteWishlist(userId, productId);
    const messageName = await wishlistService.messageName(productId);
    res.status(200).json({ oneDeleteWishlist, messageName });
});

module.exports = {
    clickWishlist,
    getWishlist,
    // wishQuantityChange,
    replaceWishlist,
    oneDeleteWishlist
}