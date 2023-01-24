"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`SELECT * FROM users`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'");
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const clientExists = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE id = "${id}";`);
            if (clientExists.length >= 1) {
                res.status(400);
                throw new Error("'id' do usuário já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário deve ser informado.");
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("name' do usuário deve ser string.");
            }
            if (name.length < 2) {
                res.status(400);
                throw new Error("'name' do usuário inválido. Deve conter no mínimo 2 caracteres");
            }
        }
        else {
            res.status(400);
            throw new Error("'name' do usuário deve ser informado.");
        }
        if (email !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(email) != true) {
                res.status(400);
                throw new Error("'email'do usuário em formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const emailExists = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE email = "${email}";`);
            if (emailExists.length >= 1) {
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
        yield knex_1.db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES("${id}", "${name}","${email}", "${password}")
        `);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.put("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newId = req.body.id;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            if (newId[0] != "u" || newId[1] != "s" || newId[2] != "e" || newId[3] != "r") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'");
            }
            if (newId.length < 5 || newId.length > 8) {
                res.status(400);
                throw new Error("`id`do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const [idOldExists] = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE id = "${newId}";`);
            console.log(idOldExists);
            if (!idOldExists) {
                res.status(404);
                throw new Error("'id' do usuário não existe.");
            }
            const [idOthersClienttExists] = yield knex_1.db.raw(`SELECT *
           FROM users
           WHERE id != "${newId}" 
           AND id="${newId}";`);
            console.log("2", idOthersClienttExists);
            if (idOthersClienttExists) {
                res.status(404);
                throw new Error("'id' do usuário já existente.");
            }
        }
        const newName = req.body.name;
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("name' do usuário deve ser string.");
            }
            if (newName.length < 2) {
                res.status(400);
                throw new Error("'name' do usuário inválido. Deve conter no mínimo 2 caracteres");
            }
        }
        const newEmail = req.body.email;
        if (newEmail !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(newEmail) != true) {
                res.status(400);
                throw new Error("'email' do usuário no formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const [mailOthersClienttExists] = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE id != "${newId}" 
            AND email = "${newEmail}";`);
            if (mailOthersClienttExists) {
                res.status(400);
                throw new Error("'email' de usuário já existe.");
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
        const [user] = yield knex_1.db.raw(`SELECT *
           FROM users
           WHERE id = "${newId}";`);
        if (user) {
            yield knex_1.db.raw(`
            UPDATE users 
            SET 
            id = "${newId || user.id}",
            name = "${newName || user.name}",
            email = "${newEmail || user.email}",
            password = "${newPassword || user.password}"
            WHERE id = "${id}";
            `);
            res.status(200).send("Cadastro atualizado com sucesso");
        }
        else {
            res.status(404).send("Usuário não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`SELECT * FROM products;`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, image_url } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' do produto deve ser string.");
            }
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'");
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
            }
            const idProductExists = yield knex_1.db.raw(`SELECT *
            FROM products
            WHERE id = "${id}";`);
            if (idProductExists.length >= 1) {
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
        if (description !== undefined) {
            if (description.length < 1) {
                res.status(400);
                throw new Error("'description' do produto não pode ser vazio.");
            }
            if (typeof description !== "string") {
                res.status(400);
                throw new Error("'description'do produto deve ser string.");
            }
        }
        else {
            res.status(400);
            throw new Error("'description' do produto deve ser informado.");
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
        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400);
                throw new Error("'image_url' do produto deve ser string.");
            }
            if (image_url.length < 1) {
                res.status(400);
                throw new Error("'image_url' do produto não pode ser vazio.");
            }
        }
        else {
            res.status(400);
            throw new Error("'image_url' do produto deve ser informado.");
        }
        yield knex_1.db.raw(`
        INSERT INTO products(id, name, price, description, image_url)
        VALUES("${id}","${name}", ${price}, "${description}","${image_url}")`);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'");
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
        const result = yield knex_1.db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`);
        console.log(result);
        if (result.length === 0) {
            res.status(404);
            throw new Error("'id'do produto não encontrado.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/product/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q !== undefined) {
            if (typeof q !== "string") {
                res.status(400);
                throw new Error("`A busca deve ser uma string");
            }
            if (q.length < 1) {
                res.status(400);
                throw new Error("A busca de produto deve possuir pelo menos um caractere");
            }
        }
        const result = yield knex_1.db.raw(`SELECT *
       FROM products
       WHERE name LIKE "%${q}%";`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.delete("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'");
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
            }
        }
        else {
            res.status(400);
            throw new Error(" 'id' deve ser informada.");
        }
        const productIndex = yield knex_1.db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`);
        if (productIndex.length === 0) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        const productInPurchase = yield knex_1.db.raw(`SELECT *
        FROM purchases_products
        WHERE product_id = "${id}";`);
        if (productInPurchase.length > 0) {
            res.status(422);
            throw new Error(" 'id' cadastrado em uma 'purchases'");
        }
        yield knex_1.db.raw(`DELETE FROM products
      WHERE id = "${id}";`);
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`SELECT * FROM purchases;`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, total_price } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' da compra deve ser string.");
            }
            if (id[0] != "p" || id[1] != "u" || id[2] != "r" || id[3] != "c") {
                res.status(400);
                throw new Error("'id' da compra inválido. Deve iniciar com 'purc'");
            }
            8;
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' da compra inválido. Deve conter de 5 a 8 caracteres");
            }
            const idUserExists = yield knex_1.db.raw(`SELECT *
            FROM purchases
            WHERE id = "${id}";`);
            if (idUserExists.length >= 1) {
                res.status(404);
                throw new Error("'id' da compra já existente.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' da compra  deve ser informado.");
        }
        if (buyer !== undefined) {
            if (typeof buyer !== "string") {
                res.status(400);
                throw new Error("'id' do usuário deve ser string.");
            }
            if (buyer[0] != "u" || buyer[1] != "s" || buyer[2] != "e" || buyer[3] != "r") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'");
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const idUserExists = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE id = "${buyer}";`);
            if (idUserExists.length < 1) {
                res.status(404);
                throw new Error("'id' do usuário  não  encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário  deve ser informado.");
        }
        if (total_price !== undefined) {
            if (total_price < 1) {
                res.status(400);
                throw new Error("'total_price ' do produto não pode ser vazio.");
            }
            if (typeof total_price !== "number") {
                res.status(400);
                throw new Error("'total_price' do produto deve ser number.");
            }
        }
        else {
            res.status(400);
            throw new Error("'total_price ' do produto deve ser informado.");
        }
        yield knex_1.db.raw(`
        INSERT INTO purchases(id, buyer, total_price)
        values("${id}", "${buyer}", ${total_price})
        `);
        res.status(201).send("Compra cadastrada com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'");
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres");
            }
            const idUsertExists = yield knex_1.db.raw(`SELECT *
            FROM users
            WHERE id = "${id}";`);
            console.log(idUsertExists);
            if (idUsertExists.length === 0) {
                res.status(404);
                throw new Error("'id' do usuário não encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error(" `id` do usuário deve ser informado.");
        }
        const result = yield knex_1.db.raw(`SELECT *
        FROM purchases
        WHERE buyer = "${id}";`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map