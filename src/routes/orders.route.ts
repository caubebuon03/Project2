import express from 'express';
import OrdersController from '../controllers/orders.controller';
import authToken from '../utils/authencation';

const ordersRouter = express.Router();
const controller = new OrdersController();
ordersRouter.use(authToken);

// Routes
ordersRouter.get('/', controller.getAllOrdersByUser);
ordersRouter.post('/create', controller.createOrder);
ordersRouter.get('/current/:userId', controller.getCurrentOrderByUser);
ordersRouter.get('/complete/:userId', controller.getOrderCompletedByUser);
ordersRouter.get('/active/:userId', controller.getActiveOrderByUser);
ordersRouter.delete('/:id', controller.deleteOrderProduct);
ordersRouter.delete('/:id/products/:productId', controller.deleteOrderProduct);
ordersRouter.post('/add-product/:id', controller.addProductToOrder);

export default ordersRouter;
