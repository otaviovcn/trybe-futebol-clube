import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatches } from '../interfaces/matches.interface';

import { HTTP_OK, HTTP_CREATED } from '../utils/statusCode';

export default class MatchesService {
  public geAlltMatches = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return { type: HTTP_OK, message: matches };
  };

  public saveMatches = async (match: IMatches) => {
    const matchSaved = await Matches.create({ ...match, inProgress: true });

    return { type: HTTP_CREATED, message: matchSaved };
  };

  public endMatch = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });

    return { type: HTTP_OK, message: 'Finished' };
  };

  public updateMatch = async (id: string, match: IMatches) => {
    await Matches.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );

    return { type: HTTP_OK, message: 'Match Updated' };
  };
}
