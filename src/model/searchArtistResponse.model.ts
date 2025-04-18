import { z } from 'zod';

const SearchArtistResponse = z.object({
  count: z.number(),
  offset: z.number(),
  artists: z.array(
    z.object({
      id: z.string(),
      score: z.number().default(0),
      name: z.string(),
      country: z.string().default(''),
      tags: z
        .array(z.object({ count: z.number(), name: z.string() }))
        .default([]),
    }),
  ),
});

export default SearchArtistResponse;
export type TSearchArtistResponse = z.infer<typeof SearchArtistResponse>;
