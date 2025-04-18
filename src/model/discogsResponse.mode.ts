import { z } from 'zod';

const DiscogsResponse = z.object({
  images: z.array(z.object({ type: z.string(), uri: z.string() })),
});

export default DiscogsResponse;
export type TDiscogsResponse = z.infer<typeof DiscogsResponse>;
