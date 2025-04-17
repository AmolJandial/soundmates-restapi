import { z } from 'zod';

const cookiesDto = z.object({
  accessToken: z.string(),
});

export default cookiesDto;
