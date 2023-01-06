import { users, products,purchase,
createUser, getAllUsers, createProduct, getAllProducts, getProductById, 
queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import {PRODUCT_CATEGORY} from "./types"


//createUser("u003", "beltrano@email.com", "beltrano99")
//console.table(getAllUsers())
//createProduct("p004", "Webcam","Logitech", 600, PRODUCT_CATEGORY.WEBCAM)
//console.table(getAllProducts())
//console.table(getProductById("prod1"))
//console.log(queryProductsByName("HEADSET"))
//createPurchase("u003", "p004", 2, 1600)
console.table(getAllPurchasesFromUserId("user1"))



