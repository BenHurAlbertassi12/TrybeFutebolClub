import { RequestHandler } from 'express';

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  login(login: ILogin): Promise<string | void>;
}

class UserController {
  constructor(private userService: IUser) { }

  login: RequestHandler = async (req, res, next) => {
    try {
      const token = await this.userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
