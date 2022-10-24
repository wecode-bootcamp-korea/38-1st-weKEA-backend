const { weKEADataSource } = require('./dataSource');

const getProductsByCat = async(categoryId, limit, priceRange, filter1, filter2) => {

    // PRICE RANGE // 별칭 업데이트함 // filter
    const products = await weKEADataSource.query(`
        SELECT
            p.id AS productId,
            p.name AS productName,
            p.thumbnail AS productThumbnail,
            p.created_at AS productCreatedAt,
            pi.hoverImages AS hoverImages,
            po.options AS productOptions
        FROM products p
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
        LEFT JOIN(
            SELECT
                product_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "option_id", id,
                        "size", size,
                        "color", color,
                        "price", price
                    )
                ) as options
            FROM product_options
            ${priceRange}
            ${filter1}
            GROUP BY product_id
        ) po ON p.id=po.product_id
        WHERE p.category_id=?
        ${filter2}
        GROUP BY p.id
        LIMIT ?;`,
        [Number(categoryId), Number(limit)]
    );

    return products;
};

module.exports = {
    getProductsByCat
}