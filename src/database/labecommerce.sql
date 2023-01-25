-- Active: 1673894729956@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
);
PRAGMA table_info('users');
PRAGMA table_info('products');
PRAGMA table_info('purchases');
INSERT INTO users (id, name, email, password)
VALUES (
        "user01",
        "albert einstein",
        "a-e@email.com",
        "S3nha1"
    ),
    (
        "user02",
        "isaac newton",
        "i-n@email.com",
        "S3nha2"
    ),
    (
        "user03",
        "marie curie",
        "m-c3@email.com",
        "S3nha3"
    ),
    ("user04", "hipatia", "h@email.com", "S3nha4"),
    (
        "user05",
        "nikola tesla",
        "n-t@email.com",
        "S3nha5"
    );
INSERT INTO products(id, name, price, description, image_url)
VALUES(
        "prod01",
        "Pen Drive",
        34,
        "32GB - Marca: SanDisk",
        "https://images.tcdn.com.br/img/img_prod/1086247/pen_drive_32gb_sandisk_925_1_42db72d97e5fba405db73ea4beb211ee.jpg"
    ),
    (
        "prod02",
        "Mousepad ",
        129,
        "Gamer - Marca: Havit",
        "https://ae01.alicdn.com/kf/Sd3e13c02875847bba0d6d339be570ffaD/Havit-mouse-pad-rgb-com-ilumina-o-de-fundo-14-grupos-de-luzes-base-antiderrapante-usb.jpg"
    ),
    (
        "prod03",
        "SSD",
        450,
        "960GB - Marca: Kingston",
        "https://m.media-amazon.com/images/I/61U9S05CePL.__AC_SX300_SY300_QL70_ML2_.jpg"
    ),
    (
        "prod04",
        "Suporte Monitor",
        200,
        "Articulado - Marca: Elg",
        "https://images.kabum.com.br/produtos/fotos/107363/suporte-para-monitor-elg-17-a-27-com-pistao-a-gas-altura-ajustavel-f80n_1661431261_g.jpg"
    ),
    (
        "prod05",
        "Hub",
        15,
        "USB, 7 portas - Marca: Lehmox",
        "https://www.mirao.com.br/media/catalog/product/cache/97a664217948b8375342e86c7b969be4/i/n/inshot_20210728_205131937.jpg"
    ),
    (
        "prod06",
        "SSD",
        250,
        "240GB - Marca: anDisk",
        "https://a-static.mlcdn.com.br/800x560/hd-ssd-240gb-sandisk-plus-530mb-s-g26-lacrado-nfe-envio-24h-kingston/infocomercio/3990214545/5d7f851641f5581a8c4bb4c7252e1d43.jpg"
    ),
    (
        "prod07",
        "Mouse",
        96,
        "Sem fio - Marca: Logitech",
        "https://img.kalunga.com.br/fotosdeprodutos/442788d.jpg"
    ),
    (
        "prod08",
        "Teclado",
        119,
        "Sem fio - Marca: Logitech",
        "https://waz.vteximg.com.br/arquivos/ids/162430-1000-1000/106769-1-teclado_sem_fio_logitech_wireless_k270_preto_cinza_920_004427_box-5.jpg?v=636404939771270000"
    ),
    (
        "prod09",
        "Chaveador KVM",
        1770,
        "8 PORTAS USB - Marca: TrendNet",
        "https://netcomputadores.com.br/dbimg/produtos/tk_803r_82401_m.jpg"
    ),
    (
        "prod10",
        "Mouse",
        60,
        "PS2 - Marca: HP",
        "https://m.media-amazon.com/images/I/31oZ5Au8RxL._AC_.jpg"
    ),
    (
        "prod11",
        "Mouse ",
        1195,
        "Trackball sem fio - Marca: Logitech",
        "https://m.media-amazon.com/images/I/71yGwsxf5UL._AC_SY450_.jpg"
    ),
    (
        "prod12",
        "Mouse",
        32,
        "USB - Marca: Logitech",
        "https://www.logitechstore.com.br/media/catalog/product/cache/1/image/634x545/9df78eab33525d08d6e5fb8d27136e95/9/1/910-001601.png"
    ),
    (
        "prod13",
        "Teclado",
        120,
        "USB - Marca: Dell",
        "https://i.dell.com/sites/csimages/Videos_Images/en/dell-multimedia-keyboard-kb216.jpg"
    ),
    (
        "prod14",
        "Hub",
        17000,
        " Usb 8 Plus Ethernet Rj45 - Marca: Anywhere",
        "https://cdn.awsli.com.br/1000x1000/86/86779/produto/133182569/cf89369879.jpg"
    ),
    (
        "prod15",
        "Rotulador",
        255,
        "Eletrônico - Marca: Brother",
        "https://img.kalunga.com.br/fotosdeprodutos/665204z.jpg"
    ),
    (
        "prod16",
        "Impressora",
        800,
        "Térmica - Marca: Epson",
        "https://static3.tcdn.com.br/img/img_prod/108620/impressora_termica_nao_fiscal_epson_tm_t20_ethernet_9593_1_20220523162205.jpg"
    ),
    (
        "prod17",
        "Leitor Código de Barras",
        650,
        "2D Cabo USB - Marca: HoneyWell",
        "https://cdn.sistemawbuy.com.br/arquivos/8d2a556cb6607a48c93c6f042e3a329b/produtos/HU8NU9/leitor-de-ca-digo-de-barras-2d-honeywell-youjie-hh660-1610.jpg"
    ),
    (
        "prod18",
        "Switch",
        650,
        " SG550x - 24 Portas - Marca: Cisco",
        "https://xtech.com.br/config/imagens_conteudo/produtos/imagensGRD/GRD_51266_switch-cisco-48-portas-SG550X-48-K9.png"
    ),
    (
        "prod19",
        "Crimpador",
        1950,
        "RJ45 CAT6  - Marca: Panduit",
        "https://netcomputadores.com.br/dbimg/produtos/mpt5_8as_26663_m.jpg"
    ),
    (
        "prod20",
        "Patch Cord",
        70,
        "RJ45 CAT6 4,2m azul  - Marca: Panduit",
        "https://netcomputadores.com.br/dbimg/produtos/utpsp14buy_27145_m.jpg"
    ),
    (
        "prod21",
        "Conector",
        40,
        "RJ45 Fêmea Cat 6 Branco - Marca: Panduit",
        "https://netcomputadores.com.br/dbimg/produtos/utpsp14buy_27145_m.jpg"
    ),
    (
        "prod22",
        "Testador",
        108,
        "C ontinuidade RJ11, RJ12 e RJ45 - Marca: Metaltex",
        "https://www.eletropecas.com/_uploads/ProdutoDestaque/ProdutoDestaque_19512_facebook.jpg"
    ),
    (
        "prod23",
        "WebCam",
        179,
        "C/ Microfone Embutido - Marca: Logitech",
        "https://img.kalunga.com.br/fotosdeprodutos/144755d.jpg"
    );
