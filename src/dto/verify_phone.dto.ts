import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

const verifyPhoneDto = z.object({
  phoneNumber: z.string().refine((value) => isValidPhoneNumber(value), {
    message: `Please enter a valid phone number`,
  }),
});

export default verifyPhoneDto;
