import express from 'express';
import authControllers from '../../controllers/auth-controllers.js';

const usersRouter = express.Router();

usersRouter.post('/register', authControllers.register);
usersRouter.post('/login', authControllers.login);
usersRouter.post('/logout', authControllers.logout);
usersRouter.get('/user-info', authControllers.userInfo);

export default usersRouter;
