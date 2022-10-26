const { weKEADataSource } = require('./dataSource');

const addWishlist = async (userId, productId) => {
    const addWishlist = await weKEADataSource.query(`
        INSERT INTO wishlists(
            user_id,
            product_id
        ) values(?,?);`,[userId, productId]
    ) 
    return addWishlist.insertId;
};

const findWishlistId = async(userId, productId) => {
    return await weKEADataSource.query(`
        SELECT 
            id
        FROM wishlists
        WHERE user_id=${userId} AND product_id=${productId}; 
    `) 
}

// const updateWishlist = async(findWishlistId, quantity) => {
//     return await weKEADataSource.query(`
//         UPDATE wishlists
//         SET quantity=${quantity}
//         WHERE id=${findWishlistId};
//     `)
// };

const getWishlist = async (userId) => {
    const result = await weKEADataSource.query(`
        SELECT
            w.id,
            o.size,
            o.price,
            o.color,
            p.name,
            p.thumbnail,
            p.description
        FROM wishlists w
        INNER JOIN users u ON w.user_id = u.id
        INNER JOIN products p ON w.product_id = p.id
        INNER JOIN product_options o ON p.id = o.product_id 
        WHERE u.id = ${userId}
    `)
    return result;
}
const addCart = async(userId, productId) => {
    await weKEADataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id
        ) VALUES (?, ?)
        WHERE carts.user_id = wishlists.user_id `,
        [userId, productId]
        )
}

const allDeleteWishlist = async(userId) => {
    const allDeleteWishlist = await weKEADataSource.query(`
        DELETE FROM wishlists w
        WHERE w.user_id = ${userId}
    `);
    return allDeleteWishlist;
}

const oneDeleteWishlist = async (userId, productId) => {
    const oneDeleteWishlist = await weKEADataSource.query(`
        DELETE FROM wishlists w
        WHERE w.user_id=${userId} AND w.product_id=${productId}
    `)
    return oneDeleteWishlist;
};

const messageName = async (productId) => {
    return await weKEADataSource.query(`
        SELECT name
        FROM products
        WHERE id=${productId}
    `)
};

module.exports = {
    addWishlist,
    findWishlistId,
    // updateWishlist,
    getWishlist,
    addCart,
    allDeleteWishlist,
    oneDeleteWishlist,
    messageName
}