import { HttpStatusCode } from '../constants/constants';
import { AppError } from './app_error';

export class TokenException extends AppError {
  constructor() {
    super('Invalid token', HttpStatusCode.UNAUTHORIZED);
  }
}
