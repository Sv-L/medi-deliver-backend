import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loginSchema = new Schema({
email: {type: String, required: [true, 'Email is required']},
    password: {type: String, min: 6, max: 15, required: [true, 'Password is required']},
token: {type: String}
});

const User = mongoose.model('user', loginSchema);

export default User