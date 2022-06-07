import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `https://flyclipart.com/thumb2/flag-pole-free-vectors-logos-icons-and-photos-downloads-500619.png`,
  // avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.address.latitude(),
  isVerified: faker.address.cityName(),
  status: sample(['good', 'bad']),
  role: faker.address.longitude(),
}));

export default users;
