import { z } from 'zod';

const ArtistResponse = z.object({
  relations: z.array(
    z.object({
      type: z.string(),
      url: z.object({ resource: z.string() }),
    }),
  ),
});

export default ArtistResponse;
export type TArtistResponse = z.infer<typeof ArtistResponse>;
