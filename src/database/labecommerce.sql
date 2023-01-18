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
INSERT INTO products(id, name, brand, price, category)
values(
        "prod01",
        "Pen Drive 32GB",
        "SanDisk",
        34,
        "Pen Drive"
    ),
    (
        "prod02",
        "Mousepad Gamer",
        "Havit",
        129,
        "Mousepad"
    ),
    ("prod03", "SSD 960GB", "Kingston", 450, "SSD"),
    (
        "prod04",
        "Suporte Monitor",
        "Elg",
        200,
        "Suporte"
    ),
    (
        "prod05",
        "Hub USB, 7 portas",
        "Husky",
        60,
        "Hub"
    );
INSERT INTO products(id, name, brand, price, category)
values ("prod07", "SSD 240GB", "Crucial", 175, "SSD"),
    (
        "prod08",
        "Mouse sem fio",
        "Logitech",
        79,
        "Mouse"
    ),
    (
        "prod09",
        "Teclado sem fio",
        "Logitech",
        683,
        "Teclado"
    ),
    ("prod10", "Mouse PS2", "Vinik", 25, "Mouse"),
    ("prod11", "Mouse USB", "Logitech", 32, "Mouse"),
    ("prod12", "Teclado USB", "HP", 108, "Teclado"),
    (
        "prod13",
        "Chaveador KVM 8 Portas",
        "Trendnet",
        2500,
        "Chaveador"
    ),
    (
        "prod14",
        "Hub Usb 8 Plus Ethernet Rj45",
        "Anywhere",
        17000,
        "Hub"
    ),
    (
        "prod15",
        "Rotulador Eletronico",
        "Epson",
        255,
        "Rotulador"
    ),
    (
        "prod16",
        "Impressora Termica",
        "Epson",
        700,
        "Impressora Térmica"
    ),
    (
        "prod17",
        "Leitor Código de Barras - 2D",
        "Motorolla",
        700,
        "Leitor de código de barra"
    ),
    (
        "prod18",
        "Switch SG550x - 24 Portas",
        "Cisco",
        22000,
        "Switch"
    ),
    ("prod19", "Tablet", "Sanssung", 2889, "Tablet"),
    ("prod20", "Cabo HDMI MxM", "PIX", 39, "Cabo"),
    (
        "prod21",
        "Cabo HDMI M  x VGA M",
        "SanDisk",
        20,
        "Cabo"
    ),
    ("prod22", "Monitor 18.5", "Dell", 622, "Monitor");
-- Get All Users
SELECT *
FROM users
ORDER BY email ASC;
-- Get All Products
SELECT *
FROM products;
-- Get All Products V1 - ordenando preço em crescente e resultado a partir do primeiro item até 20.
SELECT *
FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 1;
-- Get All Products V2 - Produtos com intervalo de valores
SELECT *
FROM products
WHERE price >= 50
    AND price <= 200
ORDER BY price ASC;
-- Search Product by name
SELECT *
FROM products
WHERE name LIKE "%Cabo%";
--Create User
INSERT INTO users (id, email, password)
values("user04", "user04@email.com", "S3nha4");
--Create Product
INSERT INTO products(id, name, brand, price, category)
values(
        "prod06",
        "Pen Drive 16GB",
        "SanDisk",
        30,
        "Pen Drive"
    );
--Get Products by id
SELECT *
FROM products
WHERE id = "prod01";
-- Delete User by id
DELETE FROM users
WHERE id = 'user01';
--Delete Product by id
DELETE FROM products
WHERE id = 'prod01';
--Edit User by id
UPDATE users
SET email = "emailuser02@email.com"
WHERE id = 'user02';
--Edit Product by id
UPDATE products
SET price = 130
WHERE id = 'prod02';
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

INSERT INTO purchases(id,total_price, paid, buyer_id)
values("pur01", 60, 0, "user02"),
("pur02", 20, 0, "user02"),
("pur03", 700, 0, "user01"),
("pur04", 108, 0, "user01"),
("pur05", 25, 0, "user02")
;

SELECT * FROM purchases;
UPDATE purchases
SET delivered_at = datetime('now')
WHERE id="pur04";

SELECT * FROM purchases
WHERE buyer_id = "user02";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "user01";

