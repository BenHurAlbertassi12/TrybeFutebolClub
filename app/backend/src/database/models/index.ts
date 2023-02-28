import { Sequelize } from 'sequelize';
import * as config from '../config/database';

const sequelize = new Sequelize(config)

export default sequelize;


export { default as TeamModel } from './TeamModel';
export  { default as UserModel } from './UsersModel';
export  { default as MatchesModel } from './MatchesModel';