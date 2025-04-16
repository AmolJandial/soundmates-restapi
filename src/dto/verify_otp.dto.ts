import { z } from 'zod';

const verifyOtpDto = z.object({
  phoneNumber: z.string(),
  code: z.string(),
});

export default verifyOtpDto;
export type verifyOtpType = z.infer<typeof verifyOtpDto>;
