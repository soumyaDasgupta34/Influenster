/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Request, Response, NextFunction } from 'express';

const catchAsync =
  (func) => async (req: Request, res: Response, next: NextFunction) =>
    func(req, res, next).catch(next);

export default catchAsync;
