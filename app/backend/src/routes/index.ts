import { Router } from 'express';

import loginRoutes from './login.routes';

const router = Router();

router.use('/login', loginRoutes);

export default router;
