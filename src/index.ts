import { users, products,purchase,
createUser, getAllUsers, createProduct, getAllProducts, getProductById, 
queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import {PRODUCT_CATEGORY} from "./types"
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

//createUser("u003", "beltrano@email.com", "beltrano99")
//console.table(getAllUsers())
//createProduct("p004", "Webcam","Logitech", 600, PRODUCT_CATEGORY.WEBCAM)
//console.table(getAllProducts())
//console.table(getProductById("prod1"))
//console.log(queryProductsByName("HEADSET"))
//createPurchase("u003", "p004", 2, 1600)
//console.table(getAllPurchasesFromUserId("user1"))



