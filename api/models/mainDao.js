const weKEADataSource = require('./dataSource');

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
                    categories.name AS category
                 FROM products
                 INNER JOIN categories on products.category_id = categories.id
                 WHERE products.id=${id[i]}`                                     
                 );
            var images = await weKEADataSource.query(`
                SELECT
                    image_url AS image
                FROM images
                WHERE product_id =${id[i]}`
                );
            var product_options = await weKEADataSource.query(`
                SELECT
                    size,
                    price,
                    color
                FROM product_options
                WHERE product_id=${id[i]}`
                );
            products[0]['images']=images;
            products[0]['options']=product_options;
            result.push(products[0]);

        }
        return result;
    }

module.exports = {
    randomProducts
};