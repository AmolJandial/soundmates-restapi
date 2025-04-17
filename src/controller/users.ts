import { Request, Response } from 'express-serve-static-core';
import mongoClient from '../mongo';
import { TUser } from '../model/user';
import { ObjectId } from 'mongodb';

export async function getUser(req: Request, res: Response) {
  try {
    console.log('your payload -> ', req.payload);
    await mongoClient.connect();
    const database = mongoClient.db('soundmates');
    const users = database.collection<TUser>('users');
    const options = { projection: { accessToken: 0 } };
    const user = await users.findOne(
      { _id: new ObjectId(req.payload.id) },
      options,
    );
    res.send({ status: 200, result: user });
  } finally {
    await mongoClient.close();
  }
}
