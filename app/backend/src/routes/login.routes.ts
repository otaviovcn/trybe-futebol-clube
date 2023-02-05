import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/login.controller';
import JWT from '../utils/JWT';

const jwt = new JWT();

const loginController = new LoginController();
const router = Router();

router.post('/', validateLogin, loginController.login);
router.get('/verify', jwt.verifyToken, loginController.validate);

export default router;
