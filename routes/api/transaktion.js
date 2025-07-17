import express from 'express';
import transactionsControllers from '../../controllers/transactions-controllers.js';



const transactionsRouter = express.Router();

transactionsRouter.post('/', transactionsControllers.addTransactions);
transactionsRouter.get('/', transactionsControllers.allTransactions);


export default transactionsRouter;