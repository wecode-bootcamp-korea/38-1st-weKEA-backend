const { orderService } = require('../services')
const { catchAsync } = require('../utils/error');

const getOrders = catchAsync(async(req, res) => {
     const userId = req.user.id;

     const getOrders = await orderService.getOrders(userId);
     res.status(200).json({getOrders});
});


module.exports = {
    getOrders
}