import * as express from 'express';
import UserController from '../controller/UserController';

const route = express.Router();

const userController = new UserController(new UserService());

route.post('/', userController.login);

export default route;
