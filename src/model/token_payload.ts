import { z } from 'zod';

const tokenPayload = z.object({
  id: z.string(),
  phoneNumber: z.string(),
});

export default tokenPayload;
export type TTokenPayload = z.infer<typeof tokenPayload>;
