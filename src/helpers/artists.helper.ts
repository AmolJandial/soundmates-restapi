import axios, { HttpStatusCode } from 'axios';
import { appConstants } from '../constants/constants';
import SearchArtistResponse, {
  TSearchArtistResponse,
} from '../model/searchArtistResponse.model';
import { ArtistException } from '../exceptions/artist.error';
import ArtistResponse, { TArtistResponse } from '../model/artistResponse.model';
import { ValidationError } from '../exceptions/validation_error';
import { TDiscogsResponse } from '../model/discogsResponse.mode';

export async function getArtists(searchTerm: string, page: number) {
  try {
    const seenMbid = new Set<string>();
    const response = await axios.get<TSearchArtistResponse>(
      `${appConstants.musicBrainzUrl}/artist/?query=artist:${searchTerm}&fmt=json&limit=10&offset=${page * 10}`,
    );

    if (response.status !== 200) {
      console.log(response.data);
      throw new ArtistException(
        'Error searching Artist',
        HttpStatusCode.BadRequest,
      );
    } else if (!response.data.artists.length) {
      throw new ArtistException(
        'No such artist found',
        HttpStatusCode.NotFound,
      );
    }

    const filteredArtists = response.data.artists.filter((el) => {
      if (seenMbid.has(el.id) || el.score < 80 || !el.tags) return false;
      const tags = el.tags
        .filter((el) => el.count > 0)
        .sort((a, b) => b.count - a.count);
      seenMbid.add(el.id);
      el.tags = tags;
      return true;
    });

    const data = SearchArtistResponse.safeParse({
      count: response.data.count,
      offset: response.data.offset,
      artists: filteredArtists,
    });
    if (data.error) {
      throw data.error;
    }

    return data.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getArtistDetails(mbid: string) {
  try {
    const response = await axios.get<TArtistResponse>(
      `https://musicbrainz.org/ws/2/artist/${mbid}/?fmt=json&inc=url-rels`,
    );
    if (response.status !== 200) {
      throw new ArtistException(
        'Error connecting to musicBrainz api',
        HttpStatusCode.InternalServerError,
      );
    }
    const result = ArtistResponse.safeParse(response.data);
    if (result.error) {
      console.log(result.error.issues);
      throw new ValidationError('Error parsing');
    }
    const filteredResult = result.data.relations.filter(
      (el) => el.type === 'discogs' || el.type === 'wikidata',
    );
    return filteredResult;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getArtistImage(id: string) {
  try {
    const response = await axios.get<TDiscogsResponse>(
      `https://api.discogs.com/artists/${id}?key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`,
    );
    if (response.status !== 200) {
      throw new ArtistException(
        'Error connecting to discogs api',
        HttpStatusCode.InternalServerError,
      );
    }
    return response.data.images[0].uri;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
