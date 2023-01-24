import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//////////////////////////////////////////  USERS //////////////////////////////////////////
//  GET  ALL USERS
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")
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
})

//  CREATE USER
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body as TUser

        if (id !== undefined) {
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
            const clientExists = await db("users").where({ id: id })
            if (clientExists.length >= 1) {
                res.status(400)
                throw new Error("'id' do usuário já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("name' do usuário deve ser string.")
            }
            if (name.length < 2) {
                res.status(400)
                throw new Error("'name' do usuário inválido. Deve conter no mínimo 2 caracteres")
            }
        } else {
            res.status(400)
            throw new Error("'name' do usuário deve ser informado.")
        }

        if (email !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(email) != true) {
                res.status(400)
                throw new Error("'email'do usuário em formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }
            const emailExists = await db("users").where({ email: email })
            if (emailExists.length >= 1) {
                res.status(400)
                throw new Error("'email' do usuário já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'email' do usuário deve ser informado.")
        }

        if (password !== undefined) {
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400)
                throw new Error("'password' do usuário em formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.")
            }
        } else {
            res.status(400)
            throw new Error("'password' do usuário deve ser informado.")
        }

        await db("users").insert({ id, name, email, password })
        res.status(201).send("Cadastro realizado com sucesso")

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

})

// EDIT USER BY ID
app.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newId = req.body.id
        const newName = req.body.name
        const newEmail = req.body.email
        const newPassword = req.body.password

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            if (newId[0] != "u" || newId[1] != "s" || newId[2] != "e" || newId[3] != "r") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'")
            }
            if (newId.length < 5 || newId.length > 8) {
                res.status(400)
                throw new Error("`id`do usuário inválido. Deve conter de 5 a 8 caracteres")
            }
            const [idOldExists] = await db("users").where({ id: id })
            if (!idOldExists) {
                res.status(404)
                throw new Error("'id' do usuário não existe.")
            }
            const [idOthersClienttExists] = await db("users").where("id", "!=", id).andWhere("id", "=", newId)
            if (idOthersClienttExists) {
                res.status(404)
                throw new Error("'id' do usuário já existente.")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("name' do usuário deve ser string.")
            }
            if (newName.length < 2) {
                res.status(400)
                throw new Error("'name' do usuário inválido. Deve conter no mínimo 2 caracteres")
            }
        }

        if (newEmail !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(newEmail) != true) {
                res.status(400)
                throw new Error("'email' do usuário no formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }
            const [mailOthersClienttExists] = await db("users").where("id", "!=", id).andWhere("email", "=", newEmail)
            console.log(mailOthersClienttExists)
            if (mailOthersClienttExists) {
                res.status(400)
                throw new Error("'email' de usuário já existe.")
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword != "string") {
                res.status(400)
                throw new Error("'password' deve ser string.")
            }
            if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400)
                throw new Error("'password' formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.")
            }
        } else {
            res.status(400)
            throw new Error("'password' deve ser informado.")
        }

        const [user] = await db("users").where({ id: id })
        if (user) {
            const updateUser = {
                id: newId || user.id,
                name: newName || user.name,
                email: newEmail || user.email,
                password: newPassword || user.password
            }
            await db("users").update(updateUser).where({ id: id })
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Usuário não encontrado")
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


})

//--> DELETE USER BY ID
app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {

            if (id === ":id") {
                res.status(400)
                throw new Error("'id' do usuário não pode ser vazio.")
            }
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }

        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }


        /*const userInPurchase = purchases.filter((purchase) => {
            return purchase.userId === id
        })
*/
        const [userInPurchase] = await db.raw(`SELECT *
        FROM purchases
        WHERE buyer = "${id}";`)


        if (userInPurchase) {
            res.status(422)
            throw new Error(" 'id' do usuário cadastrado em uma 'purchases'")
        }

        /*
                const userIndex = users.findIndex((user) => {
                    return user.id === id
                })
        
        */
        const [userIndex] = await db.raw(`SELECT *
        FROM users
        WHERE id = "${id}";`)

        if (userIndex) {
            await db.raw(`DELETE FROM users 
        WHERE id = "${id}";`)

            res.status(200).send("Usuário apagado com sucesso")
        } else {
            res.send("User não encontrado")
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

})

