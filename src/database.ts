import { TProduct, TUser, TPurchase, PRODUCT_CATEGORY } from "./types";

export function createUser(id: string, email: string, password: string): void {
    const newUser: TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}


export function getAllUsers() {
    return users
}


export function createProduct(id: string, name: string, brand: string, price: number, category: PRODUCT_CATEGORY): void {
    const newProduct: TProduct = {
        id,
        name,
        brand,
        price,
        category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}
export function getAllProducts() {
    return products
}


export function getProductById(idToSearch: string): TProduct | undefined{
    for (var prod of products) {
        if (prod.id === idToSearch) {
            return prod
        }
    }
    return undefined
}




export const users: TUser[] = [
    {
        id: "user1",
        email: "user1@email.com",
        password: "*****"
    }, {
        id: "user2",
        email: "user2@email.com",
        password: "*****"
    }
]

export const products: TProduct[] = [
    {
        id: "prod1",
        name: "Pen Drive 32 GB",
        brand: "Sandisk",
        price: 53,
        category: PRODUCT_CATEGORY.PEN_DRIVE
    },
    {
        id: "prod2",
        name: "Headset USB",
        brand: "Logitech",
        price: 220,
        category: PRODUCT_CATEGORY.HEADSET
    }
]

export const purchase: TPurchase[] = [
    {
        userId: "user1",
        productId: "prod2",
        quantity: 2,
        totalPrice: products[0].price * 2
    },

    {
        userId: "user2",
        productId: "prod1",
        quantity: 2,
        totalPrice: products[1].price * 2
    }
]
