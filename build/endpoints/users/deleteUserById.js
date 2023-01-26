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
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400);
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'");
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
        const [userInPurchase] = yield (0, knex_1.db)("purchases").where({ buyer: id });
        if (userInPurchase) {
            res.status(422);
            throw new Error(" 'id' do usuário cadastrado em uma 'purchases'");
        }
        const [userIndex] = yield (0, knex_1.db)("users").where({ id: id });
        if (userIndex) {
            yield (0, knex_1.db)("users").del().where({ id: id });
            res.status(200).send("Usuário apagado com sucesso");
        }
        else {
            res.send("User não encontrado");
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
});
exports.default = deleteUserById;
//# sourceMappingURL=deleteUserById.js.map