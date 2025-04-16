import { Response, Request } from 'express';
import verifyPhoneDto from '../dto/verify_phone.dto';
import { ValidationError } from '../exceptions/validation_error';
import twilio from 'twilio';
import verifyOtpDto from '../dto/verify_otp.dto';

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

export function register(req: Request, res: Response) {
  res.send('hello');
}

function getTwilio() {
  const accountSid: string = process.env.TWILIO_ACCOUNT_SID!;
  const verifySid = process.env.TWILIO_VERIFY_SID!;
  const authToken: string = process.env.TWILIO_AUTH_TOKEN!;
  const twilioClient = twilio(accountSid, authToken);
  return { verifySid, twilioClient };
}
