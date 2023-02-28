import { Request, Response, Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json();
});

export default teamsRouter;
