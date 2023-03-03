import { NextFunction, Request, Response } from 'express';
import LoginValidate from './validations/ValidationLogin';

// Fazer a validação
const LoginMiddleware = () =>
  (req: Request, res: Response, next: NextFunction) => {
    const message = LoginValidate(req.body);
    if (message) return res.status(400).json({ message });
    next();
  };

export default LoginMiddleware();
