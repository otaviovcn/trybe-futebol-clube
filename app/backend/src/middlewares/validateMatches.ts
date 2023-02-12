import { RequestHandler } from 'express';
import Teams from '../database/models/Teams';
import { HTTP_NOT_FOUND, HTTP_UNPROCESSABLE_ENTITY } from '../utils/statusCode';

const validateMatch: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await Teams.findByPk(homeTeamId);
  const awayTeam = await Teams.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;
