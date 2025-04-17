import { z } from 'zod';

const Artist = z.object({
  name: z.string(),
  mbid: z.string(),
  imageUrl: z.string(),
  genres: z.array(z.string()),
});

export default Artist;
export type TArtist = z.infer<typeof Artist>;