INSERT INTO purchases(id, buyer, total_price)
values("purc01", "user01", 346),
    ("purc02", "user02", 34),
    ("purc03", "user03", 179),
    ("purc04", "user04", 70),
    ("purc05", "user05", 40);
SELECT *
FROM purchases;
-- Get All Users
SELECT *
FROM users
ORDER BY name ASC;
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
WHERE name LIKE "%pad%";
--Create User
--Create Product
--Get Products by id
SELECT *
FROM products
WHERE id = "prod01";
-- Delete User by id
DELETE FROM users
WHERE id = 'id_U01';
--Delete Product by id
DELETE FROM products
WHERE id = 'prod01';
--Edit User by id
UPDATE users
SET email = "emailuser02@email.com"
WHERE id = 'id_U02';
--Edit Product by id
UPDATE products
SET price = 130
WHERE id = 'prod02';
SELECT *
FROM purchases;
UPDATE purchases
SET delivered_at = datetime('now')
WHERE id = "pur04";
SELECT *
FROM purchases
WHERE buyer_id = "user02";
SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "user01";
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ("purc01", "prod06", 1),
    ("purc01", "prod07", 1),
    ("purc02", "prod01", 1),
    ("purc03", "prod08", 1),
    ("purc03", "prod10", 1),
    ("purc04", "prod20", 3),
    ("purc06", "prod21", 1);
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ("purc06", "prod21", 2), ("purc06", "prod21", 1), ("purc06", "prod20", 3);
SELECT *
FROM purchases_products;
--SELECT * FROM purchases_products pp
--LEFT JOIN purchases pu ON pp.purchase_id = pu.id
--LEFT JOIN products pr ON pp.product_id = pr.id;
SELECT purchases_products.purchase_id AS purchaseId,
    purchases_products.product_id AS productId,
    products.name,
    purchases_products.quantity,
    products.price,
    purchases.total_price
FROM purchases_products
    LEFT JOIN products ON purchases_products.product_id = products.id
    LEFT JOIN purchases ON purchases_products.purchase_id = purchases.id;
DELETE FROM users
WHERE id = "id_p06";
SELECT purchases_products.purchase_id AS purchaseId,
    purchases.total_price,
    purchases.created_at,
    purchases.paid,
    purchases.buyer,
    users.email,
    users.name
FROM purchases_products
    LEFT JOIN products ON purchases_products.product_id = products.id
    LEFT JOIN purchases ON purchases_products.purchase_id = purchases.id
    LEFT JOIN users ON purchases_products.purchase_id = purchases.id;
SELECT purchases.id,
    purchases.total_price,
    purchases.created_at,
    purchases.paid,
    purchases.buyer,
    users.email,
    users.name
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id;
SELECT *
FROM purchases_products
    INNER JOIN products on purchases_products.product_id = products.id
WHERE purchases_products.purchase_id = "pur06";
SELECT *
FROM purchases_products;
DROP Table purchases_products;