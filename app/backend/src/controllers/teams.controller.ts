import { Request, Response } from 'express';

import TeamsService from '../services/teams.service';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getTeams = async (req: Request, res: Response) => {
    const { type, message } = await this.teamsService.getTeams();

    return res.status(type).json(message);
  };

  public getOneTeam = async (req: Request, res: Response) => {
    const { type, message } = await this.teamsService.getOneTeam(req.params.id);

    return res.status(type).json(message);
  };
}
