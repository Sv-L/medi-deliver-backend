import express from 'express';
import orderControllers from '../../controllers/order-controllers.js';

const orderRouter = express.Router();

orderRouter.post('/register', orderControllers.addOrder);
orderRouter.get('/', orderControllers.allorders);


export default orderRouter;