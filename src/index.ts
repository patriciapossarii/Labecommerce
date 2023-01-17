import {
    users, products, purchases,
    createUser, getAllUsers, createProduct, getAllProducts, getProductById,
    queryProductsByName, createPurchase, getAllPurchasesFromUserId
} from "./database"
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'

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
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//  CREATE USER
app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser

        const newUser = {
            id,
            email,
            password
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (id[0] != "u") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }
            const clientExists = users.find((user) => user.id === id)
            if (clientExists) {
                res.status(400)
                throw new Error("'id' do usuário já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }


        if (email !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(email) != true) {
                res.status(400)
                throw new Error("'email'do usuário em formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }
            const emailExists = users.find((user) => user.email === email)
            if (emailExists) {
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

        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

// EDIT USER BY ID
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const newId = req.body.id
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            if (newId[0] != "u") {
                res.status(400)
                throw new Error("`id` do usuário inválido. Deve iniciar coma letra `u`")
            }
            if (newId.length < 5 || newId.length > 10) {
                res.status(400)
                throw new Error("`id`do usuário inválido. Deve conter de 5 a 8 caracteres")
            }

            const idOldExists = users.find((user) => user.id == id)
            if (!idOldExists) {
                res.status(404)
                throw new Error("'id' do usuário não existe.")
            }
            const idOthersClienttExists = users.find((user) => user.id !== id && user.id === newId)
            if (idOthersClienttExists) {
                res.status(404)
                throw new Error("'id' do usuário já existente.")
            }
        }

        const newEmail = req.body.email
        if (newEmail !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(newEmail) != true) {
                res.status(400)
                throw new Error("'email' do usuário no formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }

            const mailOthersClienttExists = users.find((user) => user.id !== id && user.email === newEmail)
            if (mailOthersClienttExists) {
                res.status(400)
                throw new Error("'email' de usuário já existee.")
            }
        }


        const newPassword = req.body.password
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


        const user = users.find((user) => {
            return user.id === id
        })

        if (user) {
            user.id = newId || user.id
            user.email = newEmail || user.email
            user.password = newPassword || user.password
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Usuário não encontrado")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

// DELETE USER BY ID
app.delete("/user/:id", (req: Request, res: Response) => {
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
            if (id[0] != "u") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }

        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }


        const userInPurchase = purchases.filter((purchase) => {
            return purchase.userId === id
        })
     
        if (userInPurchase.length > 0) {
            res.status(422)
            throw new Error(" 'id' cadastrado em uma 'purchases'")
        }


        const userIndex = users.findIndex((user) => {
            return user.id === id
        })


        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário apagado com sucesso")
        } else {
            res.send("User não encontrado")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//////////////////////////////////////////  PRODUCTS //////////////////////////////////////////
// GET ALL PRODUCTS
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// CREATE PRODUCT
app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, brand, price, category } = req.body as TProduct
        const newProduct = {
            id,
            name,
            brand,
            price,
            category
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }
            if (id[0] != "p") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.")
            }

            const idProductExists = products.find((product) => product.id === id)
            if (idProductExists) {
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


        if (brand !== undefined) {
            if (brand.length < 1) {
                res.status(400)
                throw new Error("'brand' do produto não pode ser vazio.")
            }
            if (typeof brand !== "string") {
                res.status(400)
                throw new Error("'brand'do produto deve ser string.")
            }
        } else {
            res.status(400)
            throw new Error("'brand' do produto deve ser informado.")
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

        if (category !== undefined) {
            if (category.length < 1) {
                res.status(400)
                throw new Error("'category' do produto não pode ser vazio.")
            }
            if (typeof category != "string") {
                res.status(400)
                throw new Error("'category' do produto deve ser string.")
            }
            if (category !== PRODUCT_CATEGORY.HEADSET &&
                category !== PRODUCT_CATEGORY.PEN_DRIVE &&
                category !== PRODUCT_CATEGORY.WEBCAM) {
                res.status(400)
                throw new Error("'category' do produto deve ser do tipo válido (Headset, Pen Drive ou Webcam )")
            }
        } else {
            res.status(400)
            throw new Error("'category' do produto deve ser informado.")
        }


        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// GET PRODUCT BY ID
app.get("/products/:id", (req: Request, res: Response) => {

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
            if (id[0] != "p") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.")
            }

        } else {
            res.status(400)
            throw new Error("'id' do produto deve ser informado.")
        }
        const result = products.find((product) => {
            return product.id === id
        })
        if (!result) {
            res.status(404)
            throw new Error("'id'do produto não encontrado.")
        }
        res.status(200).send(result)

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// SEARCH PRODUCT BY NAME
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("A busca de produto deve possuir pelo menos um caractere")
            }
            if (typeof q !== "string") {
                res.status(400)
                throw new Error("`A busca deve ser uma string")
            }
        }
        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        res.status(200).send(result)

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// EDIT PRODUCT BY ID
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params


        const newId = req.body.id
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            if (newId[0] != "u") {
                res.status(400)
                throw new Error("`id` do produto inválido. Deve iniciar coma letra `p`")
            }
            if (newId.length < 5 || newId.length > 10) {
                res.status(400)
                throw new Error("`id`do produto inválido. Deve conter de 5 a 8 caracteres")
            }

            const idOldExists = products.find((product) => product.id == id)
            if (!idOldExists) {
                res.status(404)
                throw new Error("'id' do produto não existe.")
            }
            const idOthersProductstExists = users.find((user) => user.id !== id && user.id === newId)
            if (idOthersProductstExists) {
                res.status(404)
                throw new Error("'id' do produto já existente.")
            }
        }


        const newName = req.body.name
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


        const newBrand = req.body.brand
        if (newBrand !== undefined) {
            if (newBrand.length < 1) {
                res.status(400)
                throw new Error("'brand' do produto não pode ser vazio.")
            }
            if (typeof newBrand !== "string") {
                res.status(400)
                throw new Error("'brand'do produto deve ser string.")
            }
        }


        const newPrice = req.body.price as number
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


        const newCategory = req.body.category as PRODUCT_CATEGORY | undefined
        if (newCategory !== undefined) {
            if (newCategory.length < 1) {
                res.status(400)
                throw new Error("'category' do produto não pode ser vazio.")
            }
            if (typeof newCategory !== "string") {
                res.status(400)
                throw new Error("'category' do produto deve ser string.")
            }
            if (newCategory !== PRODUCT_CATEGORY.HEADSET &&
                newCategory != PRODUCT_CATEGORY.PEN_DRIVE &&
                newCategory != PRODUCT_CATEGORY.WEBCAM) {
                res.status(400)
                throw new Error("'category' do produto deve ser do tipo válido (Headset, Pen Drive ou Webcam )")
            }
        }


        const product = products.find((product) => {
            return product.id === id
        })

        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.brand = newBrand || product.brand
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
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

//DELETE PRODUCT BY ID
app.delete("/product/:id", (req: Request, res: Response) => {
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
            if (id[0] != "p") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'.")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres.")
            }
        } else {
            res.status(400)
            throw new Error(" 'id' deve ser informada.")
        }

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })

        if (productIndex < 0) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        const productInPurchase = purchases.filter((purchase) => {
            return purchase.productId === id
        })
     
        if (productInPurchase.length > 0) {
            res.status(422)
            throw new Error(" 'id' cadastrado em uma 'purchases'")
        }

        products.splice(productIndex, 1)
        res.status(200).send("Produto apagado com sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//////////////////////////////////////////  PURCHASES //////////////////////////////////////////
// GET ALL PURCHASES
app.get('/purchases', (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases)
    } catch (error) {
        res.send(error.message)
    }
})

