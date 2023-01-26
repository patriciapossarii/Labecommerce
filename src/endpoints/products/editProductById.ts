import { Response, Request } from "express";
import { db } from "../../database/knex";
import { TProduct } from "../../types";

const editProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newId = req.body.id as string
        const newName = req.body.name as string
        const newPrice = req.body.price as number
        const newDescription = req.body.description as string
        const newImageUrl = req.body.imageUrl as string

        if (id !== undefined) {
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
            throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres")
        }
    }
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }
            if (newId[0] != "p" || newId[1] != "r" || newId[2] != "o" || newId[3] != "d") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'")
            }
            if (newId.length < 5 || newId.length > 8) {
                res.status(400)
                throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres")
            }

            const idOldExists = await db("products").where({ id: id })
            if (!idOldExists) {
                res.status(404)
                throw new Error("'id' do produto não existe.")
            }

            const [idOthersProductstExists] = await db("products").where("id", "!=", id).andWhere("id", "=", newId)

            if (idOthersProductstExists) {
                res.status(404)
                throw new Error("'id' do produto já existente.")
            }
        }


        if (newName !== undefined) {
            if (newName.length < 1) {
                res.status(400)
                throw new Error("'name' do produto não pode ser vazio.")
            }
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' do produto deve ser string.")
            }
        }


        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' do produto deve ser number.")
            }
            if (newPrice < 0) {
                res.status(400)
                throw new Error("'price' do produto não pode ser numero negativo.")
            }
        }


        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description'do produto deve ser string.")
            }
            if (newDescription.length < 1) {
                res.status(400)
                throw new Error("'description' do produto não pode ser vazio.")
            }
        }


        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("'image_url' do produto deve ser string.")
            }
            if (newImageUrl.length < 1) {
                res.status(400)
                throw new Error("'image_url' do produto não pode ser vazio.")
            }
        }

        const [product] = await db("products").where({ id: id })
        if (product) {
            const updateProduct: TProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                description: newDescription || product.description,
                image_url: newImageUrl || product.image_url
            }
            await db("products").update(updateProduct).where({ id: id })
            res.status(200).send("Produto atualizado com sucesso")
        } else {
            res.status(404).send("id do produto não encontrado")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
}

export default editProductById