import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(): Promise<Movie[]> {
    return await this.find();
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
}
