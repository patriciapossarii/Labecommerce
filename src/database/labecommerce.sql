-- Active: 1673894729956@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);
PRAGMA table_info('users');
PRAGMA table_info('products');


INSERT INTO users (id, email, password)
values("user01", "user01@email.com", "S3nha1"),
    ("user02", "user02@email.com", "S3nha2"),
    ("user03", "user03@email.com", "S3nha3");

INSERT INTO products(id,name,brand,price,category)
values("prod01", "Pen Drive 32GB", "SanDisk", 34, "Pen Drive"),
("prod02", "Mousepad Gamer", "Havit", 129, "Mousepad"),
("prod03", "SSD 960GB", "Kingston", 450, "SSD"),
("prod04", "Suporte Monitor", "Elg", 200, "Suporte"),
("prod05", "Hub USB, 7 portas", "Husky", 60, "Hub");

-- Get All Users
SELECT *
FROM users;

-- Get All Products
SELECT *
FROM products;

-- Search Product by name
SELECT * FROM products
WHERE name = "Pen Drive 32GB";

--Create User
INSERT INTO users (id, email, password)
values("user04", "user04@email.com", "S3nha4");

--Create Product
INSERT INTO products(id,name,brand,price,category)
values("prod06", "Pen Drive 16GB", "SanDisk", 30, "Pen Drive");

--Get Products by id
SELECT * FROM products
WHERE id = "prod01";

-- Delete User by id
DELETE FROM users
WHERE id = 'user01';


