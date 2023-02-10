import { Router } from 'express';

import loginRoutes from './login.routes';
import teamsRoutes from './teams.routes';
import matchesRoutes from './matches.routes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/teams', teamsRoutes);
router.use('/matches', matchesRoutes);

export default router;
