const { wekeaDataSource } = require('./dataSource');

const getProductDetailById = async(id) => {
    const products = await wekeaDataSource.query(`
      SELECT
          products.id AS id,
          products.name AS name,
          products.thumbnail AS thumbnail,
          products.description AS description,
          categories.name AS category,
          pi.images,
          po.size,
          po.price,
          po.idAndColor
    FROM products
    INNER JOIN categories ON products.category_id=categories.id
    LEFT JOIN (
          SELECT
              product_id,
              JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id", id,
                        "url", image_url
                    ) 
              ) as images
              FROM images
              GROUP BY product_id
    ) pi ON products.id = pi.product_id
    LEFT JOIN(
          SELECT
              product_id,
              size,
              price,
              JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "productOptionId", id,
                        "color", color
                    )
              ) as idAndColor
          FROM product_options
          GROUP BY product_id, size, price
    ) po ON products.id=po.product_id
    WHERE products.id=?
    GROUP BY products.id, po.size, po.price`, [id]);
    return products[0];
};

module.exports = {
  getProductDetailById
}