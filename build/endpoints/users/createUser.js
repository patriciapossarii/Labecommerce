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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const clientExists = yield (0, knex_1.db)("users").where({ id: id });
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
            const emailExists = yield (0, knex_1.db)("users").where({ email: email });
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
        var date = Date.now();
        let dateNow = ((0, moment_1.default)(date)).format('YYYY-MM-DD HH:mm:ss');
        const addUser = {
            id,
            name,
            email,
            password,
            created_at: dateNow
        };
        yield (0, knex_1.db)("users").insert(addUser);
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
});
exports.default = createUser;
//# sourceMappingURL=createUser.js.map