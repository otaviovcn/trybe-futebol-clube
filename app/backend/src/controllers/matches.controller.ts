import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchController {
  public matchService;

  constructor() {
    this.matchService = new MatchesService();
  }

  public geAlltMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let message = await (await this.matchService.geAlltMatches()).message;
    const { type } = await this.matchService.geAlltMatches();

    if (inProgress === 'true' || inProgress === 'false') {
      const boolean = inProgress === 'true';
      message = message.filter((match) => match.inProgress === boolean);
    }

    return res.status(type).json(message);
  };

  public saveMatches = async (req: Request, res: Response) => {
    const { type, message } = await this.matchService.saveMatches(req.body);

    return res.status(type).json(message);
  };

  public endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this.matchService.endMatch(id);

    return res.status(type).json({ message });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this.matchService.updateMatch(id, req.body);

    return res.status(type).json({ message });
  };
}
