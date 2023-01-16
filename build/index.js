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
        if (res.statusCode === 200) {
            res.status(500);
        }
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
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (id[0] != "u") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const clientExists = database_1.users.find((user) => user.id === id);
            if (clientExists) {
                res.status(400);
                throw new Error("'id' do usuário já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário deve ser informado.");
        }
        if (email !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(email) != true) {
                res.status(400);
                throw new Error("'email'do usuário em formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const emailExists = database_1.users.find((user) => user.email === email);
            if (emailExists) {
                res.status(400);
                throw new Error("'email' do usuário já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'email' do usuário deve ser informado.");
        }
        if (password !== undefined) {
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400);
                throw new Error("'password' do usuário em formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.");
            }
        }
        else {
            res.status(400);
            throw new Error("'password' do usuário deve ser informado.");
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
    try {
        const { id } = req.params;
        const newId = req.body.id;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            if (newId[0] != "u") {
                res.status(400);
                throw new Error("`id` do usuário inválido. Deve iniciar coma letra `u`");
            }
            if (newId.length < 5 || newId.length > 10) {
                res.status(400);
                throw new Error("`id`do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const idOldExists = database_1.users.find((user) => user.id == id);
            if (!idOldExists) {
                res.status(404);
                throw new Error("'id' do usuário não existe.");
            }
            const idOthersClienttExists = database_1.users.find((user) => user.id !== id && user.id === newId);
            if (idOthersClienttExists) {
                res.status(404);
                throw new Error("'id' do usuário já existente.");
            }
        }
        const newEmail = req.body.email;
        if (newEmail !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(newEmail) != true) {
                res.status(400);
                throw new Error("'email' do usuário no formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const mailOthersClienttExists = database_1.users.find((user) => user.id !== id && user.email === newEmail);
            if (mailOthersClienttExists) {
                res.status(400);
                throw new Error("'email' de usuário já existee.");
            }
        }
        const newPassword = req.body.password;
        if (newPassword !== undefined) {
            if (typeof newPassword != "string") {
                res.status(400);
                throw new Error("'password' deve ser string.");
            }
            if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400);
                throw new Error("'password' formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.");
            }
        }
        else {
            res.status(400);
            throw new Error("'password' deve ser informado.");
        }
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
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/user/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (id !== undefined) {
            if (id === ":id") {
                res.status(400);
                throw new Error("'id' do usuário não pode ser vazio.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (id[0] != "u") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário deve ser informado.");
        }
        const userInPurchase = database_1.purchases.filter((purchase) => {
            return purchase.userId === id;
        });
        if (userInPurchase.length > 0) {
            res.status(422);
            throw new Error(" 'id' cadastrado em uma 'purchases'");
        }
        const userIndex = database_1.users.findIndex((user) => {
            return user.id === id;
        });
        if (userIndex >= 0) {
            database_1.users.splice(userIndex, 1);
            res.status(200).send("Usuário apagado com sucesso");
        }
        else {
            res.send("User não encontrado");
        }
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
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
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            if (id[0] != "p") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
            }
            const idProductExists = database_1.products.find((product) => product.id === id);
            if (idProductExists) {
                res.status(400);
                throw new Error("'id' do produto já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do produto deve ser informado.");
        }
        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400);
                throw new Error("'name' do produto não pode ser vazio.");
            }
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("'name' do produto deve ser string.");
            }
        }
        else {
            res.status(400);
            throw new Error("'name' do produto deve ser informado.");
        }
        if (brand !== undefined) {
            if (brand.length < 1) {
                res.status(400);
                throw new Error("'brand' do produto não pode ser vazio.");
            }
            if (typeof brand !== "string") {
                res.status(400);
                throw new Error("'brand'do produto deve ser string.");
            }
        }
        else {
            res.status(400);
            throw new Error("'brand' do produto deve ser informado.");
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("'price' do produto deve ser number.");
            }
            if (price < 0) {
                res.status(400);
                throw new Error("'price' do produto não pode ser numero negativo.");
            }
        }
        else {
            res.status(400);
            throw new Error("'price' do produto deve ser informado.");
        }
        if (category !== undefined) {
            if (category.length < 1) {
                res.status(400);
                throw new Error("'category' do produto não pode ser vazio.");
            }
            if (typeof category != "string") {
                res.status(400);
                throw new Error("'category' do produto deve ser string.");
            }
            if (category !== types_1.PRODUCT_CATEGORY.HEADSET &&
                category !== types_1.PRODUCT_CATEGORY.PEN_DRIVE &&
                category !== types_1.PRODUCT_CATEGORY.WEBCAM) {
                res.status(400);
                throw new Error("'category' do produto deve ser do tipo válido (Headset, Pen Drive ou Webcam )");
            }
        }
        else {
            res.status(400);
            throw new Error("'category' do produto deve ser informado.");
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
    try {
        const { id } = req.params;
        if (id !== undefined) {
            if (id == ":id") {
                res.status(400);
                throw new Error("'id' do produto deve ser informado.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            if (id[0] != "p") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do produto deve ser informado.");
        }
        const result = database_1.products.find((product) => {
            return product.id === id;
        });
        if (!result) {
            res.status(404);
            throw new Error("'id'do produto não encontrado.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/product/search', (req, res) => {
    try {
        const q = req.query.q;
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("A busca de produto deve possuir pelo menos um caractere");
            }
            if (typeof q !== "string") {
                res.status(400);
                throw new Error("`A busca deve ser uma string");
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
    try {
        const { id } = req.params;
        const newId = req.body.id;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            if (newId[0] != "u") {
                res.status(400);
                throw new Error("`id` do produto inválido. Deve iniciar coma letra `p`");
            }
            if (newId.length < 5 || newId.length > 10) {
                res.status(400);
                throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres");
            }
            const idOldExists = database_1.products.find((product) => product.id == id);
            if (!idOldExists) {
                res.status(404);
                throw new Error("'id' do produto não existe.");
            }
            const idOthersProductstExists = database_1.users.find((user) => user.id !== id && user.id === newId);
            if (idOthersProductstExists) {
                res.status(404);
                throw new Error("'id' do produto já existente.");
            }
        }
        const newName = req.body.name;
        console.log(newName);
        if (newName !== undefined) {
            if (newName.length < 1) {
                res.status(400);
                throw new Error("'name' do produto não pode ser vazio.");
            }
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("'name' do produto deve ser string.");
            }
        }
        const newBrand = req.body.brand;
        if (newBrand !== undefined) {
            if (newBrand.length < 1) {
                res.status(400);
                throw new Error("'brand' do produto não pode ser vazio.");
            }
            if (typeof newBrand !== "string") {
                res.status(400);
                throw new Error("'brand'do produto deve ser string.");
            }
        }
        const newPrice = req.body.price;
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400);
                throw new Error("'price' do produto deve ser number.");
            }
            if (newPrice < 0) {
                res.status(400);
                throw new Error("'price' do produto não pode ser numero negativo.");
            }
        }
        const newCategory = req.body.category;
        if (newCategory !== undefined) {
            if (newCategory.length < 1) {
                res.status(400);
                throw new Error("'category' do produto não pode ser vazio.");
            }
            if (typeof newCategory !== "string") {
                res.status(400);
                throw new Error("'category' do produto deve ser string.");
            }
            if (newCategory !== types_1.PRODUCT_CATEGORY.HEADSET &&
                newCategory != types_1.PRODUCT_CATEGORY.PEN_DRIVE &&
                newCategory != types_1.PRODUCT_CATEGORY.WEBCAM) {
                res.status(400);
                throw new Error("'category' do produto deve ser do tipo válido (Headset, Pen Drive ou Webcam )");
            }
        }
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
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/product/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (id !== undefined) {
            if (id === ":id") {
                res.status(400);
                throw new Error("'id' do produto não pode ser vazio.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            if (id[0] != "p") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
            }
        }
        else {
            res.status(400);
            throw new Error(" 'id' deve ser informada.");
        }
        const productIndex = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        if (productIndex < 0) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        const productInPurchase = database_1.purchases.filter((purchase) => {
            return purchase.productId === id;
        });
        if (productInPurchase.length > 0) {
            res.status(422);
            throw new Error(" 'id' cadastrado em uma 'purchases'");
        }
        database_1.products.splice(productIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
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
            if (typeof userId !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (userId[0] != "u") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'");
            }
            if (userId.length < 5 || userId.length > 10) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const idUserExists = database_1.users.find((user) => user.id === userId);
            if (!idUserExists) {
                res.status(404);
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
                throw new Error("'quantity' do produto não pode ser vazio.");
            }
            if (typeof quantity !== "number") {
                res.status(400);
                throw new Error("'quantity' do produto deve ser number.");
            }
        }
        else {
            res.status(400);
            throw new Error("'quantity' do produto deve ser informado.");
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            if (productId[0] != "p") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'");
            }
            if (productId.length < 5 || productId.length > 10) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres");
            }
            const idProductExists = database_1.products.find((product) => product.id === productId);
            if (!idProductExists) {
                res.status(404);
                throw new Error("'id' do produto não  encontrado.");
            }
            if (totalPrice !== undefined) {
                if (typeof totalPrice !== "number") {
                    res.status(400);
                    throw new Error("'totalPrice' de compras deve ser number.");
                }
                if (totalPrice < 1) {
                    res.status(400);
                    throw new Error("'totalPrice' de compras não pode ser vazio.");
                }
            }
            else {
                res.status(400);
                throw new Error(" `totalPrice` deve ser informada.");
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
        res.status(201).send("Compra realizada com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const { id } = req.params;
        if (id !== undefined) {
            if (id === ":id") {
                res.status(400);
                throw new Error("'id' não pode ser vazio.");
            }
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (id[0] != "u") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const idUsertExists = database_1.users.find((user) => user.id === id);
            if (!idUsertExists) {
                res.status(404);
                throw new Error("'id' do usuário não encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error(" `id` do usuário deve ser informado.");
        }
        const result = database_1.purchases.filter((purchase) => {
            return purchase.userId === id;
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
//# sourceMappingURL=index.js.map