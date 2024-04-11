import { Product } from "../models/products.model";
import client from '../database';
import queryContants from '../utils/queryContants';

export class ProductDao {
    private async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const conn = await client.connect();
            const result = await conn.query(query, params);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getAllProducts(): Promise<Product[]> {
        return this.executeQuery(queryContants.getAllProducts);
    }

    async getProductByID(id: number): Promise<Product> {
        return this.executeQuery(queryContants.getProductByID, [id]);
    }

    async createProduct(product: Product): Promise<Product> {
        const { name, price } = product;
        return this.executeQuery(queryContants.insertProduct, [name, price]);
    }

    async deleteProduct(id: number): Promise<Product> {
        return this.executeQuery(queryContants.deleteProduct, [id]);
    }
}
