export enum PRODUCT_CATEGORY {
    PEN_DRIVE = "Pen Drive",
    HEADSET = "Headset",
    WEBCAM = "Webcam"
   }
   
export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string ,
    name: string,
    brand: string,
    price: number,
    category: PRODUCT_CATEGORY
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}