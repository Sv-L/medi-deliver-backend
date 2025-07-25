import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    photo: String,
    name: String,
    email: String,
    spent: String,
    phone: String,
    address: String,
    register_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Customer = mongoose.model('customer', customerSchema);

export default Customer;
