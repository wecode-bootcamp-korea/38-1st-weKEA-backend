const { weKEADataSource } = require('./dataSource');

const getOrders = async(id) => {
    return await weKEADataSource.query(`
        SELECT
            products.name AS name,
            product_options.price AS price,
            o.created_at,
            o.updated_at,
            o.quantity,
            os.name
        FROM orders o
        LEFT JOIN order_status os ON o.order_status_id=os.id
        INNER JOIN product_options ON o.product_option_id=product_options.id
        INNER JOIN products ON products.id=product_options.product_id
        WHERE o.user_id=?;`,[id]
    );
};

module.exports = {
    getOrders
}
