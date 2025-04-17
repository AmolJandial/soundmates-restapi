import { TTokenPayload } from '../model/token_payload';

declare global {
  namespace Express {
    interface Request {
      payload: TTokenPayload;
    }
  }
}
