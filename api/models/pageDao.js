const { weKEADataSource } = require('./dataSource');

const productDetail = async(id) => {
    const productDetails = await weKEADataSource.query(`
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
     const productImages = await weKEADataSource.query(`
        SELECT
          id,
          image_url
        FROM images
        WHERE product_id=?;`,[id]
     );
     const productOptions = await weKEADataSource.query(`
        SELECT
          size,
          price
        FROM product_options
        WHERE product_id=?;`, [id]
     );
     const productOptionColor = await weKEADataSource.query(`
        SELECT
          color
        FROM product_options
        WHERE product_id=?;`, [id]
     );

     productOptions[0]['color']=[];
     productOptions[0].color.push(productOptionColor[0].color, productOptionColor[1].color);

     productDetails[0]['images']=productImages;
     productDetails[0]['options']=productOptions[0];

     return productDetails[0];
};

module.exports = {
    productDetail
}