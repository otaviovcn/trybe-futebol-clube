import { Request, Response } from 'express';

import Leaderboard from '../services/leaderboard.service';

export default class LeaderboardController {
  public leaderboardService;

  constructor() {
    this.leaderboardService = new Leaderboard();
  }

  public getLeaderboard = async (req: Request, res: Response) => {
    const { type, message } = await this.leaderboardService.getLeaderboard();

    return res.status(type).json(message);
  };
}
