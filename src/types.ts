
export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: string,
    paid: boolean,
}


export type TPurchaseItem = {
    id: string,
    name: string
    price: number,
    description: string,
    imageUrl: string,
    quantity: number
}
export type TPurchaseDetail = {
    purchaseId: string,
    totalPrice: number,
    createdAt: string,
    isPaid: boolean,
    buyerId: string,
    email: string,
    name: string,
    productsList: TPurchaseItem[]
}

export type TPurchasesProducts = {
    purchase_id: string,
    product_id:string,
    quantity:number
}


export type TItem = {
    productId:string,
    quantity:number
}


