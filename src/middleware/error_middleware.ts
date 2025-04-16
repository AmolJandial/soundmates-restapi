import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/app_error';

export const errorMiddleware = (
  err: AppError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = err.status ?? 500;
  const message = err.message ? err.message : 'Server Exception';

  response.status(statusCode).send({ status: statusCode, error: message });
  next();
};
