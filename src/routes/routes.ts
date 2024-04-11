import express from 'express'
import usersRouter from './user.route'
import productsRouter from './products.route'
import ordersRouter from './orders.route'

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);

export default apiRouter