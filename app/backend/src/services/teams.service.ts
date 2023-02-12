import Teams from '../database/models/Teams';

import IResponse from '../interfaces/responseDefault.interface';
import { ITeams } from '../interfaces/teams.interface';
import { HTTP_OK } from '../utils/statusCode';

export default class TeamsService {
  public getTeams = async (): Promise<IResponse<ITeams[]>> => {
    const teams = await Teams.findAll();
    return { type: HTTP_OK, message: teams };
  };

  public getOneTeam = async (id: string): Promise<IResponse<ITeams>> => {
    const team = await Teams.findOne({ where: { id } });
    return { type: HTTP_OK, message: team };
  };
}
