import { HttpStatusCode } from 'axios';
import { AppError } from './app_error';

export class ArtistException extends AppError {
  constructor(message: string, status: HttpStatusCode) {
    super(message, status);
  }
}
