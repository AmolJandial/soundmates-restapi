import { z } from 'zod';

const loginDto = z.object({
  phoneNumber: z.string(),
});

export default loginDto;
