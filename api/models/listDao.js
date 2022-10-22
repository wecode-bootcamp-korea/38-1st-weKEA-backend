const { weKEADataSource } = require('./dataSource');

const getProductsByCat = async(categoryId, size) => {
    const products = await weKEADataSource.query(`
        SELECT
            p.id AS productId,
            p.name AS productName,
            p.thumbnail AS productThumbNail,
            p.created_at AS productCreatedAt,
            c.name AS categoryName,
            c.id AS categoryId,
            o.price AS productPrice,
            o.size AS productSize,
            o.color AS productColor,
            i.image_url AS productHoverImage
        FROM products p
        INNER JOIN categories c ON p.category_id=c.id
        INNER JOIN product_options o ON p.id=o.product_id
        INNER JOIN images i ON p.id=i.product_id
        WHERE p.category_id=? AND o.color='black'
        ORDER BY p.id ASC
        LIMIT ?;`,
        [categoryId, Number(size)]
    );

    return products;
};

// filtering & pagination 동시 진행 - price ASC, price DESC
// images를 하나만 꺼내고 싶다면..? 별도로 구성해야 하나?
const priceASC = async(categoryId, size, cursorId, cursorPrice) => {
    const priceASC = await weKEADataSource.query(`
        SELECT
            p.id AS productId,
            p.name AS productName,
            p.thumbnail AS productThumbNail,
            p.created_at AS productCreatedAt,
            c.name AS categoryName,
            c.id AS categoryId,
            o.price AS productPrice,
            o.size AS productSize,
            o.color AS productColor,
            i.image_url AS productHoverImage
        FROM products p
        INNER JOIN categories c ON p.category_id=c.id
        INNER JOIN product_options o ON p.id=o.product_id
        INNER JOIN images i ON p.id=i.product_id
        WHERE p.category_id=? AND o.color='black' AND (o.price > ? OR (o.price = ? AND p.id >? ))
        ORDER BY o.price ASC, p.id ASC
        LIMIT ?;`,
        [categoryId, cursorPrice, cursorPrice, cursorId, Number(size)]
    );

    return priceASC;
};

module.exports = {
    getProductsByCat,
    priceASC
}