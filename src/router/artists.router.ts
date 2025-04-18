import { Router } from 'express';
import { searchArtist } from '../controller/artists.controller';

const artistsRouter = Router();

artistsRouter.post('/search', searchArtist);

export default artistsRouter;
