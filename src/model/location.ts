import { z } from 'zod';

const UserLocation = z.object({
  type: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
});

export default UserLocation;
export type TUserLocation = z.infer<typeof UserLocation>;
