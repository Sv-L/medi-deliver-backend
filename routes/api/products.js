import express from 'express';
import productsControllers from '../../controllers/product-controllers.js';


const productsRouter = express.Router();

productsRouter.post('/', productsControllers.addProduct);
productsRouter.get('/', productsControllers.allProducts);
productsRouter.delete('/:productId', productsControllers.deleteProduct);
productsRouter.patch('/:productId', productsControllers.updateProduct);


export default productsRouter;