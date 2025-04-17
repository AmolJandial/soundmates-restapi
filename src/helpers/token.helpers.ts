import jwt from 'jsonwebtoken';
import { TTokenPayload } from '../model/token_payload';
import { appConstants } from '../constants/constants';
import { TokenException } from '../exceptions/token.error';
import mongoClient from '../mongo';

export function generateToken(payload: TTokenPayload) {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: appConstants.accessTokenExpiresIn,
  });
  console.log('token created -.>', token);
  return token;
}

export async function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, {
      maxAge: appConstants.accessTokenExpiresIn,
    });
    console.log('token verified -> ', payload);
    return payload;
  } catch (e) {
    console.log('token error ->', e);
    try {
      await mongoClient.connect();
      const users = mongoClient.db('soundmates').collection('users');
      await users.updateOne(
        { accessToken: token },
        { $set: { logged: false, accessToken: '' } },
      );
      throw new TokenException();
    } finally {
      await mongoClient.close();
    }
  }
}
