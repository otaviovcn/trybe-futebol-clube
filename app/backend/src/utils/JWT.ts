import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

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
}
