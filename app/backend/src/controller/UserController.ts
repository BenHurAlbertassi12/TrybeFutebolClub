import { Request, Response, NextFunction } from 'express';

interface ILogin {
  email: string;
  password: string;
  username?: string;
}

interface IUser {
  login(login: ILogin): Promise<string | void>;
  findRole(email: string): Promise<{ role: string } | void>;
}

class UserController {
  constructor(private _userService: IUser) {}

  login(req: Request, res: Response, next: NextFunction) {
    this._userService
      .login(req.body)
      .then((token) => res.status(200).json({ token }))
      .catch((error) => next(error));
  }
}

export default UserController;
