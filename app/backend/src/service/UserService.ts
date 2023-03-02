import * as bcrypt from 'bcryptjs';
import Token from '../jwt/Token';
import User from '../database/models/UsersModel';
import ILogin from '../interface/ILogin';

interface IUserService {
  login(login: ILogin): Promise<string | void>;
  findRole(email: string): Promise<{ role: string } | void>;
}

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  async login(login: ILogin): Promise<string> {
    const { email, password } = login;
    const userExists = await this._userModel.findOne({ where: { email } });
    if (!userExists) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    return Token(login);
  }

  async findRole(email: string): Promise<{ role: string }> {
    const userInformation = await this._userModel.findOne({ where: { email } });
    if (!userInformation) {
      throw new Error('User not found');
    }
    return { role: userInformation.role };
  }
}
