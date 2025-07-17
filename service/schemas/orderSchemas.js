import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema({
    photo: String,
    name: String,
    address: String,
    products: String,
    price: String,
    status: String,
    order_date:{ type: Date, default: Date.now },
}, 
    { versionKey: false });

    const Order = mongoose.model('order', orderSchema);
        
        export default Order;