import express from 'express'
import authControllers from '../../controllers/auth-controllers.js'

const usersRouter = express.Router();

usersRouter.post('/login', authControllers.login)
usersRouter.get('/current', authControllers.current)
usersRouter.post('/logout', authControllers.logout)
usersRouter.post('/register', authControllers.register)

export default usersRouter