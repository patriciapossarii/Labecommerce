import { Response, Request } from "express";
import { db } from "../../database/knex";

const getPurchasesByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {
            if (id === ":id") {
                res.status(400)
                throw new Error("'id' não pode ser vazio.")
            }
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


            const idUsertExists = await db.raw(`SELECT *
            FROM users
            WHERE id = "${id}";`)
            console.log(idUsertExists)
            if (idUsertExists.length === 0) {
                res.status(404)
                throw new Error("'id' do usuário não encontrado.")
            }
        } else {
            res.status(400)
            throw new Error(" `id` do usuário deve ser informado.")
        }

        const result = await db.raw(`SELECT *
        FROM purchases
        WHERE buyer = "${id}";`)

        res.status(200).send(result)
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

export default getPurchasesByUserId