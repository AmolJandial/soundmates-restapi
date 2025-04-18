import { Request, Response } from 'express-serve-static-core';
import SearchArtistDto from '../dto/search_artist.dto';
import { ValidationError } from '../exceptions/validation_error';
import {
  getArtists,
  getArtistDetails,
  getArtistImage,
} from '../helpers/artists.helper';

export async function searchArtist(req: Request, res: Response) {
  const pReq = SearchArtistDto.safeParse(req.body);
  if (pReq.error) {
    throw new ValidationError('Incorrect format');
  }
  const searchedArtists = await getArtists(pReq.data.query, pReq.data.page);
  const images = await Promise.all(
    searchedArtists.artists.map(async (el) => {
      const result = await getArtistDetails(el.id);
      console.log(`${el.name} -> `, result);
      const discogsUrl = result.find((el) => el.type === 'discogs');
      if (!discogsUrl) return '';
      const image = await getArtistImage(
        discogsUrl.url.resource.split('/').pop()!,
      );
      return image;
    }),
  );
  console.log(images);
  res.send({ status: 200, result: searchedArtists });
}
