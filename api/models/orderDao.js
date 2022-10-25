const { weKEADataSource } = require('./dataSource');
const { orderStatusEnum } = require('./enums');

const getOrders = async(id) => {
    const getOrders = await weKEADataSource.query(`
        SELECT
            products.name AS name,
            o.id AS orderId,
            product_options.price AS price,
            o.created_at,
            o.updated_at,
            o.quantity,
            os.name AS orderStatus
        FROM orders o
        LEFT JOIN order_status os ON o.order_status_id=os.id
        INNER JOIN product_options ON o.product_option_id=product_options.id
        INNER JOIN products ON products.id=product_options.product_id
        WHERE o.user_id=?;`,[id]
    );
    return getOrders;
};

const checkPoints = async(id) => {
    const getPoints = await weKEADataSource.query(`
        SELECT
            point
        FROM users
        WHERE id=?;`,[id]
    );
    return getPoints[0].point;
};

const MoveCartToOrder = async(id, totalPrice) => {
    await weKEADataSource.query(`
        UPDATE users 
        SET
            point=point-?
        WHERE id=?;`,[totalPrice, id]
    );

    const userCarts = await weKEADataSource.query(`
        SELECT
            product_option_id,
            quantity
        FROM carts
        WHERE user_id=?;`,[id]
    );

    for(var i=0; i<userCarts.length; i++){
        await weKEADataSource.query(`
            INSERT INTO orders(
                user_id,
                product_option_id,
                quantity,
                order_status_id
            ) VALUES (?,?,?,?);`
            ,[id, userCarts[i].product_option_id, userCarts[i].quantity, orderStatusEnum.addOrder]
        );
    } 
    
    const deleteCarts = await weKEADataSource.query(`
        DELETE
        FROM carts
        WHERE user_id=?;`,[id]
    );
    return deleteCarts;
};

const checkOrderStatus = async(orderId) => {
    const orderStatus = await weKEADataSource.query(`
        SELECT
            order_status_id AS osi
        FROM orders
        WHERE id=?`,[orderId]
    );
    return orderStatus[0].osi;
};

const cancelOrders = async(userId, orderId, totalPrice) => {
    await weKEADataSource.query(`
        UPDATE users 
        SET
            point=point+?
        WHERE id=?;`,[totalPrice, userId]);

    const cancelOrders = await weKEADataSource.query(`
        UPDATE orders
        SET
            order_status_id=?
        WHERE id=?;`,[orderStatusEnum.cancelOrder, orderId]);
    return cancelOrders;
};

module.exports = {
    getOrders,
    checkPoints,
    MoveCartToOrder,
    checkOrderStatus,
    cancelOrders
}
