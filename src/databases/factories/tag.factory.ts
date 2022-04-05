import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Tag } from 'src/tags/entities/tag.entity';

define(Tag, () => {
  const tag = new Tag();

  tag.name = faker.lorem.word();
  tag.createdAt = new Date();
  tag.updatedAt = new Date();

  return tag;
});
