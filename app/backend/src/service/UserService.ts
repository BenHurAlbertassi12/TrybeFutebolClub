import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UsersModel';
import LoginUser from '../utils/LoginUser';

interface IUser {
  email: string;
  password: string;
}

export default class UserService {
  protected model: ModelStatic<User> = User;

  async UserLogin(user: IUser): Promise<User | null> {
    LoginUser(user);
    const result = await this.model.findOne({ where: { email: user.email } });
    if (!result) {
      throw new Error('Invalid email or password');
    }
    const validateUser = bcrypt.compareSync(user.password, result.password || '-');
    if (!validateUser) {
      return null;
    }
    return result.dataValues;
  }
}
