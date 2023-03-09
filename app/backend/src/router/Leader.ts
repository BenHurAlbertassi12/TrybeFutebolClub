import { Router } from 'express';
import LeaderController from '../controller/LeaderController';

const leaderController = new LeaderController();

const router = Router();

router.get(
  '/home',
  leaderController.GetResultsHome.bind(leaderController),
);

export default router;

// .bind é uma especie de 'this', ele recebeo o primeiro argumento
