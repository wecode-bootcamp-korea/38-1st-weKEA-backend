const { weKEADataSource } = require('./dataSource');

const addWishlist = async (userId, productId, quantity) => {
    const addWishlist = await weKEADataSource.query(`
        INSERT INTO wishlists(
            user_id,
            product_id,
            quantity
        ) values(?,?,?);`,[userId, productId, quantity]
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

const updateWishlist = async(findWishlistId, quantity) => {
    return await weKEADataSource.query(`
        UPDATE wishlists
        SET quantity=${quantity}
        WHERE id=${findWishlistId};
    `)
};

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
        INNER JOIN product_options o ON p.product_option_id = o.id 
        WHERE u.id = ${userId}
    `)
    return result;
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

module.exports = {
    addWishlist,
    findWishlistId,
    updateWishlist,
    getWishlist,
    allDeleteWishlist,
    oneDeleteWishlist
}