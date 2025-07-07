import User from '../service/schemas/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { nanoid } from 'nanoid';

import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { password, email, name } = req.body;

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
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(id, { token });
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
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).send();
};

const userInfo = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id });
  res.status(200).json({
    user: {
      _id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}

const authControllers = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  userInfo: ctrlWrapper(userInfo),
};

export default authControllers;
