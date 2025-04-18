import { HttpStatusCode } from 'axios';

export class AppError extends Error {
  status: HttpStatusCode;

  constructor(message: string, status: HttpStatusCode) {
    super(message);
    this.status = status;
  }
}
