import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HTTP_UNAUTHORIZED } from '../utils/statusCode';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');
  const tokenSecret: string = process.env.JWT_SECRET || 'tokendefault';

  if (!token) return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const verifyToken = jwt.verify(token, tokenSecret);
    req.body.user = verifyToken;
    next();
  } catch (error) {
    res.status(HTTP_UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }
};
