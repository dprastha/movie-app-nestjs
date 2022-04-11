import {
  EntityRepository,
  MoreThan,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(): Promise<SelectQueryBuilder<Movie>> {
    const queryBuilder = await this.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'movie_tag')
      .leftJoinAndSelect('movie.movieSchedules', 'movie_schedule');

    return queryBuilder;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, overview, poster, playUntil } = createMovieDto;

    const movie = this.create({
      title,
      overview,
      poster,
      playUntil,
    });

    await this.save(movie);
    return movie;
  }

  async getShowingMovies(): Promise<SelectQueryBuilder<Movie>> {
    const todayDate = new Date().toISOString().slice(0, 10);
    const queryBuilder = this.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'movie_tag')
      .leftJoinAndSelect('movie.movieSchedules', 'movie_schedule')
      .where({ playUntil: MoreThan(todayDate) });

    return queryBuilder;
  }
}
