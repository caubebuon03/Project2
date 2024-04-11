import client from '../database';
import { Order, OrderProduct } from "../models/orders.model";
import queryContants from '../utils/queryContants';

export class OrderDao {
    private async executeQuery(query: string, params: any[]): Promise<any> {
        try {
            const conn = await client.connect();
            const result = await conn.query(query, params);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getCurrentOrderByUser(userId: number): Promise<Order[]> {
        const status = 'active';
        return this.executeQuery(queryContants.getOrderByUser, [userId, status]);
    }

    async getAllOrdersByUser(userId: number): Promise<Order[]> {
        return this.executeQuery(queryContants.getAllOrderByUser, [userId]);
    }

    async getCompletedOrderByUser(userId: number): Promise<Order[]> {
        const status = 'completed';
        return this.executeQuery(queryContants.getOrderByUser, [userId, status]);
    }

    async getActiveOrderByUser(userId: number): Promise<Order[]> {
        const status = 'active';
        return this.executeQuery(queryContants.getOrderByUser, [userId, status]);
    }

    async createOrder(order: Order): Promise<Order> {
        const { userId, status } = order;
        return this.executeQuery(queryContants.insertOrder, [userId, status]);
    }

    async addProductToOrder(p: OrderProduct): Promise<OrderProduct> {
        return this.executeQuery(queryContants.insertOrderProduct, [p.orderId, p.productId, p.quantity]);
    }

    async deleteOrderProduct(params: Partial<OrderProduct>): Promise<OrderProduct> {
        return this.executeQuery(queryContants.deleteOrderProduct, [params.orderId, params.productId]);
    }
}
