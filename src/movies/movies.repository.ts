import { EntityRepository, MoreThan, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(): Promise<Movie[]> {
    const query = this.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'movie_tag')
      .leftJoinAndSelect('movie.movieSchedules', 'movie_schedule');

    const movies = await query.getMany();
    return movies;
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

  async getShowingMovies(): Promise<Movie[]> {
    const todayDate = new Date().toISOString().slice(0, 10);
    const query = this.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'movie_tag')
      .leftJoinAndSelect('movie.movieSchedules', 'movie_schedule')
      .where({ playUntil: MoreThan(todayDate) });

    const showingMovies = await query.getMany();
    return showingMovies;
  }
}
