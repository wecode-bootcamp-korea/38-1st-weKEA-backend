-- migrate:up
CREATE TABLE orders(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     product_option_id INT NOT NULL,
     state VARCHAR(20) NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id),
     FOREIGN KEY (product_option_id) REFERENCES product_options(id)
);

-- migrate:down
DROP TABLE orders;