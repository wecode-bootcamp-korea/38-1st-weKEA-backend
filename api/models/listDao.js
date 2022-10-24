const { weKEADataSource } = require('./dataSource');

const getProductsByCat = async(categoryId, limit, minPrice, maxPrice, sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName) => {

    const filter = async(sortBy) => {

        switch(sortBy){
            case 'priceASC':
                return `ORDER BY productPrice ASC`
            case 'priceDESC':
                return `ORDER BY productPrice DESC`
            case 'nameASC':
                return `ORDER BY productName ASC`
            case 'newest':
                return `ORDER BY productCreatedAt DESC`
            default:
                return `ORDER BY productId ASC`
        }
    };

    const viewMore = async(sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName) => {
        
        switch(sortBy){
            case 'priceASC':
                return ` AND (productPrice>${cursorPrice} OR (productId>${cursorId} AND productPrice=${cursorPrice}))`;
            case 'priceDESC':
                return ` AND (productPrice<${cursorPrice} OR (productId>${cursorId} AND productPrice=${cursorPrice}))`;
            case 'nameASC':
                return ` AND (productCreatedAt<${cursorCreatedAt} OR (productId>${cursorId} AND productCreatedAt=${cursorCreatedAt}))`;
            case 'newest':
                return ` AND (productName>'${cursorName}' OR (productId>${cursorId} AND productName=${cursorName}))`;
            default:
                return ` AND productId>=0`;
        }
    };

    const priceRange = async(minPrice, maxPrice) => {
        let priceRange = ` AND productPrice>=0`;

        if (minPrice && maxPrice) {
            priceRange = ` AND (productPrice>=${minPrice} AND productPrice<${maxPrice})`; // 의심1
        }
    };

    const filterQuery = await filter(sortBy);
    const viewMoreQuery = await viewMore(sortBy, cursorId, cursorPrice, cursorCreatedAt, cursorName);
    const priceRangeQuery = await priceRange(minPrice, maxPrice);

    const products = await weKEADataSource.query(`
        SELECT
            o.color AS productColor,
            o.size AS productSize,
            o.price AS productPrice,
            p.id AS productId,
            p.name AS productName,
            p.thumbnail AS productThumbnail,
            p.created_at,
            pi.hoverimages
        FROM products p
        INNER JOIN product_options o ON p.id=o.product_id
        LEFT JOIN(
            SELECT
                product_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id", id,
                        "url", image_url
                    )
                ) as hoverImages
            FROM images
            GROUP BY product_id
        ) pi ON p.id=pi.product_id
        WHERE p.category_id=?${priceRangeQuery}${viewMoreQuery}
        ${filterQuery}
        LIMIT ?;`,
        [Number(categoryId), Number(limit)]
    );

    return products;
};

module.exports = {
    getProductsByCat
}