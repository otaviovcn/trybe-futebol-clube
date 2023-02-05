import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { HTTP_UNAUTHORIZED } from './statusCode';

dotenv.config();

export default class JWT {
  private tokenSecret: string = process.env.JWT_SECRET || 'tokendefault';

  private jwtConfig: object = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  public generateToken = (payload: object): string => {
    const token = jwt.sign({ data: { payload } }, this.tokenSecret, this.jwtConfig);

    return token;
  };

  public verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token not found' });

    try {
      const verifyToken = jwt.verify(token, this.tokenSecret);
      req.body.user = verifyToken;
      next();
    } catch (error) {
      res.status(HTTP_UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }
  };
}
