import express from 'express'
import authControllers from '../../controllers/auth-controllers.js'

const usersRouter = express.Router();

usersRouter.post('/login', authControllers.login)
usersRouter.post('/logout', authControllers.logout)

export default usersRouter