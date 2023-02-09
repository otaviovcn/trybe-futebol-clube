import * as bcrypt from 'bcryptjs';

import User from '../database/models/User';
import IResponse from '../interfaces/responseDefault.interface';
import { ILogin } from '../interfaces/login.interface';

import { HTTP_OK, HTTP_UNAUTHORIZED } from '../utils/statusCode';

import JWT from '../utils/JWT';

export default class LoginService {
  private _JWT: JWT;

  constructor() {
    this._JWT = new JWT();
  }

  public login = async ({ email, password }: ILogin): Promise<IResponse<ILogin>> => {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      return { type: HTTP_UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const result = await bcrypt.compare(password, userFound.password);

    if (!result) {
      return { type: HTTP_UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const { id, username, role } = userFound;

    const token = this._JWT.generateToken({ id, username, role });

    return { type: HTTP_OK, message: token };
  };
}
