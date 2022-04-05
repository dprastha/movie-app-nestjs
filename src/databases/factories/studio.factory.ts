import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Studio } from 'src/studios/entities/studio.entity';

define(Studio, () => {
  const studio = new Studio();

  studio.studioNumber = faker.random.number(100);
  studio.seatCapacity = faker.random.number(100);
  studio.createdAt = new Date();
  studio.updatedAt = new Date();

  return studio;
});
