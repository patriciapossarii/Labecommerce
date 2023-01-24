"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
const types_1 = require("./types");
function createUser(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, brand, price, category) {
    const newProduct = {
        id,
        name,
        brand,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    for (var prod of exports.products) {
        if (prod.id === idToSearch) {
            return prod;
        }
    }
    return undefined;
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    for (var prod of exports.products) {
        if (prod.name.toLowerCase().includes(q.toLowerCase())) {
            return prod;
        }
    }
    return undefined;
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(q) {
    let filterPurchaseID = exports.purchases.filter((purchaseById) => {
        if (purchaseById.userId === q) {
            return exports.purchases;
        }
    });
    if (filterPurchaseID != null && filterPurchaseID.length > 0) {
        return filterPurchaseID;
    }
    else {
        return undefined;
    }
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
exports.users = [
    {
        id: "id_U01",
        name: "user01 user01",
        email: "user1@email.com",
        password: "S3nha"
    }, {
        id: "id_U02",
        name: "user02",
        email: "user2@email.com",
        password: "S3nha"
    }
];
exports.products = [
    {
        id: "prod1",
        name: "Pen Drive 32 GB",
        brand: "Sandisk",
        price: 53,
        category: types_1.PRODUCT_CATEGORY.PEN_DRIVE
    },
    {
        id: "prod2",
        name: "Headset USB",
        brand: "Logitech",
        price: 220,
        category: types_1.PRODUCT_CATEGORY.HEADSET
    }
];
exports.purchases = [
    {
        userId: "id_U01",
        productId: "prod2",
        quantity: 2,
        totalPrice: exports.products[1].price * 2
    },
    {
        userId: "id_U01",
        productId: "prod1",
        quantity: 3,
        totalPrice: exports.products[0].price * 3
    },
    {
        userId: "id_U02",
        productId: "prod1",
        quantity: 2,
        totalPrice: exports.products[0].price * 2
    }
];
//# sourceMappingURL=database.js.map