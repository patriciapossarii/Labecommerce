"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.post('/users', (req, res) => {
    try {
        const { id, email, password } = req.body;
        const newUser = {
            id,
            email,
            password
        };
        if (id !== undefined) {
            if (id.length < 1) {
                res.status(400);
                throw new Error("'id' não pode ser vazio.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            const clientExists = database_1.users.find((user) => user.id === id);
            if (clientExists) {
                res.status(400);
                throw new Error("'id' já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' deve ser informado.");
        }
        if (email !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(email) != true) {
                res.status(400);
                throw new Error("'email' no formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const emailExists = database_1.users.find((user) => user.email === email);
            if (emailExists) {
                res.status(400);
                throw new Error("'email' já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'email' deve ser informado.");
        }
        if (password !== undefined) {
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400);
                throw new Error("'password' formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.");
            }
        }
        else {
            res.status(400);
            throw new Error("'password' deve ser informado.");
        }
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/user/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const user = database_1.users.find((user) => {
        return user.id === id;
    });
    if (user) {
        user.id = newId || user.id;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    else {
        res.status(404).send("Usuário não encontrado");
    }
});
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    console.log("index", userIndex);
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
        res.status(200).send("User apagado com sucesso");
    }
    else {
        res.send("User não encontrado");
    }
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.post('/products', (req, res) => {
    try {
        const { id, name, brand, price, category } = req.body;
        const newProduct = {
            id,
            name,
            brand,
            price,
            category
        };
        console.log(newProduct);
        if (id !== undefined) {
            if (id.length < 1) {
                res.status(400);
                throw new Error("'id' não pode ser vazio.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            const idProductExists = database_1.products.find((product) => product.id === id);
            if (idProductExists) {
                res.status(400);
                throw new Error("'id' já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' deve ser informado.");
        }
        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400);
                throw new Error("'name' não pode ser vazio.");
            }
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("'name' deve ser string.");
            }
        }
        else {
            res.status(400);
            throw new Error("'name' deve ser informado");
        }
        if (brand !== undefined) {
            if (brand.length < 1) {
                res.status(400);
                throw new Error("`brand` não pode ser vazio.");
            }
            if (typeof brand !== "string") {
                res.status(400);
                throw new Error("'brand' deve ser string.");
            }
        }
        else {
            res.status(400);
            throw new Error("'brand' deve ser informado.");
        }
        if (price !== undefined) {
            if (price < 0) {
                res.status(400);
                throw new Error("`price` não pode ser numero negativo.");
            }
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("`price` deve ser number.");
            }
        }
        else {
            res.status(400);
            throw new Error("`price` deve ser informado.");
        }
        if (category !== undefined) {
            if (category.length < 1) {
                res.status(400);
                throw new Error("`category` não pode ser vazio.");
            }
            if (category !== types_1.PRODUCT_CATEGORY.HEADSET &&
                category !== types_1.PRODUCT_CATEGORY.PEN_DRIVE &&
                category !== types_1.PRODUCT_CATEGORY.WEBCAM) {
                res.status(400);
                throw new Error("`category` deve ser de um tipo válido (Headset, Pen Drive ou Webcam )");
            }
        }
        else {
            res.status(400);
            throw new Error(" `category` deve ser informada.");
        }
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => {
        return product.id === id;
    });
    res.status(200).send(result);
});
app.get('/product/search', (req, res) => {
    try {
        const q = req.query.q;
        if (q !== undefined) {
            if (q.length <= 1) {
                res.status(400);
                throw new Error("A busca de produto deve possuir pelo menos um caractere");
            }
            if (typeof q !== "string") {
                res.status(400);
                throw new Error("`Query deve ser uma string");
            }
        }
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        res.status(200).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newBrand = req.body.brand;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = database_1.products.find((product) => {
        return product.id === id;
    });
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.brand = newBrand || product.brand;
        product.price = isNaN(newPrice) ? product.price : newPrice;
        product.category = newCategory || product.category;
        res.status(200).send("Produto atualizado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    }
    else {
        res.send("Produto não encontrado");
    }
});
app.get('/purchases', (req, res) => {
    try {
        res.status(200).send(database_1.purchases);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.post('/purchases', (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        if (userId !== undefined) {
            if (userId.length < 1) {
                res.status(400);
                throw new Error("'id' do usuário não pode ser vazio.");
            }
            if (typeof userId !== "string") {
                res.status(400);
                throw new Error("'id' do usuário  deve ser string.");
            }
            const idUserExists = database_1.users.find((user) => user.id === userId);
            if (!idUserExists) {
                res.status(400);
                throw new Error("'id' do usuário  não  encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário  deve ser informado.");
        }
        if (quantity !== undefined) {
            if (quantity < 1) {
                res.status(400);
                throw new Error("'quantity' não pode ser vazio.");
            }
            if (typeof quantity !== "number") {
                res.status(400);
                throw new Error("'quantity' deve ser number.");
            }
        }
        else {
            res.status(400);
            throw new Error("'quantity' do produto deve ser informado.");
        }
        if (productId !== undefined) {
            if (productId.length < 1) {
                res.status(400);
                throw new Error("'id' do produto  não pode ser vazio.");
            }
            if (typeof productId !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            const idProductExists = database_1.products.find((product) => product.id === productId);
            if (!idProductExists) {
                res.status(400);
                throw new Error("'id' do produto não  encontrado.");
            }
            if (typeof totalPrice !== "number") {
                res.status(400);
                throw new Error("'totalPrice' deve ser number.");
            }
            if (totalPrice < 1) {
                res.status(400);
                throw new Error("'totalPrice' não pode ser vazio.");
            }
            if (totalPrice !== idProductExists.price * quantity) {
                res.status(400);
                throw new Error("'totalPrice' calculo de valor divergente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id do produto deve ser informado.");
        }
        database_1.purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter((purchase) => {
        return purchase.userId === id;
    });
    res.status(200).send(result);
});
//# sourceMappingURL=index.js.map