import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getLeaderboardHome = async (_req: Request, res: Response) => {
    const { type, message } = await this.leaderboardService.getLeaderboardHome();
    message.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    return res.status(type).json(message);
  };
}
