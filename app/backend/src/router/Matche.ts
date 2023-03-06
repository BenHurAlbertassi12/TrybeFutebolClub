import { Request, Response, Router } from 'express';
import { MatcheController } from '../controller';
import TokenValidator from '../jwt/TokenValidator';

const matcheController = new MatcheController();

const router = Router();

router.post(
  '/',
  TokenValidator,

  (req: Request, res: Response) => matcheController.CreateController(req, res),
);
router.get(
  '/',
  (req: Request, res: Response) =>
    matcheController
      .getAllMatchesCotroller(req, res),
);

router.patch('/:id', TokenValidator, (req: Request, res: Response) =>
  matcheController.AttController(req, res));

router.patch(
  '/:id/finish',
  TokenValidator,
  (req: Request, res: Response) =>
    matcheController.finalizar(req, res),
);

export default router;
