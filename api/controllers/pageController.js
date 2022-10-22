const { pageService } = require('../services')
const { catchAsync } = require('../utils/error');

const productDetail = catchAsync(async(req, res) => {
     const id = req.params.id;

     if(!id){
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }
     const productDetail = await pageService.productDetail(id);
     res.status(200).json({productDetail});
});

module.exports = {
    productDetail
}