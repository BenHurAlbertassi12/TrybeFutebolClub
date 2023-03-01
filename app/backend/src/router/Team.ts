import * as express from 'express';
import TeamService from '../service/TeamService';
import TeamController from '../controller/TeamController';

const route = express.Router();

const teamController = new TeamController(new TeamService());

route.get('/', teamController.findAll);
route.get('/:id', teamController.findByPk);

export default route;
