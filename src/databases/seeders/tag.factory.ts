import { Tag } from 'src/tags/entities/tag.entity';
import { Seeder } from 'typeorm-seeding';
import { Factory } from 'typeorm-seeding';

export class TagSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Tag)().createMany(10);
  }
}
