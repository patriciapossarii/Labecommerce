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
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../../database/knex");
const getPurchaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id !== undefined) {
            if (id === ":id") {
                res.status(400);
                throw new Error("'id' da compra não pode ser vazio.");
            }
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
                throw new Error("'id' da comprae inválido. Deve conter de 5 a 8 caracteres");
            }
            const idPurchasetExists = yield knex_1.db.raw(`SELECT *
            FROM purchases
            WHERE id = "${id}";`);
            if (idPurchasetExists.length === 0) {
                res.status(404);
                throw new Error("'id' da compra não encontrado.");
            }
        }
        else {
            res.status(400);
            throw new Error(" `id` da compra deve ser informado.");
        }
        const result1 = yield (0, knex_1.db)("purchases as p")
            .innerJoin("users as u", "p.buyer", "=", "u.id")
            .select("p.id as purchaseId", "p.total_price as totalPrice", "p.created_at as createdAt", "p.paid as isPaid", "p.buyer as buyerId", "u.email as email", "u.name as name")
            .where("p.id", "=", id);
        result1[0].isPaid === 0 ? result1[0].isPaid = false : result1[0].isPaid = true;
        const result2 = yield (0, knex_1.db)("purchases_products as pp")
            .innerJoin("products as prod", "pp.product_id", "=", "prod.id")
            .select("prod.id as id", "prod.name as name", "prod.price as price", "prod.description as description", "prod.image_url as image_url", "pp.quantity as quantity").where("pp.purchase_id", "=", id);
        let sum = 0;
        result2.forEach(value => { sum += value.price * value.quantity; });
        let result3 = {
            purchaseId: result1[0].purchaseId,
            totalPrice: sum,
            createdAt: result1[0].createdAt,
            isPaid: result1[0].isPaid,
            buyerId: result1[0].buyerId,
            email: result1[0].email,
            name: result1[0].name,
            productsList: result2
        };
        res.status(200).send(result3);
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
exports.default = getPurchaseById;
//# sourceMappingURL=getPurchaseById.js.map