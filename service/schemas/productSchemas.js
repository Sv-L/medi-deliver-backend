import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new Schema(
  { id: String,
    photo: String,
    name: String,
    suppliers: String,
    stock: String,
    price: String,
    category: String,
  },
  { versionKey: false }
);

const Product = mongoose.model('product', productSchema);

export default Product;
