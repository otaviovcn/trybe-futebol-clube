import { RequestHandler } from 'express';

import {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST,
} from '../utils/statusCode';

const validateLogin: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  const MIN_LENGTH_PASSWORD = 6;

  if (!email || !password) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'All fields must be filled' });
  }

  if (password.length < MIN_LENGTH_PASSWORD) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

export default validateLogin;
