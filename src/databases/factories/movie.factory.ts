import { Movie } from 'src/movies/entities/movie.entity';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(Movie, () => {
  const movie = new Movie();

  movie.title = faker.word.adjective();
  movie.overview = faker.lorem.paragraph();
  movie.playUntil = faker.date.past();
  movie.poster = faker.image.imageUrl();
  movie.createdAt = new Date();
  movie.updatedAt = new Date();

  return movie;
});
