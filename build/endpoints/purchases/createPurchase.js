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
const knex_1 = require("../../database/knex");
const moment_1 = __importDefault(require("moment"));
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, item } = req.body;
        let productIdAndQuantity = item;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' da compra deve ser string.");
            }
            if (id[0] != "p" || id[1] != "u" || id[2] != "r" || id[3] != "c") {
                res.status(400);
                throw new Error("'id' da compra inválido. Deve iniciar com 'purc'");
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400);
                throw new Error("'id' da compra inválido. Deve conter de 5 a 8 caracteres");
            }
            const [idPurchaseExists] = yield (0, knex_1.db)("purchases").where({ id: id });
            if (idPurchaseExists) {
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
            const idUserExists = yield (0, knex_1.db)("users").where({ id: buyer });
            if (idUserExists.length < 1) {
                res.status(404);
                throw new Error("'id' do usuário  não  encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error("'id' do usuário  deve ser informado.");
        }
        let purchaseProductId = [];
        let total = 0;
        for (let i of productIdAndQuantity) {
            const [product] = yield (0, knex_1.db)("products").where({ id: i.product_Id });
            if (i.product_Id !== undefined) {
                if (i.product_Id == ":id") {
                    res.status(400);
                    throw new Error("'id' do produto deve ser informado.");
                }
                if (typeof i.product_Id !== "string") {
                    res.status(400);
                    throw new Error("'id' do produto deve ser string.");
                }
                if (i.product_Id[0] != "p" || i.product_Id[1] != "r" || i.product_Id[2] != "o" || i.product_Id[3] != "d") {
                    res.status(400);
                    throw new Error("'id' do produto inválido. Deve iniciar com 'prod'");
                }
                if (i.product_Id.length < 5 || i.product_Id.length > 8) {
                    res.status(400);
                    throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.");
                }
                const idProductExists = yield (0, knex_1.db)("products").where({ id: i.product_Id });
                if (idProductExists.length < 1) {
                    res.status(404);
                    throw new Error("'id' do produto  não  encontrado.");
                }
            }
            else {
                res.status(400);
                throw new Error("'id' do produto deve ser informado.");
            }
            if (i.quantity !== undefined) {
                if (typeof i.quantity !== "number") {
                    res.status(400);
                    throw new Error("'quantity'' do produto deve ser number.");
                }
                if (i.quantity <= 0) {
                    res.status(400);
                    throw new Error("'quantity' do produto inválido. Deve ser >=1.");
                }
            }
            else {
                res.status(400);
                throw new Error("'quantity' do produto deve ser informado.");
            }
            total += i.quantity * product.price;
            let b = {
                purchase_id: id,
                product_id: i.product_Id,
                quantity: i.quantity
            };
            purchaseProductId.push(b);
        }
        var date = Date.now();
        let dateNow = ((0, moment_1.default)(date)).format('YYYY-MM-DD HH:mm:ss');
        const newPurchase = {
            id,
            buyer,
            total_price: total,
            created_at: dateNow,
            paid: false
        };
        yield (0, knex_1.db)("purchases").insert(newPurchase);
        yield (0, knex_1.db)("purchases_products").insert(purchaseProductId);
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
});
exports.default = createPurchase;
//# sourceMappingURL=createPurchase.js.map