import { User } from 'src/users/entities/user.entity';
import { Seeder } from 'typeorm-seeding';
import { Factory } from 'typeorm-seeding';

export class UserSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().createMany(1);
  }
}
