import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();
const routerLogin = Router();

routerLogin.post('/', validateLogin, loginController.login);

export default routerLogin;
