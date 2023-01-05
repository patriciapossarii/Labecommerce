"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "user1",
        email: "user1@email.com",
        password: "*****"
    }, {
        id: "user2",
        email: "user2@email.com",
        password: "*****"
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
exports.purchase = [
    {
        userId: "user1",
        productId: "prod2",
        quantity: 2,
        totalPrice: exports.products[0].price * 2
    },
    {
        userId: "user2",
        productId: "prod1",
        quantity: 2,
        totalPrice: exports.products[1].price * 2
    }
];
//# sourceMappingURL=database.js.map