import express, { Request, Response } from 'express'
import cors from 'cors'
import getAllUsers from "./endpoints/users/getAllUsers"
import createUser from "./endpoints/users/createUser"
import editUserById from "./endpoints/users/editUserById"
import deleteUserById from "./endpoints/users/deleteUserById"
import getAllProducts from "./endpoints/products/getAllProducts"
import createProduct from "./endpoints/products/createProduct"
import getProductById from "./endpoints/products/getProductById"
import getProductByName from "./endpoints/products/getProductByName"
import editProductById from "./endpoints/products/editProductById"
import deleteProductById from "./endpoints/products/deleteProductById"
import getAllPurchases from "./endpoints/purchases/getAllPurchases"
import createPurchase from "./endpoints/purchases/createPurchase"
import getPurchasesByUserId from "./endpoints/purchases/getPurchasesByUserId"
import getPurchaseById from "./endpoints/purchases/getPurchaseById"


const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// USERS
app.get("/users",getAllUsers)
app.post("/users",createUser )
app.put("/user/:id", editUserById)
app.delete("/user/:id", deleteUserById)

// PRODUCTS
app.get('/products', getAllProducts)
app.post('/products',createProduct)
app.get("/products/:id", getProductById)
app.get('/product/search',getProductByName)
app.put("/product/:id", editProductById)
app.delete("/product/:id",deleteProductById )

//PURCHASES
app.get('/purchases', getAllPurchases)
app.post('/purchases', createPurchase)
app.get("/users/:id/purchases", getPurchasesByUserId)
app.get("/purchases/:id", getPurchaseById)










