import express from 'express';
import customerControllers from '../../controllers/customers-controllers.js'

const customersRouter = express.Router();

customersRouter.post('/register', customerControllers.registerCustomer);
customersRouter.get('/', customerControllers.allcustomers);
customersRouter.get('/:customerId', customerControllers.customerInfo);


export default customersRouter;