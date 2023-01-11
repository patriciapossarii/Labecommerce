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
            if (id.length < 1) {
                res.status(400)
                throw new Error("'id' não pode ser vazio.")
            }
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            const clientExists = users.find((user) => user.id === id)
            if (clientExists) {
                res.status(400)
                throw new Error("'id' já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' deve ser informado.")
        }


        if (email !== undefined) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            if (expression.test(email) != true) {
                res.status(400)
                throw new Error("'email' no formato inválido. Ex.: 'exemplo@exemplo.com'.")
            }
            const emailExists = users.find((user) => user.email === email)
            if (emailExists) {
                res.status(400)
                throw new Error("'email' já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'email' deve ser informado.")
        }


        if (password !== undefined) {
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,12}$/g)) {
                res.status(400)
                throw new Error("'password' formato inválido. Deve conter entre 4 a 12 caracteres, com 1 letra maiuscula, 1 letra minúscula, 1 número.")
            }
        } else {
            res.status(400)
            throw new Error("'password' deve ser informado.")
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
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

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
})

// DELETE USER BY ID
app.delete("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    console.log("index", userIndex)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send("User apagado com sucesso")
    } else {
        res.send("User não encontrado")
    }
})

//////////////////////////////////////////  PRODUCTS //////////////////////////////////////////
// GET ALL PRODUCTS
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error) {
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
        console.log(newProduct)

        if (id !== undefined) {

            if (id.length < 1) {
                res.status(400)
                throw new Error("'id' não pode ser vazio.")
            }
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string.")
            }
            const idProductExists = products.find((product) => product.id === id)
            if (idProductExists) {
                res.status(400)
                throw new Error("'id' já existente.")
            }
        } else {
            res.status(400)
            throw new Error("'id' deve ser informado.")
        }


        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("'name' não pode ser vazio.")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string.")
            }
        } else {
            res.status(400)
            throw new Error("'name' deve ser informado")
        }


        if (brand !== undefined) {
            if (brand.length < 1) {
                res.status(400)
                throw new Error("`brand` não pode ser vazio.")
            }
            if (typeof brand !== "string") {
                res.status(400)
                throw new Error("'brand' deve ser string.")
            }
        } else {
            res.status(400)
            throw new Error("'brand' deve ser informado.")
        }


        if (price !== undefined) {
            if (price < 0) {
                res.status(400)
                throw new Error("`price` não pode ser numero negativo.")
            }
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("`price` deve ser number.")
            }
        } else {
            res.status(400)
            throw new Error("`price` deve ser informado.")
        }

        if (category !== undefined) {
            if (category.length < 1) {
                res.status(400)
                throw new Error("`category` não pode ser vazio.")
            }
            if (category !== PRODUCT_CATEGORY.HEADSET &&
                category !== PRODUCT_CATEGORY.PEN_DRIVE &&
                category !== PRODUCT_CATEGORY.WEBCAM) {
                res.status(400)
                throw new Error("`category` deve ser de um tipo válido (Headset, Pen Drive ou Webcam )")
            }
        } else {
            res.status(400)
            throw new Error(" `category` deve ser informada.")
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

// SEARCH PRODUCT BY ID
app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})

// SEARCH PRODUCT BY NAME
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q !== undefined) {
            if (q.length <= 1) {
                res.status(400)
                throw new Error("A busca de produto deve possuir pelo menos um caractere")
            }
            if (typeof q !== "string") {
                res.status(400)
                throw new Error("`Query deve ser uma string")
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
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newBrand = req.body.brand as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as PRODUCT_CATEGORY | undefined

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
})

//DELETE PRODUCT BY ID
app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
        res.status(200).send("Produto apagado com sucesso")
    } else {
        res.send("Produto não encontrado")
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
            if (userId.length < 1) {
                res.status(400)
                throw new Error("'id' do usuário não pode ser vazio.")
            }
            if (typeof userId !== "string") {
                res.status(400)
                throw new Error("'id' do usuário  deve ser string.")
            }
            const idUserExists = users.find((user) => user.id === userId)
            if (!idUserExists) {
                res.status(400)
                throw new Error("'id' do usuário  não  encontrado.")
            }
        } else {
            res.status(400)
            throw new Error("'id' do usuário  deve ser informado.")
        }


        if (quantity !== undefined) {
            if (quantity < 1) {
                res.status(400)
                throw new Error("'quantity' não pode ser vazio.")
            }
            if (typeof quantity !== "number") {
                res.status(400)
                throw new Error("'quantity' deve ser number.")
            }
        } else {
            res.status(400)
            throw new Error("'quantity' do produto deve ser informado.")
        }


        if (productId !== undefined) {
            if (productId.length < 1) {
                res.status(400)
                throw new Error("'id' do produto  não pode ser vazio.")
            }
            if (typeof productId !== "string") {
                res.status(400)
                throw new Error("'id' do produto deve ser string.")
            }

            const idProductExists = products.find((product) => product.id === productId)
            if (!idProductExists) {
                res.status(400)
                throw new Error("'id' do produto não  encontrado.")
            }
            if (typeof totalPrice !== "number") {
                res.status(400)
                throw new Error("'totalPrice' deve ser number.")
            }
            if (totalPrice < 1) {
                res.status(400)
                throw new Error("'totalPrice' não pode ser vazio.")
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










// SEARCH PURCHASER FOR USER ID
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id
    const result = purchases.filter((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)

})































//createUser("u003", "beltrano@email.com", "beltrano99")
//console.table(getAllUsers())
//createProduct("p004", "Webcam","Logitech", 600, PRODUCT_CATEGORY.WEBCAM)
//console.table(getAllProducts())
//console.table(getProductById("prod1"))
//console.log(queryProductsByName("HEADSET"))
//createPurchase("u003", "p004", 2, 1600)
//console.table(getAllPurchasesFromUserId("user1"))



