export interface ILeaderboard {
  id?: number;
  name:string;
  totalPoints:number,
  totalGames:number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor:number,
  goalsOwn:number,
  goalsBalance:number,
  efficiency:number,
}

export interface IResponse<T> {
  type: number;
  message: T;
}
