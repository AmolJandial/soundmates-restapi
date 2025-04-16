import { HttpStatusCode } from '../constants/constants';

export class AppError extends Error {
  status: HttpStatusCode;

  constructor(message: string, status: HttpStatusCode) {
    super(message);
    this.status = status;
  }
}
