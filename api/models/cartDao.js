const { weKEADataSource } = require('./dataSource');

const addCart = async (userId, productOptionId, quantity) => {
    const addCart = await weKEADataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOptionId, quantity]
    ) 
    return addCart.insertId;
};

const findCartId = async(userId, productOptionId) => {
    return await weKEADataSource.query(`
        SELECT 
            id
        FROM carts
        WHERE user_id=${userId} AND product_option_id=${productOptionId}; 
    `) 
}

const onePlusQuantity = async(findCartId) => {
    return await weKEADataSource.query(`
        UPDATE carts
        SET quantity = quantity + 1
        WHERE id =${findCartId};
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
};

const messageName = async (productOptionId) => {
    return await weKEADataSource.query(`
        SELECT name
        FROM products
        WHERE id=${productOptionId}
    `)
};

const cartQuantityChange = async (userId, productOptionId, quantity) => {
    const result = await weKEADataSource.query(`
        UPDATE carts
        SET quantity = ${quantity}
        WHERE user_id = ${userId} AND product_option_id = ${productOptionId}
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
    const oneDeleteCart = await weKEADataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id=${userId} AND c.product_option_id=${productOptionId}
    `)
    return oneDeleteCart;
};

module.exports = {
    addCart,
    findCartId,
    onePlusQuantity,
    getCart,
    messageName,
    cartQuantityChange,
    allDeleteCart,
    oneDeleteCart
}