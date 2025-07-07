import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  password: {
    type: String,
    min: 6,
    max: 15,
    required: [true, 'Password is required'],
  },
  token: { type: String },
}, 
{versionKey: false});

const User = mongoose.model('user', userSchema);

export default User;
