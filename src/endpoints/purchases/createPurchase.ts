import { Response, Request } from "express";
import { db } from "../../database/knex";
import { TPurchase } from "../../types";

const createPurchase = async (req: Request, res: Response) => {
    try {
        const { id, buyer, total_price } = req.body as TPurchase

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' da compra deve ser string.")
            }
            if (id[0] != "p" || id[1] != "u" || id[2] != "r" || id[3] != "c") {
                res.status(400)
                throw new Error("'id' da compra inválido. Deve iniciar com 'purc'")
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400)
                throw new Error("'id' da compra inválido. Deve conter de 5 a 8 caracteres")
            }
            const idUserExists = await db.raw(`SELECT *
            FROM purchases
            WHERE id = "${id}";`)
            if (idUserExists.length >= 1) {
                res.status(404)
                throw new Error("'id' da compra já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' da compra  deve ser informado.")
        }


        if (buyer !== undefined) {
            if (typeof buyer !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (buyer[0] != "u" || buyer[1] != "s" || buyer[2] != "e" || buyer[3] != "r") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'")
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }
            const idUserExists = await db.raw(`SELECT *
            FROM users
            WHERE id = "${buyer}";`)
            if (idUserExists.length < 1) {
                res.status(404)
                throw new Error("'id' do usuário  não  encontrado.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário  deve ser informado.")
        }


        if (total_price !== undefined) {
            if (total_price < 1) {
                res.status(400)
                throw new Error("'total_price ' do produto não pode ser vazio.")
            }
            if (typeof total_price !== "number") {
                res.status(400)
                throw new Error("'total_price' do produto deve ser number.")
            }
        } else {
            res.status(400)
            throw new Error("'total_price ' do produto deve ser informado.")
        }

        await db.raw(`
        INSERT INTO purchases(id, buyer, total_price)
        values("${id}", "${buyer}", ${total_price})
        `)
        res.status(201).send("Compra cadastrada com sucesso!")
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

export default createPurchase