import { Request, Response } from 'express';
import { MatcheService } from '../service';

const req17 = 'Finished';
const req21e422 = 'It is not possible to create a match with two equal teams';
const req21e404 = 'There is no team with such id!';

export default class MatcheController {
  constructor(private matcheService = new MatcheService()) { }

  public getAllMatchesCotroller = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const result = await this.matcheService.getAllService();
      return res.status(200).json(result);
    }
    const progressTrue = inProgress !== 'false';

    const result = await this.matcheService.getAllService(progressTrue);
    return res.status(200).json(result);
  };

  public finalizar = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    await this.matcheService.finalizar(Number(req.params.id));
    return res.status(200).json({ message: req17 });
  };

  public async AttController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    await this.matcheService.AttService(Number(req.params.id), req.body);
    res.status(200).json({ message: 'Requisito 18' });
  }

  public async CreateController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      res.status(201).json(await this.matcheService.CreateService(req.body));
    } catch ({ message }) {
      if (message !== req21e422) {
        return res.status(404).json({ message: req21e404 });
      }
      res.status(422).json({ message });
    }
  }
}
