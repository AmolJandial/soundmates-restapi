import { z } from 'zod';

const SearchArtistDto = z.object({
  query: z.string(),
  page: z.number(),
});

export default SearchArtistDto;
