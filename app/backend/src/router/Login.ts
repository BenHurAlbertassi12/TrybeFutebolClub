import * as express from 'express';
import LoginMiddleware from '../middleware/LoginMiddleware';
import UserController from '../controller/UserController';
import UserService from '../service/UserService';

const route = express.Router();

const userController = new UserController(new UserService());

route.post('/', LoginMiddleware, userController.login);

export default route;
