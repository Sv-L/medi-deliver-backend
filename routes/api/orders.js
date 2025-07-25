import express from 'express';
import orderControllers from '../../controllers/order-controllers.js';

const ordersRouter = express.Router();

ordersRouter.post('/', orderControllers.addOrder);
ordersRouter.get('/', orderControllers.allorders);


export default ordersRouter;