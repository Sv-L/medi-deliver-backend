import Transaction from '../service/schemas/transactionsSchemas.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const addTransactions = async (req, res) => {
    try {
        const newTransaction = await Transaction.create({
        ...req.body,
    });
    res.status(201).json({
        newTransaction,
    });
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const allTransactions = async (req, res) => {
    const limit = parseInt(req.query.limit) || 5; 
    try {
        const data = await Transaction.find({})
            .sort({ _id: -1 })
            .limit(limit)
            .exec();
        if (!data || data.length === 0) {
            throw new HttpError(404, "Not Found");
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const transactionsControllers = {
    allTransactions: ctrlWrapper(allTransactions),
    addTransactions: ctrlWrapper(addTransactions),

};

export default transactionsControllers;