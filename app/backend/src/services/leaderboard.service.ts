import { ILeaderBoard } from '../interfaces/leaderboard.interface';
import { IMatches } from '../interfaces/matches.interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class LeaderboardService {
  private getTeams = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  private getMatchesByTeam = async (teamId: number) => {
    const homeTeamList = await Matches.findAll({
      where: { inProgress: false, homeTeamId: teamId },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    // const awayTeamList = await Matches.findAll({
    //   where: { inProgress: false, awayTeamId: teamId },
    //   include: [
    //     { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    //     { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    //   ],
    // });

    // const result = homeTeamList.concat(awayTeamList);

    return homeTeamList;
  };

  // private getTotalGames = async () => {
  //   const resultTeams = await this.getTeams();
  //   const list = [] as any;
  //   const result = resultTeams.map(async (team) => {
  //     const totalGames = await this.getMatchesByTeam(team.id);
  //     list.push({ name: team.teamName, totalGames: totalGames.length });
  //   });
  //   await Promise.all(result);
  //   return list;
  // };

  private getGoals = (gameList: IMatches[]) => {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    gameList.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private getScoreboard = (gameList: IMatches[]) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    gameList.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        totalDraws += 1;
      } if (match.homeTeamGoals < match.awayTeamGoals) {
        totalLosses += 1;
      }
    });

    return { totalVictories, totalDraws, totalLosses };
  };

  private getResults = async (): Promise<ILeaderBoard[]> => {
    const resultTeams = await this.getTeams();
    const list = [] as any;
    const result = resultTeams.map(async (team) => {
      const gameList = await this.getMatchesByTeam(team.id);
      const scoreboard = this.getScoreboard(gameList);
      const totalPoints = (scoreboard.totalVictories * 3) + scoreboard.totalDraws;
      const goalsResult = this.getGoals(gameList);
      const efficiency = (totalPoints / (gameList.length * 3)) * 100;
      list.push({ name: team.teamName,
        totalPoints,
        totalGames: gameList.length,
        ...scoreboard,
        ...goalsResult,
        efficiency: efficiency.toFixed(2),
      });
    });
    await Promise.all(result);
    return list;
  };

  // [
  //   {
  //     "id": 14,
  //     "homeTeamId": 14,
  //     "homeTeamGoals": 2,
  //     "awayTeamId": 16,
  //     "awayTeamGoals": 1,
  //     "inProgress": false,
  //     "homeTeam": {
  //       "teamName": "Santos"
  //     },
  //     "awayTeam": {
  //       "teamName": "São Paulo"
  //     }
  // ]

  public getLeaderboard = async () => {
    const result = await this.getResults();
    const sortedResult = result.sort((a: ILeaderBoard, b: ILeaderBoard) => (
      b.totalVictories - a.totalVictories
      || b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
    return { type: 200, message: sortedResult };
  };
}
