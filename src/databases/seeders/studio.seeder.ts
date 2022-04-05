import { Studio } from 'src/studios/entities/studio.entity';
import { Seeder } from 'typeorm-seeding';
import { Factory } from 'typeorm-seeding';

export class StudioSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Studio)().createMany(10);
  }
}
