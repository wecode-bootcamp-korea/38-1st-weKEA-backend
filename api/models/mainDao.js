const { weKEADataSource } = require('./dataSource');

    const randomProducts = async () => {
        const id = [];
        let count = 10;
        
        while(count>0){
           id.push(Math.floor(Math.random() * 50)+1);
           count--;
        };

        const result =[];
        for(let i=0;i<id.length;i++){
            var products = await weKEADataSource.query(`
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

module.exports = {
    randomProducts
};
