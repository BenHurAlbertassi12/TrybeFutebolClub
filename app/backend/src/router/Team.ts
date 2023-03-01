import * as express from 'express';
import TeamService from '../service/TeamService';
import TeamController from '../controller/TeamController';

const route = express.Router();

const teamController = new TeamController(new TeamService());

route.get('/:id', teamController.findByPk);
route.get('/', teamController.findAll);

export default route;
