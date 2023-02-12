import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import JWT from '../utils/JWT';
import validateMatch from '../middlewares/validateMatches';

const jwt = new JWT();
const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.geAlltMatches);
router.post('/', jwt.verifyToken, validateMatch, matchesController.saveMatches);
router.patch('/:id/finish', matchesController.endMatch);
router.patch('/:id', matchesController.updateMatch);

export default router;
