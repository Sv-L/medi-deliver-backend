import mongoose from 'mongoose';
const { Schema } = mongoose;

const transactionsSchemas = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Income', 'Expense', 'Error'], required: true },
    date: { type: Date, default: Date.now },
}, 
    { versionKey: false });

    const Transaction = mongoose.model('transaction', transactionsSchemas);
    
    export default Transaction;