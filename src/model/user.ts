import { z } from 'zod';
import Artist from './artist';
import UserLocation from './location';

const User = z.object({
  logged: z.boolean().default(false),
  accessToken: z.string().default(''),
  name: z.string().default(''),
  phoneNumber: z.string().min(1),
  age: z.number().default(0),
  favArtists: z.array(Artist).default([]),
  userLocation: UserLocation.default({
    type: 'Point',
    coordinates: [0.0, 0.0],
  }),
  gender: z
    .enum([
      'male',
      'female',
      'transgender',
      'non-binary',
      'other',
      'not-specified',
    ])
    .default('not-specified'),
  photos: z.array(z.string()).default([]),
  friends: z.array(z.string()).default([]),
  pendingRequests: z.array(z.string()).default([]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  chatRoomKeys: z.array(z.string()).default([]),
});

export default User;
export type TUser = z.infer<typeof User>;
