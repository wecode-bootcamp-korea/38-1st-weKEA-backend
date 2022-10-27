const { wekeaDataSource } = require('./dataSource');

    const getRandomProducts = async () => {
        const id = [];
        let count = 4;
        
        while(count>0){
           id.push(Math.floor(Math.random() * 50)+1);
           count--;
        };

        const result =[];
        for(let i=0;i<id.length;i++){
            var products = await wekeaDataSource.query(`
                SELECT 
                    products.name,
                    products.thumbnail,
                    products.description,
                    categories.name,
                    images,
                    product_options
                FROM products
                LEFT JOIN categories on products.category_id=categories.id
                LEFT JOIN (
                    SELECT
                        product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            "id", id,
                            "url", image_url
                        )
                    ) as images
                    FROM
                        images
                    GROUP BY product_id
                ) images ON products.id=images.product_id
                LEFT JOIN (
                    SELECT 
                        product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            "size", size,
                            "price", price,
                            "color", color
                        )
                    ) as product_options
                    FROM
                        product_options
                    GROUP BY product_id
                ) product_options ON products.id=product_options.product_id
                WHERE products.id=${id[i]}
                GROUP BY products.id;`
            )   
            result.push(products);

        }
        return result;
    }


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
    getRandomProducts,
    getProductDetailById
}
