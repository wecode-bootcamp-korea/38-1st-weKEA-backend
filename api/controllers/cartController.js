const { cartService } = require('../services');
const { catchAsync }  = require('../utils/error');

const addCart = catchAsync(async (req, res) => {
    const { userId, productOId, quantity } = req.body;
    
    const addCart = await cartService.addCart(userId, productOId, quantity);
    res.status(200).json({ addCart });
});

const getCart = catchAsync(async (req, res) => {
    // const user = req.user.id;
    // const { userId } = req.body;

    // if(!userId) {
    //     const error = new Error('USER_ID_IS_NOT_VALID');
    //     error.statusCode = 400;

    //     throw error;
    // }

    const getCart = await cartService.getCart();
    res.status(200).json({ getCart });
});

const allDeleteCart = catchAsync(async (req, res) => {
    //const userId = req.user.id;
    const { userId } = req.body;

    if(!userId) {
        const error = new Error("ALL DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const allDeleteCart = await cartService.allDeleteCart(userId);
    res.status(200).json({ allDeleteCart });
})

const oneDeleteCart = catchAsync(async (req, res) => {
    // const user = req.user.id;
    // const product = req.product.id;
    // const userId = req.query.userId;
    // const productOptionId = req.query.productOptionId;
    const { userId, productOptionId } = req.body;

    if(!userId || !productOptionId) {
        const error = new Error("DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const oneDeleteCart = await cartService.oneDeleteCart(userId, productOptionId);
    res.status(200).json({ oneDeleteCart });
})

module.exports = {
    addCart,
    getCart,
    allDeleteCart,
    oneDeleteCart
}