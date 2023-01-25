import { Response, Request } from "express";
import { db } from "../../database/knex";



const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {
            if (id === ":id") {
                res.status(400)
                throw new Error("'id' do produto não pode ser vazio.")
            }

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'")
            }
            if (id.length < 5 || id.length > 8) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.")
            }
        } else {
            res.status(400)
            throw new Error(" 'id' deve ser informada.")
        }

        const productIndex = await db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`)


        if (productIndex.length === 0) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        const productInPurchase = await db.raw(`SELECT *
        FROM purchases_products
        WHERE product_id = "${id}";`)

        if (productInPurchase.length > 0) {
            res.status(422)
            throw new Error(" 'id' cadastrado em uma 'purchases'")
        }

        await db.raw(`DELETE FROM products
      WHERE id = "${id}";`)
        res.status(200).send("Produto apagado com sucesso")

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

export default deleteProductById