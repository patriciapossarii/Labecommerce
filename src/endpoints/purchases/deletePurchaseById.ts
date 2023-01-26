import { Response, Request } from "express";
import { db } from "../../database/knex";


const deletePurchaseById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

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
        } else {
            res.status(400)
            throw new Error("'id' da compra  deve ser informado.")
        }

        const [purchaseIndex] = await db("purchases").where({ id: id })
        if (purchaseIndex) {
            await db("purchases_products").del().where({ purchase_id: id })
            await db("purchases").del().where({ id: id })
            res.status(200).send("Pedido cancelado com sucesso")
        } else {
            res.send("purchase não encontrada")
        }

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

export default deletePurchaseById
