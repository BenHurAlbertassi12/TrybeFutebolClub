import { NextFunction, Request, Response } from 'express';
import LeaderService from '../service/Leader/LeaderService';

export default class LeaderController {
  constructor(private leaderService = new LeaderService()) {}

  async GetResultsHome(req: Request, res: Response, next: NextFunction) {
    this.leaderService
      .ranked()
      .then(({ status, message }) => {
        res.status(status).json(message);
      })
      .catch(next);
  }
}
