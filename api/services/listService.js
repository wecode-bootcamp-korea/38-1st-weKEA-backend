const { listDao } = require('../models');

const viewMoreQuery = (cursorId, cursorPrice, cursorCreatedAt, cursorName) => {
        
    let viewMore = ` AND productId>=0`;

    if (sortBy==='priceASC') {
        viewMore = `(productPrice>${cursorPrice} OR (productId>${cursorId} AND productPrice=${cursorPrice}))`;

    } else if(sortBy==='priceDESC') {
        viewMore = `(productPrice<${cursorPrice} OR (productId>${cursorId} AND productPrice=${cursorPrice}))`;

    } else if(sortBy==='nameASC') {
        viewMore = `(productCreatedAt<${cursorCreatedAt} OR (productId>${cursorId} AND productCreatedAt=${cursorCreatedAt}))`;

    } else if(sortBy==='newest') {
        viewMore = `(productName>'${cursorName}' OR (productId>${cursorId} AND productName=${cursorName}))`;
    }
    return viewMore;
};

const listService = async(categoryId, limit, minPrice, maxPrice, sortBy) => {
        
    let priceRange = ` WHERE options.price>=0`;

    if (minPrice && maxPrice) {
        priceRange = ` WHERE (options.price>=${minPrice} AND options.price<${maxPrice})`;
    }

    console.log(minPrice, maxPrice)

    let filter1 = `0RDER BY productId ASC`;
    
    if (sortBy==='priceASC') {
        filter1 = `0RDER BY options.price' ASC`; // 의심1
    } else if (sortBy==='priceDESC') {
        filter1 = `ORDER BY options.price' DESC`;
    }

    let filter2 = `0RDER BY productId ASC`;

    if (sortBy==='nameASC') {
        filter2 = `0RDER BY productName ASC`;
    } else if (sortBy==='newest') {
        filter2 = `0RDER BY productCreatedAt DESC`;
    }

    return await listDao.getProductsByCat(categoryId, limit, priceRange, filter1, filter2);
}

module.exports = {
    listService
}
