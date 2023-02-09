import { Router } from 'express';

import loginRoutes from './login.routes';
import teamsRoutes from './teams.routes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/teams', teamsRoutes);

export default router;
