import { Response, Request } from 'express';
import verifyPhoneDto from '../dto/verify_phone.dto';
import { ValidationError } from '../exceptions/validation_error';
import verifyOtpDto from '../dto/verify_otp.dto';
import mongoClient from '../mongo';
import User, { TUser } from '../model/user';
import { generateToken } from '../helpers/token.helpers';
import { appConstants } from '../constants/constants';
import loginDto from '../dto/login.dto';
import { getTwilio } from '../helpers/twilio.helpers';

export async function verifyPhone(req: Request, res: Response) {
  const parsedRequest = verifyPhoneDto.safeParse(req.body);
  if (parsedRequest.error) {
    throw new ValidationError('Please enter correct numbber');
  } else {
    const client = getTwilio();
    const verification = await client.twilioClient.verify.v2
      .services(client.verifySid)
      .verifications.create({
        channel: 'sms',
        to: parsedRequest.data.phoneNumber,
      });
    console.log(verification.toJSON());

    res.send({ status: 200, result: {} });
  }
}

export async function verifyOtp(req: Request, res: Response) {
  const parsedRequest = verifyOtpDto.safeParse(req.body);
  if (parsedRequest.error) {
    throw new ValidationError('Please enter correct otp code');
  } else {
    const client = getTwilio();
    const result = await client.twilioClient.verify.v2
      .services(client.verifySid)
      .verificationChecks.create({
        code: parsedRequest.data.code,
        to: parsedRequest.data.phoneNumber,
      });
    console.log(result.toJSON());
    if (result.valid) {
      res.send({ status: 200, result: {} });
      return;
    }
    throw new ValidationError('Please enter correct OTP code');
  }
}

export async function register(req: Request, res: Response) {
  const newUser = User.parse(req.body);
  console.log(newUser);
  try {
    //* created and inserted user
    await mongoClient.connect();
    const usersCollection = mongoClient
      .db('soundmates')
      .collection<TUser>('users');
    const userExists = await usersCollection.findOne({
      phoneNumber: newUser.phoneNumber,
    });
    if (userExists) {
      throw new ValidationError('User Already exists');
    }
    await usersCollection.insertOne(newUser);

    res.send({ status: 200, message: 'Successfully Created the user' });
  } finally {
    await mongoClient.close();
  }
}

export async function login(req: Request, res: Response) {
  const pReq = loginDto.parse(req.body);
  try {
    await mongoClient.connect();
    const users = mongoClient.db('soundmates').collection<TUser>('users');
    const filter = { phoneNumber: pReq.phoneNumber };
    const user = await users.findOne(filter);

    if (!user) {
      throw new ValidationError('No such user exists');
    }
    //*created token and attached to cookie
    const accessToken = generateToken({
      id: user._id.toString(),
      phoneNumber: user.phoneNumber,
    });
    res.cookie('accessToken', accessToken, {
      maxAge: appConstants.accessTokenExpiresIn,
      secure: true,
      httpOnly: true,
    });
    const update = { $set: { accessToken: accessToken, logged: true } };
    await users.updateOne(filter, update);

    res.send({ status: 200, message: 'User is successfully Logged' });
  } finally {
    await mongoClient.close();
  }
}
