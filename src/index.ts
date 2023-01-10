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

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser
    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})


app.post('/products', (req: Request, res: Response) => {
    const { id, name, brand, price, category } = req.body as TProduct
    const newProduct = {
        id,
        name,
        brand,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})


app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id
    const result = purchases.filter((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)

})


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

//createUser("u003", "beltrano@email.com", "beltrano99")
//console.table(getAllUsers())
//createProduct("p004", "Webcam","Logitech", 600, PRODUCT_CATEGORY.WEBCAM)
//console.table(getAllProducts())
//console.table(getProductById("prod1"))
//console.log(queryProductsByName("HEADSET"))
//createPurchase("u003", "p004", 2, 1600)
//console.table(getAllPurchasesFromUserId("user1"))



