import twilio from 'twilio';

export function getTwilio() {
  const accountSid: string = process.env.TWILIO_ACCOUNT_SID!;
  const verifySid = process.env.TWILIO_VERIFY_SID!;
  const authToken: string = process.env.TWILIO_AUTH_TOKEN!;
  const twilioClient = twilio(accountSid, authToken);
  return { verifySid, twilioClient };
}
