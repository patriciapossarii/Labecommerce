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
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield (0, knex_1.db)("products").where("name", "LIKE", `%${q}%`).select("id", "name", "price", "description", "image_url as imageUrl");
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
});
exports.default = getProductByName;
//# sourceMappingURL=getProductByName.js.map