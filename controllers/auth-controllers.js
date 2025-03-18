import User from '../service/schemas/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { nanoid } from 'nanoid';

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { password, email } = req.body;

  const hashPassword = await bcrypt.hash(password, 6);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    token: verificationToken,
  });

  res.status(201).json({
    newUser,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { id } = user;

  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '3d' });

  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      _id: user.id,
      email: user.email,
    },
  });
};

const current = async (req, res) => {
  if (!req || !req.user) {
    throw HttpError(401, 'Not authorized');
  }

  res.status(200).json({
    email: req.user.email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ _id }, { token: '' });

  res.status(204).json({ message: 'No Content' });
};

const allusers = async (req, res) => {
  const documents = await User.find({}).toArray();
  console.log(documents);

  res.json({ message: { documents } });
};

const authControllers = {
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  register: ctrlWrapper(register),
};

export default authControllers;
