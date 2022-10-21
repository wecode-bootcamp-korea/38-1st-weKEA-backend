const { weKEADataSource } = require('./dataSource');

// data 요청사항 @list-page
const productInfo = async (categoryId) => {
    const products = await weKEADataSource.query(`
        SELECT
            p.name As productName,
            p.thumbnail AS productThumbNail,
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
            o.price
        FROM product_options o
        INNER JOIN products p ON o.product_id=p.id
        WHERE p.category_id=?;`,
        [categoryId]
    );

    for (let i=0; i < products.length; i++) {
        products[i]['productHoverImage']=images[0]['image_url'];
        products[i]['productPrice'] = options[0]['price'];
    }

    return products;
};

const categoryInfo = async(categoryId) => {
    const category = await weKEADataSource.query(`
        SELECT
            p.category_id AS categoryId,
            c.name AS categoryName
        FROM products p
        INNER JOIN categories c ON p.category_id=c.id
        WHERE p.category_id=?;`,
        [categoryId]
    );

    return category[0];
};

const listInfo = async (categoryId) => {
    const totalInfo = {};
    totalInfo['category'] = await categoryInfo(categoryId);
    totalInfo['products'] = await productInfo(categoryId);
    return totalInfo;
};

module.exports = {
    listInfo
}