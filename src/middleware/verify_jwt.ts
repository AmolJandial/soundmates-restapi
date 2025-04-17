import { Request, Response, NextFunction } from 'express-serve-static-core';
import cookiesDto from '../dto/cookies.dto';
import { verifyToken } from '../helpers/token.helpers';
import tokenPayload from '../model/token_payload';

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const pCookies = cookiesDto.parse(req.cookies);
  const payload = await verifyToken(pCookies.accessToken);
  req.payload = tokenPayload.parse(payload);
  next();
}