// CREATE PURCHASE
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }

        if (userId !== undefined) {
            if (typeof userId !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (userId[0] != "u") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'")
            }
            if (userId.length < 5 || userId.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }
            const idUserExists = users.find((user) => user.id === userId)
            if (!idUserExists) {
                res.status(404)
                throw new Error("'id' do usuário  não  encontrado.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário  deve ser informado.")
        }


        if (quantity !== undefined) {
            if (quantity < 1) {
                res.status(400)
                throw new Error("'quantity' do produto não pode ser vazio.")
            }
            if (typeof quantity !== "number") {
                res.status(400)
                throw new Error("'quantity' do produto deve ser number.")
            }
        } else {
            res.status(400)
            throw new Error("'quantity' do produto deve ser informado.")
        }


        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }
            if (productId[0] != "p") {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve iniciar coma letra 'p'")
            }
            if (productId.length < 5 || productId.length > 10) {
                res.status(400)
                throw new Error("'id' do produto inválido. Deve conter de 5 a 8 caracteres")
            }
            const idProductExists = products.find((product) => product.id === productId)
            if (!idProductExists) {
                res.status(404)
                throw new Error("'id' do produto não  encontrado.")
            }
            if (totalPrice !== undefined) {
                if (typeof totalPrice !== "number") {
                    res.status(400)
                    throw new Error("'totalPrice' de compras deve ser number.")
                }
                if (totalPrice < 1) {
                    res.status(400)
                    throw new Error("'totalPrice' de compras não pode ser vazio.")
                }
            } else {
                res.status(400)
                throw new Error(" `totalPrice` deve ser informada.")
            }


            if (totalPrice !== idProductExists.price * quantity) {
                res.status(400)
                throw new Error("'totalPrice' calculo de valor divergente.")
            }
        } else {
            res.status(400)
            throw new Error("'id do produto deve ser informado.")
        }

        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso!")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})





// GET PURCHASES BY USER ID
app.get("/users/:id/purchases", (req: Request, res: Response) => {
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
            if (id[0] != "u") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar coma letra 'u'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }


            const idUsertExists = users.find((user) => user.id === id)
            if (!idUsertExists) {
                res.status(404)
                throw new Error("'id' do usuário não encontrado.")
            }
        } else {
            res.status(400)
            throw new Error(" `id` do usuário deve ser informado.")
        }

        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })

        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})































//createUser("u003", "beltrano@email.com", "beltrano99")
//console.table(getAllUsers())
//createProduct("p004", "Webcam","Logitech", 600, PRODUCT_CATEGORY.WEBCAM)
//console.table(getAllProducts())
//console.table(getProductById("prod1"))
//console.log(queryProductsByName("HEADSET"))
//createPurchase("u003", "p004", 2, 1600)
//console.table(getAllPurchasesFromUserId("user1"))



