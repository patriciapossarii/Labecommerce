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
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newId = req.body.id;
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
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
            const [idOldExists] = yield (0, knex_1.db)("users").where({ id: id });
            if (!idOldExists) {
                res.status(404);
                throw new Error("'id' do usuário não existe.");
            }
            const [idOthersClienttExists] = yield (0, knex_1.db)("users").where("id", "!=", id).andWhere("id", "=", newId);
            if (idOthersClienttExists) {
                res.status(404);
                throw new Error("'id' do usuário já existente.");
            }
        }
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
        if (newEmail !== undefined) {
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (expression.test(newEmail) != true) {
                res.status(400);
                throw new Error("'email' do usuário no formato inválido. Ex.: 'exemplo@exemplo.com'.");
            }
            const [mailOthersClienttExists] = yield (0, knex_1.db)("users").where("id", "!=", id).andWhere("email", "=", newEmail);
            if (mailOthersClienttExists) {
                res.status(400);
                throw new Error("'email' de usuário já existe.");
            }
        }
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
        const [user] = yield (0, knex_1.db)("users").where({ id: id });
        if (user) {
            const updateUser = {
                id: newId || user.id,
                name: newName || user.name,
                email: newEmail || user.email,
                password: newPassword || user.password,
                created_at: user.created_at
            };
            yield (0, knex_1.db)("users").update(updateUser).where({ id: id });
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
});
exports.default = editUserById;
//# sourceMappingURL=editUserById.js.map