import { Response, Request } from "express";
import { db } from "../../database/knex";

const getProductByName = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q !== undefined) {
            if (typeof q !== "string") {
                res.status(400)
                throw new Error("`A busca deve ser uma string")
            }
            if (q.length < 1) {
                res.status(400)
                throw new Error("A busca de produto deve possuir pelo menos um caractere")
            }
        }

      const result = await db("products").where("name","LIKE",`%${q}%`).select("id","name","price","description","image_url as imageUrl")
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

export default getProductByName