import { Movie } from 'src/movies/entities/movie.entity';
import { Seeder } from 'typeorm-seeding';
import { Factory } from 'typeorm-seeding';

export class MovieSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Movie)().createMany(10);
  }
}
