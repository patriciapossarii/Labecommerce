import { Response, Request } from "express";
import { db } from "../../database/knex";
import { TUser } from "../../types";
import moment, { Moment } from 'moment'

const createUser = async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body 

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'")
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }
            const clientExists = await db("users").where({ id: id })
            if (clientExists.length >= 1) {
                res.status(400)
                throw new Error("'id' do usuário já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }

        
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("name' do usuário deve ser string.")
            }
            if (name.length < 2) {
                res.status(400)
                throw new Error("'name' do usuário inválido. Deve conter no mínimo 2 caracteres")
            }
        } else {
            res.status(400)
            throw new Error("'name' do usuário deve ser informado.")
        }


        if (email !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(email) != true) {
                res.status(400)
                throw new Error("'email'do usuário em formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }
            const emailExists = await db("users").where({ email: email })
            if (emailExists.length >= 1) {
                res.status(400)
                throw new Error("'email' do usuário já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'email' do usuário deve ser informado.")
        }


        if (password !== undefined) {
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400)
                throw new Error("'password' do usuário em formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.")
            }
        } else {
            res.status(400)
            throw new Error("'password' do usuário deve ser informado.")
        }
        var date = Date.now()
        let dateNow = (moment(date)).format('YYYY-MM-DD HH:mm:ss')
        const addUser:TUser = {
            id,
            name,
            email,
            password,
            created_at:dateNow
        }

        await db("users").insert(addUser)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}

export default createUser