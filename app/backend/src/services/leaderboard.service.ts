import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { ILeaderboard, IResponse } from '../interfaces/leaderboard.interface';
import { IMatches } from '../interfaces/matches.interface';
import { HTTP_OK } from '../utils/statusCode';

export default class LeaderboardService {
  private createBoard = async (): Promise<ILeaderboard[]> => {
    const teams = await Teams.findAll();

    const board: ILeaderboard[] = teams.map((item) => ({
      id: item.id,
      name: item.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return board;
  };

  private calculateEfficiency = (team: ILeaderboard): number => {
    const games = team.totalDraws + team.totalLosses + team.totalVictories;
    const efficiency = (((team.totalPoints / (games * 3))) * 100).toFixed(2);
    return parseFloat(efficiency);
  };

  public getLeaderboardHome = async (): Promise<IResponse<ILeaderboard[]>> => {
    const board = await this.createBoard();
    const matches: IMatches[] = await Matches.findAll({ where: { inProgress: false } });
    matches.forEach((match) => {
      const team = board.find((item) => match.homeTeamId === item.id) as ILeaderboard;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        team.totalPoints += 3;
        team.totalVictories += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        team.totalLosses += 1;
      } else { team.totalPoints += 1; team.totalDraws += 1; }
      team.totalGames += 1;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = this.calculateEfficiency(team as ILeaderboard);
    });
    return { type: HTTP_OK, message: board };
  };

  public getLeaderboardAway = async (): Promise<IResponse<ILeaderboard[]>> => {
    const board = await this.createBoard();
    const matches: IMatches[] = await Matches.findAll({ where: { inProgress: false } });
    matches.forEach((match) => {
      const team = board.find((item) => match.awayTeamId === item.id) as ILeaderboard;
      if (match.awayTeamGoals > match.homeTeamGoals) {
        team.totalPoints += 3;
        team.totalVictories += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        team.totalLosses += 1;
      } else { team.totalPoints += 1; team.totalDraws += 1; }
      team.totalGames += 1;
      team.goalsFavor += match.awayTeamGoals;
      team.goalsOwn += match.homeTeamGoals;
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = this.calculateEfficiency(team as ILeaderboard);
    });
    return { type: HTTP_OK, message: board };
  };
}
