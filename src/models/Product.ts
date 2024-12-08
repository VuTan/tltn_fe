export interface Product {
    _id: string
    name: string
    price: number
    option?: Options
    quantity: number
    img: string
}

export interface Options {
    type: string;
    price: number;
    stock: number;
}

