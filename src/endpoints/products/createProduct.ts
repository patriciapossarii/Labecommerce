import { Response, Request } from "express";
import { db } from "../../database/knex";
import { TProduct } from "../../types";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body


        if (id !== undefined) {
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


            const idProductExists = await db.raw(`SELECT *
            FROM products
            WHERE id = "${id}";`)
            if (idProductExists.length >= 1) {
                res.status(400)
                throw new Error("'id' do produto já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do produto deve ser informado.")
        }


        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("'name' do produto não pode ser vazio.")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' do produto deve ser string.")
            }
        } else {
            res.status(400)
            throw new Error("'name' do produto deve ser informado.")
        }


        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' do produto deve ser number.")
            }
            if (price < 0) {
                res.status(400)
                throw new Error("'price' do produto não pode ser numero negativo.")
            }
        } else {
            res.status(400)
            throw new Error("'price' do produto deve ser informado.")
        }


        if (description !== undefined) {
            if (description.length < 1) {
                res.status(400)
                throw new Error("'description' do produto não pode ser vazio.")
            }
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description'do produto deve ser string.")
            }
        } else {
            res.status(400)
            throw new Error("'description' do produto deve ser informado.")
        }


        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("'image_url' do produto deve ser string.")
            }
            if (image_url.length < 1) {
                res.status(400)
                throw new Error("'image_url' do produto não pode ser vazio.")
            }
        } else {
            res.status(400)
            throw new Error("'image_url' do produto deve ser informado.")
        }

        const addProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(addProduct)

        res.status(201).send("Produto cadastrado com sucesso")
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

export default createProduct