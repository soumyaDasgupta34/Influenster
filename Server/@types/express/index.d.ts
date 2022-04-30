/* eslint-disable no-unused-vars */
import { IUser } from '../../src/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
