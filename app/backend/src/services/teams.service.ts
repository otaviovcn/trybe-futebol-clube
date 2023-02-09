import Teams from '../database/models/Teams';

import IResponse from '../interfaces/responseDefault.interface';
import { ITeams } from '../interfaces/teams.interface';
import { HTTP_OK, HTTP_INTERNAL_SERVER_ERROR } from '../utils/statusCode';

export default class TeamsService {
  public getTeams = async (): Promise<IResponse<ITeams[]>> => {
    try {
      const teams = await Teams.findAll();
      return { type: HTTP_OK, message: teams };
    } catch (error) {
      return { type: HTTP_INTERNAL_SERVER_ERROR, message: 'Internal Server Error' };
    }
  };
}
