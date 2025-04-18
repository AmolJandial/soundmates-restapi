export const appConstants = {
  accessTokenExpiresIn: 30 * 24 * 60 * 60 * 3600,
  musicBrainzUrl: 'https://musicbrainz.org/ws/2',
};

export enum HttpStatusCode {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 403,
  EMPTY = 201,
}
