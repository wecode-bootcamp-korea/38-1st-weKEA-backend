const { weKEADataSource } = require('./dataSource');

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

const checkPoints = async(id, totalPrice) => {
    const getPoints = await weKEADataSource.query(`
        SELECT
            point
        FROM users
        WHERE id=${id};
    `);
    if(getPoints[0].point<totalPrice){
        const error = new Error('Not_Enough_Points');
        error.statusCode = 400;

        throw error
    };
    await weKEADataSource.query(`
        UPDATE users 
        SET
            point=point-${totalPrice}
        WHERE id=${id};
    `);
};

const MoveCartToOrder = async(id) => {
    const userCarts = await weKEADataSource.query(`
        SELECT
            product_option_id,
            quantity
        FROM carts
        WHERE user_id=${id};
    `);

    for(var i=0; i<userCarts.length; i++){
        await weKEADataSource.query(`
            INSERT INTO orders(
                user_id,
                product_option_id,
                quantity,
                order_status_id
            ) VALUES (?,?,?,?);`
            ,[id, userCarts[i].product_option_id, userCarts[i].quantity, 1]
        );
    } 
    
    const deleteCarts = await weKEADataSource.query(`
        DELETE
        FROM carts
        WHERE user_id=${id};
    `);
    return deleteCarts;
};

const removeOrders = async(userId, orderId, totalPrice) => {
    await weKEADataSource.query(`
        UPDATE users 
        SET
            point=point+${totalPrice}
        WHERE id=${userId};
    `);

    const deleteOrders = await weKEADataSource.query(`
        DELETE
        FROM orders
        WHERE id=${orderId}
    `);
    return deleteOrders;
};


module.exports = {
    getOrders,
    checkPoints,
    MoveCartToOrder,
    removeOrders
}
