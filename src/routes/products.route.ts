import express from 'express';
import ProductController from '../controllers/products.controller';
import authToken from '../utils/authencation';

const productsRouter = express.Router();
const controller = new ProductController();
productsRouter.use(authToken);

// Routes
productsRouter.get('/', controller.getAllProducts);
productsRouter.post('/create', controller.createProduct);
productsRouter.get('/:id', controller.getProductByID);
productsRouter.delete('/:id', controller.deleteProduct);

export default productsRouter;
