-- Active: 1673873948015@@127.0.0.1@3306
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
SELECT *
FROM users;
SELECT *
FROM products;
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