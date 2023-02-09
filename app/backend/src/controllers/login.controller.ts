import { Request, Response } from 'express';
import LoginService from '../services/login.service';

import { HTTP_OK } from '../utils/statusCode';

export default class LoginController {
  public loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.loginService.login({ email, password });

    if (type !== HTTP_OK) {
      return res.status(type).json({ message });
    }

    return res.status(type).json({ token: message });
  };

  public validate = async (req: Request, res: Response) => {
    const { data } = req.body.user;
    const { role } = data.payload;

    return res.status(HTTP_OK).json({ role });
  };
}
