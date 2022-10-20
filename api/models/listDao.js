const { weKEADataSource } = require('./dataSource');

const listInfo = async (categoryId) => {
    const product = await weKEADataSource.query(`
        SELECT
            p.name,
            p.thumbnail,
            p.category_id,
            c.name
            p.created_at
        FROM products p
        JOIN categories c ON p.category_id=c.name
        WHERE category_id=?;`,
        [categoryId]
    );

    console.log(product);
    return product;

}

module.exports = {
    listInfo
}