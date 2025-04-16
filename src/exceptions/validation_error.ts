import { HttpStatusCode } from '../constants/constants';
import { AppError } from './app_error';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}
