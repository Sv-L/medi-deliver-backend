import User from '../service/schemas/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

// const {SECRET_KEY} = process.env;
const  SECRET_KEY = 'fghjklfghjkofghuighujio'

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const { id } = user;
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '3d' });
  await User.findByIdAndUpdate(id, {token});
  res.status(200).json({
    token,
    user: {
      _id: user.id,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const authControllers = {
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};

export default authControllers;
