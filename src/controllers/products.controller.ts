import { Request, Response } from 'express';
import { ProductDao } from '../daos/products.dao';

export default class ProductController {
    private readonly DAO = new ProductDao();

    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.DAO.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getProductByID(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).send('Product ID is invalid');
                return;
            }
            const product = await this.DAO.getProductByID(id);
            res.json(product);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, price } = req.body;
            if (!name || !price) {
                res.status(400).json({ error: 'Name, Price are required' });
                return;
            }
            const product = await this.DAO.createProduct(req.body);
            res.json(product);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).send('Product ID is invalid');
                return;
            }
            await this.DAO.deleteProduct(id);
            res.json({ status: `Deleted product ${id} successfully` });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
