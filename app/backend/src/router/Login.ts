import { Router, Request, Response } from 'express';
import UserController from '../controller/UserController';
import Token from '../jwt/TokenValidator';

const userController = new UserController();

const route = Router();

route.post('/', (req: Request, res: Response) =>
  userController.ControllerLogin(req, res));

route.get('/role', Token, (req: Request, res: Response) => {
  const userRole = res.locals.user.role;
  res.status(200).json({ role: userRole });
});

export default route;
