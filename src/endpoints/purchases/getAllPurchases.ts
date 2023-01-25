import { Response, Request } from "express";
import { db } from "../../database/knex";

const getAllPurchases = async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM purchases;`)
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

export default getAllPurchases