import { Response, Request } from "express";
import { db } from "../../database/knex";

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {
            if (id == ":id") {
                res.status(400)
                throw new Error("'id' do produto deve ser informado.")
            }
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.")
            }

        } else {
            res.status(400)
            throw new Error("'id' do produto deve ser informado.")
        }
        const result = await db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`)

        if (result.length === 0) {
            res.status(404)
            throw new Error("'id'do produto não encontrado.")
        }
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

export default getProductById