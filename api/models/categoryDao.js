const { weKEADataSource } = require('./dataSource');

const getProductsByCat = async(categoryId, offset, limit, orderingQuery, priceRangeQuery) => {

    const products = await weKEADataSource.query(`
        SELECT
            o.color AS productColor,
            o.size AS productSize,
            o.price AS productPrice,
            o.id AS optionsId,
            p.id AS productId,
            p.name AS productName,
            p.thumbnail AS productThumbnail,
            p.created_at AS productCreatedAt,
            pi.hoverimages
        FROM products p
        INNER JOIN product_options o ON p.id=o.product_id
        LEFT JOIN(
            SELECT
                product_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "hoverImagesId", id,
                        "url", image_url
                    )
                ) as hoverImages
            FROM images
            GROUP BY product_id
        ) pi ON p.id=pi.product_id
        WHERE p.category_id=? ${priceRangeQuery}
        ${orderingQuery}
        LIMIT ?, ?;`,
        [categoryId, offset, limit]
    );

    return products;
};

module.exports = {
    getProductsByCat
}