"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
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
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('/product/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post('/products', (req, res) => {
    const { id, name, brand, price, category } = req.body;
    const newProduct = {
        id,
        name,
        brand,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post('/purchases', (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => {
        return product.id === id;
    });
    res.status(200).send(result);
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter((purchase) => {
        return purchase.userId === id;
    });
    res.status(200).send(result);
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
//# sourceMappingURL=index.js.map