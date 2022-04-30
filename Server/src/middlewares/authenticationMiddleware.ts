/* eslint-disable operator-linebreak */
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import AppError from './errorHandlingMiddleware';
import * as userDb from '../user/user.repository';
import catchAsync from '../utils/catchAsync';

const authGuard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      [, token] = req.headers.authorization.split(' ');
    }
    if (!token) {
      throw new AppError('Token Failed.You are not authorised', 401);
    }
    try {
      const decoded: any = verify(token, process.env.JWT_SECRET as Secret);

      const currentUser = await userDb.findById(decoded.id);
      req.user = currentUser;
      next();
    } catch (err) {
      throw new AppError('Jwt expired', 401);
    }
  },
);

export default authGuard;
