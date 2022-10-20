const { weKEADataSource } = require('./dataSource');

// data 요청사항 @list-page
const listInfo = async (categoryId) => {
    const product = await weKEADataSource.query(`
        SELECT
            p.name As productName,
            p.thumbnail As productThumbNail,
            p.category_id As categoryId,
            c.name AS categoryName,
            p.created_at AS productCreatedAt
        FROM products p
        INNER JOIN categories c ON p.category_id=c.id
        WHERE p.category_id=?;`,
        [categoryId]
    );

    const images = await weKEADataSource.query(`
        SELECT
            i.image_url
        FROM images i
        INNER JOIN products p ON i.product_id=p.id
        WHERE p.category_id=?;`,
        [categoryId]
    );

    const options = await weKEADataSource.query(`
        SELECT
            o.size,
            o.price,
            o.color
        FROM product_options o
        INNER JOIN products p ON o.product_id=p.id
        WHERE p.category_id=?;`,
        [categoryId]
    );

    product[0]['hoverImage']=images[0]['image_url'];
    product[0]['options'] = options[0];
    return product[0];
};

module.exports = {
    listInfo
}