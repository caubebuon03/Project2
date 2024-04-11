import express from 'express'
import UserController from '../controllers/user.controller'
import authToken  from '../utils/authencation'

const userRouter = express.Router();
const controller = new UserController();

userRouter.get('/', controller.getAllUsers);
userRouter.post('/create', controller.createUser);
userRouter.get('/:id', authToken, controller.getUserByID);

export default userRouter