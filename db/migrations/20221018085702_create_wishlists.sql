-- migrate:up
CREATE TABLE wishlists(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     product_id INT NOT NULL,
     user_id INT NOT NULL,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE wishlists;