//////////////////////////////////////////  PRODUCTS //////////////////////////////////////////
//--> GET ALL PRODUCTS
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM products;`)
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
})

//--> CREATE PRODUCT
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body as TProduct


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

        await db.raw(`
        INSERT INTO products(id, name, price, description, image_url)
        VALUES("${id}","${name}", ${price}, "${description}","${image_url}")`)

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
})

// --> GET PRODUCT BY ID
app.get("/products/:id", async (req: Request, res: Response) => {

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
        console.log(result)
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
})

//--> SEARCH PRODUCT BY NAME
app.get('/product/search', async (req: Request, res: Response) => {
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

        const result = await db.raw(`SELECT *
       FROM products
       WHERE name LIKE "%${q}%";`)
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
})

//--> EDIT PRODUCT BY ID
app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newId = req.body.id as string
        const newName = req.body.name as string
        const newPrice = req.body.price as number
        const newDescription = req.body.description as string
        const newImage_url = req.body.image_url as string

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            if (id[0] != "p" || id[1] != "r" || id[2] != "o" || id[3] != "d") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar com 'prod'")
            }
            if (newId.length < 5 || newId.length > 8) {
                res.status(400)
                throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres")
            }

            // const idOldExists = products.find((product) => product.id == id)
            const idOldExists = await db.raw(`SELECT *
           FROM products
           WHERE id = "${id}";`)

            if (!idOldExists) {
                res.status(404)
                throw new Error("'id' do produto não existe.")
            }
            //const idOthersProductstExists = users.find((user) => user.id !== id && user.id === newId)
            const idOthersProductstExists = await db.raw(`SELECT *
            FROM products
            WHERE id != "${id}" 
            AND id = "${newId}";`)
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


        if (newImage_url !== undefined) {
            if (typeof newImage_url !== "string") {
                res.status(400)
                throw new Error("'image_url' do produto deve ser string.")
            }
            if (newImage_url.length < 1) {
                res.status(400)
                throw new Error("'image_url' do produto não pode ser vazio.")
            }
        }

        /*
                const product = products.find((product) => {
                    return product.id === id
                })
        */
        const [product] = await db.raw(`SELECT *
        FROM products 
        WHERE id = "${id}";`)

        if (product) {
            /*
            product.id = newId || product.id
            product.name = newName || product.name
            product.brand = newBrand || product.brand
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category*/
            await db.raw(`
            UPDATE products 
            SET
            id = "${newId || product.id}",
            name = "${newName || product.name}",
            price = ${isNaN(newPrice) ? product.price : newPrice},
            description = "${newDescription || product.description}",
            image_url = "${newImage_url || product.image_url}" 
            WHERE id="${id}"
            `)
            res.status(200).send("Produto atualizado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//-->DELETE PRODUCT BY ID
app.delete("/product/:id", async (req: Request, res: Response) => {
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

        /*const productIndex = products.findIndex((product) => {
            return product.id === id
        })*/
        const productIndex = await db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`)


        if (productIndex.length === 0) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        /* const productInPurchase = purchases.filter((purchase) => {
             return purchase.productId === id
         })
         */
        const productInPurchase = await db.raw(`SELECT *
        FROM purchases_products
        WHERE product_id = "${id}";`)

        if (productInPurchase.length > 0) {
            res.status(422)
            throw new Error(" 'id' cadastrado em uma 'purchases'")
        }

        /*products.splice(productIndex, 1)*/

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
})


//////////////////////////////////////////  PURCHASES //////////////////////////////////////////
//--> GET ALL PURCHASES
app.get('/purchases', async (req: Request, res: Response) => {
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
})

//--> CREATE PURCHASE
app.post('/purchases', async (req: Request, res: Response) => {
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
            } 8
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
})

// --> GET PURCHASES BY USER ID
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
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
})










