import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

class User extends Model implements IUser {
  declare id: number;
  declare username: string;
  declare email: string;
  declare role: string;
  declare password: string;
}

User.init(
  {
    email: {
      allowNull: false,
      type: STRING,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
    role: {
      allowNull: false,
      type: STRING,
    },
    username: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default User;
