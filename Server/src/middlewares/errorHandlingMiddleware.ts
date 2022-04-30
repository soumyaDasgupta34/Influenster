/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export default class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || 'some error occured';
  return res.status(statusCode).json({
    status: 'error',
    message: errMessage,
  });
};
