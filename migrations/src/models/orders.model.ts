interface Order {
    id?: number
    userId: number
    status: string
}

interface OrderProduct {
    id?: number
    orderId: number
    productId: number
    quantity: number
}

export { Order, OrderProduct }