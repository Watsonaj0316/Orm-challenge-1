USE ecommerce_db;

INSERT INTO category (category_name) VALUES ('Shirts');
INSERT INTO category (category_name) VALUES ('Shoes');
INSERT INTO category (category_name) VALUES ('Shorts');
INSERT INTO category (category_name) VALUES ('Music');
INSERT INTO category (category_name) VALUES ('Hats');

INSERT INTO product (id, product_name, price, stock, category_id) VALUES (1, 'Plain T-Shirt', 14.99, 14, 1);
INSERT INTO product (id, product_name, price, stock, category_id) VALUES (7, 'Running Sneakers', 90.0, 25, 7);
INSERT INTO product (id, product_name, price, stock, category_id) VALUES (10, 'Branded Baseball Hat', 22.99, 12, 10);
INSERT INTO product (id, product_name, price, stock, category_id) VALUES (9, 'Top 40 Music Compilation Vinyl Record', 12.99, 50, 9);
INSERT INTO product (id, product_name, price, stock, category_id) VALUES (8, 'Cargo Shorts', 29.99, 22, 8);

INSERT INTO product_tag (product_id, tag_id) VALUES (1, 19);
INSERT INTO product_tag (product_id, tag_id) VALUES (7, 25);
INSERT INTO product_tag (product_id, tag_id) VALUES (10, 24);
INSERT INTO product_tag (product_id, tag_id) VALUES (9, 26);
INSERT INTO product_tag (product_id, tag_id) VALUES (8, 27);
INSERT INTO product_tag (product_id, tag_id) VALUES (null, 28);
INSERT INTO product_tag (product_id, tag_id) VALUES (null, 29);
INSERT INTO product_tag (product_id, tag_id) VALUES (null, 30);


INSERT INTO tag (tag_name) VALUES ('rock music');
INSERT INTO tag (tag_name) VALUES ('pop music');
INSERT INTO tag (tag_name) VALUES ('blue');
INSERT INTO tag (tag_name) VALUES ('red');
INSERT INTO tag (tag_name) VALUES ('green');
INSERT INTO tag (tag_name) VALUES ('white');
INSERT INTO tag (tag_name) VALUES ('gold');
INSERT INTO tag (tag_name) VALUES ('pop culture');
