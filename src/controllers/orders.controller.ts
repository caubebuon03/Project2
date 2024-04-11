import { Request, Response } from 'express';
import { OrderDao } from '../daos/orders.dao';

export default class OrderController {
    private readonly DAO = new OrderDao();

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { userId, status } = req.body;
            if (!userId || !status) {
                res.status(400).json({ error: 'UserID, Status are required' });
                return;
            }
            const order = await this.DAO.createOrder(req.body);
            res.json(order);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getAllOrdersByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.status(400).send('UserID is invalid');
                return;
            }
            const result = await this.DAO.getAllOrdersByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getOrderCompletedByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.status(400).send('UserID is invalid');
                return;
            }
            const result = await this.DAO.getCompletedOrderByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getCurrentOrderByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.status(400).send('Invalid user id');
                return;
            }
            const result = await this.DAO.getCurrentOrderByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getActiveOrderByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.status(400).send('Invalid user id');
                return;
            }
            const result = await this.DAO.getActiveOrderByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async addProductToOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderId = Number(req.params.id);
            const productId = Number(req.body.productId);
            const quantity = Number(req.body.quantity);
    
            if (!orderId || !productId || !quantity || isNaN(orderId) || isNaN(productId) || isNaN(quantity)) {
                res.status(400).json({ error: 'OrderID, ProductID, Quantity are required and must be numbers' });
                return;
            }
    
            const product = await this.DAO.addProductToOrder({ orderId, productId, quantity });
    
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteOrderProduct(req: Request, res: Response): Promise<void> {
        try {
            const orderId = Number(req.params.id);
            const productId = Number(req.params.productId);
    
            if (isNaN(orderId) || isNaN(productId)) {
                res.status(400).send('OrderID or ProductID is invalid');
                return;
            }
    
            await this.DAO.deleteOrderProduct({ orderId, productId });
            res.json({ status: `Deleted order ${orderId} successfully` });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
