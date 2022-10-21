const weKEADataSource = require('./dataSource');

const getCart = async () => {
    const [result] = await weKEADataSource.query(`
        SELECT
            u.id,
            p.id,
            p.name,
            p.thumbnail,
            p.description,
            o.size,
            o.price,
            o.color
        FROM carts c
        left join users u on products p
        left join p on produt_options o
    `)
    return result;
}

const deleteCart = async () => {
    const deleteCart = await weKEADataSource.query(`
    delete FROM carts
    where product_id
        OR (CASE When quantity=0 
            THEN
            delete FROM carts
            where product_id)
    `)
    return deleteCart;
}
module.exports = {
    getCart
}
