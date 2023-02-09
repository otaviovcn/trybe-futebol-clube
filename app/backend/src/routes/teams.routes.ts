import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get('/', teamsController.getTeams);
router.get('/:id', teamsController.getOneTeam);

export default router;
