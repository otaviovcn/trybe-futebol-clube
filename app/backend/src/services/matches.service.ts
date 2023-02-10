import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import { HTTP_OK } from '../utils/statusCode';

export default class MatchesService {
  public geAlltMatches = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return { type: HTTP_OK, message: matches };
  };
}
