const { wekeaDataSource } = require('./dataSource');

const getProductDetailById = async(id) => {
    const products = await wekeaDataSource.query(`
        SELECT
            products.id AS id,
            products.name AS name,
            products.thumbnail AS thumbnail,
            products.description AS description,
            categories.name AS category
        FROM products
        INNER JOIN categories ON products.category_id=categories.id
        WHERE products.id=?;`,[id]
    );
     const productImages = await wekeaDataSource.query(`
        SELECT
          id,
          image_url AS url
        FROM images
        WHERE product_id=?;`,[id]
     );
     const productOptions = await wekeaDataSource.query(`
        SELECT
          size,
          price
        FROM product_options
        WHERE product_id=?;`, [id]
     );
     const productOptionColor = await wekeaDataSource.query(`
        SELECT
          color
        FROM product_options
        WHERE product_id=?;`, [id]
     );

     productOptions[0]['color']=[];
     productOptions[0].color.push(productOptionColor[0].color, productOptionColor[1].color);

     products[0]['images']=productImages;
     products[0]['options']=productOptions[0];

     return products[0];
};

module.exports = {
  getProductDetailById
}