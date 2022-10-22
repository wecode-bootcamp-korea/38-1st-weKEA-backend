const { listDao } = require('../models');

const listService = async(categoryId, size, cursorId, cursorPrice) => {
    return await listDao.priceASC(categoryId, size, cursorId, cursorPrice);
}

// const ADDPRODUCTS = 4; //How many products we want to show on each page
// const numOfResults = products.length; // count the total number of products responded by sql query
// const numberOfPages = Math.ceil(numOfResults/ADDPRODUCTS); // the number of pages that we'll get in total

// let page = req.query.page ? Number(req.query.page) : 1;

// // set exception errors cases
// if (page > numberOfPages) {
//     res.redirect('/?page='+encodeURIComponent(numberOfPages));
// } else if (page < 1) {
//     res.redirect('/?page='+endcodeURIComponent(1));
// };

// // Determine the SQL LIMIT starting number
// const startingLimit = (page-1)*ADDPRODUCTS;

module.exports = {
    listService
}
