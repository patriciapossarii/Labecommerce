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
const editProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImage_url = req.body.image_url;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string.");
            }
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400);
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'");
            }
            if (newId.length < 5 || newId.length > 8) {
                res.status(400);
                throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres");
            }
            const idOldExists = yield knex_1.db.raw(`SELECT *
           FROM products
           WHERE id = "${id}";`);
            if (!idOldExists) {
                res.status(404);
                throw new Error("'id' do produto não existe.");
            }
            const idOthersProductstExists = yield knex_1.db.raw(`SELECT *
            FROM products
            WHERE id != "${id}" 
            AND id = "${newId}";`);
            if (idOthersProductstExists) {
                res.status(404);
                throw new Error("'id' do produto já existente.");
            }
        }
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
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("'description'do produto deve ser string.");
            }
            if (newDescription.length < 1) {
                res.status(400);
                throw new Error("'description' do produto não pode ser vazio.");
            }
        }
        if (newImage_url !== undefined) {
            if (typeof newImage_url !== "string") {
                res.status(400);
                throw new Error("'image_url' do produto deve ser string.");
            }
            if (newImage_url.length < 1) {
                res.status(400);
                throw new Error("'image_url' do produto não pode ser vazio.");
            }
        }
        const [product] = yield knex_1.db.raw(`SELECT *
        FROM products 
        WHERE id = "${id}";`);
        if (product) {
            yield knex_1.db.raw(`
            UPDATE products 
            SET
            id = "${newId || product.id}",
            name = "${newName || product.name}",
            price = ${isNaN(newPrice) ? product.price : newPrice},
            description = "${newDescription || product.description}",
            image_url = "${newImage_url || product.image_url}" 
            WHERE id="${id}"
            `);
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
exports.default = editProductById;
//# sourceMappingURL=editProductById.js.map