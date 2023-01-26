"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getAllUsers_1 = __importDefault(require("./endpoints/users/getAllUsers"));
const createUser_1 = __importDefault(require("./endpoints/users/createUser"));
const editUserById_1 = __importDefault(require("./endpoints/users/editUserById"));
const deleteUserById_1 = __importDefault(require("./endpoints/users/deleteUserById"));
const getAllProducts_1 = __importDefault(require("./endpoints/products/getAllProducts"));
const createProduct_1 = __importDefault(require("./endpoints/products/createProduct"));
const getProductById_1 = __importDefault(require("./endpoints/products/getProductById"));
const getProductByName_1 = __importDefault(require("./endpoints/products/getProductByName"));
const editProductById_1 = __importDefault(require("./endpoints/products/editProductById"));
const deleteProductById_1 = __importDefault(require("./endpoints/products/deleteProductById"));
const getAllPurchases_1 = __importDefault(require("./endpoints/purchases/getAllPurchases"));
const createPurchase_1 = __importDefault(require("./endpoints/purchases/createPurchase"));
const getPurchasesByUserId_1 = __importDefault(require("./endpoints/purchases/getPurchasesByUserId"));
const getPurchaseById_1 = __importDefault(require("./endpoints/purchases/getPurchaseById"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get("/users", getAllUsers_1.default);
app.post("/users", createUser_1.default);
app.put("/user/:id", editUserById_1.default);
app.delete("/user/:id", deleteUserById_1.default);
app.get('/products', getAllProducts_1.default);
app.post('/products', createProduct_1.default);
app.get("/products/:id", getProductById_1.default);
app.get('/products/search', getProductByName_1.default);
app.put("/product/:id", editProductById_1.default);
app.delete("/product/:id", deleteProductById_1.default);
app.get('/purchases', getAllPurchases_1.default);
app.post('/purchases', createPurchase_1.default);
app.get("/users/:id/purchases", getPurchasesByUserId_1.default);
app.get("/purchases/:id", getPurchaseById_1.default);
//# sourceMappingURL=index.js.map