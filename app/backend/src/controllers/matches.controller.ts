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
}
