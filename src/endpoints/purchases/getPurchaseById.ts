import { Response, Request } from "express";
import { db } from "../../database/knex";

const getPurchaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {
            if (id === ":id") {
                res.status(400)
                throw new Error("'id' da compra não pode ser vazio.")
            }
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
                throw new Error("'id' da comprae inválido. Deve conter de 5 a 8 caracteres")
            }


            const idPurchasetExists = await db.raw(`SELECT *
            FROM purchases
            WHERE id = "${id}";`)

            if (idPurchasetExists.length === 0) {
                res.status(404)
                throw new Error("'id' da compra não encontrado.")
            }
        } else {
            res.status(400)
            throw new Error(" `id` da compra deve ser informado.")
        }

        const result1 = await db("purchases as p")
            .innerJoin(
                "users as u",
                "p.buyer",
                "=",
                "u.id"
            )
            .select("p.id as purchaseId",
                "p.total_price as totalPrice",
                "p.created_at as createdAt",
                "p.paid as isPaid",
                "p.buyer as buyerId",
                "u.email as email",
                "u.name as name")
            .where("p.id", "=", id)
        result1[0].isPaid === 0 ? result1[0].isPaid = false : result1[0].isPaid = true

        const result2 = await db("purchases_products as pp")
        .innerJoin(
            "products as prod",
            "pp.product_id",
            "=",
            "prod.id"
        )
        .select("prod.id as id",
        "prod.name as name",
        "prod.price as price",
        "prod.description as description",
        "prod.image_url as image_url",
        "pp.quantity as quantity"
        ).where("pp.purchase_id", "=", id)
       

        let result3 = {
            purchaseId: result1[0].purchaseId,
            totalPrice: result1[0].totalPrice,
            createdAt: result1[0].createdAt,
            isPaid: result1[0].isPaid,
            buyerId: result1[0].buyerId,
            email: result1[0].email,
            name: result1[0].name,
            productsList:result2
        }
        
        res.status(200).send(result3)
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

export default getPurchaseById