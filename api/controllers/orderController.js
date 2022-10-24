const { orderService } = require('../services')
const { catchAsync } = require('../utils/error');

const getOrders = catchAsync(async(req, res) => {
     const userId = req.user.id;

     const getOrders = await orderService.getOrders(userId);
     res.status(200).json({getOrders});
});

const addToOrders = catchAsync(async(req, res) => {
    const userId = req.user.id;
    const { totalPrice } = req.body;

    await orderService.addToOrders(userId, totalPrice);
    res.status(201).json({ message : "Successfully_Ordered" });
}); 

const removeOrders = catchAsync(async(req, res) => {
    const userId = req.user.id;
    const { orderId, totalPrice } = req.body;

    await orderService.removeOrders(userId, orderId, totalPrice);
    res.status(204).json({ message : "Successfully_Cancled" });
})


module.exports = {
    getOrders,
    addToOrders,
    removeOrders
}