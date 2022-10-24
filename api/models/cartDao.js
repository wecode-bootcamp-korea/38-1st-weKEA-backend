const { weKEADataSource } = require('./dataSource');

const addCart = async (userId, productOId, quantity) => {
    console.log(userId, productOId, quantity)
    const addCart = await weKEADataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOId, quantity]
    ) 
    return addCart.insertId;
};

const findCartId = async(userId, productOId) => {
    return await weKEADataSource.query(`
        SELECT 
            id
        FROM carts
        WHERE user_id=${userId} AND product_option_id=${productOId}; 
    `) 
}

const updateCart = async(findCartId, quantity) => {
    return await weKEADataSource.query(`
        UPDATE carts
        SET quantity=${quantity}
        WHERE id=${findCartId};
    `)
};

const getCart = async (userId) => {
    const result = await weKEADataSource.query(`
        SELECT
            c.id,
            c.quantity,
            o.size,
            o.price,
            o.color,
            p.name,
            p.thumbnail,
            p.description
        FROM carts c
        INNER JOIN product_options o ON c.product_option_id = o.id 
        INNER JOIN products p ON o.product_id = p.id
        INNER JOIN users u ON c.user_id = u.id
        WHERE u.id = ${userId}       
    `)
    return result;
}

const allDeleteCart = async(userId) => {
    const allDeleteCart = await weKEADataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id = ${userId}
    `);
    return allDeleteCart;
}

const oneDeleteCart = async (userId, productOptionId) => {
    // const awaitUserId = await userID;
    // const awaitProductOptionId = await productOptionId;
    // console.log(userID,productOptionId)
    const oneDeleteCart = await weKEADataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id=${userId} AND c.product_option_id=${productOptionId}
    `)
    return oneDeleteCart;
};

module.exports = {
    addCart,
    findCartId,
    updateCart,
    getCart,
    allDeleteCart,
    oneDeleteCart
}