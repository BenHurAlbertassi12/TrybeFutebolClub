import { Request, Response } from 'express';
import JWToken from '../jwt/JWToken';
import UserService from '../service/UserService';

const ERR_MSG = 'Invalid email or password';

export default class UserController {
  constructor(private userService = new UserService()) {}

  ControllerLogin = (req: Request, res: Response): Promise<Response> =>
    this.userService
      .UserLogin(req.body)
      .then((authUser) => {
        if (!authUser) {
          return res.status(401).json({ message: ERR_MSG });
        }
        const token = JWToken(authUser);
        return res.status(200).json({ token });
      })
      .catch((error) => {
        const err = error as Error;
        if (err.message !== ERR_MSG) {
          return res.status(400).json({ message: err.message });
        }
        return res.status(401).json({ message: ERR_MSG });
      });
}
