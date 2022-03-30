import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(): Promise<Movie[]> {
    return await this.find();
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, overview, poster, play_until } = createMovieDto;

    const movie = this.create({
      title,
      overview,
      poster,
      play_until,
    });

    await this.save(movie);
    return movie;
  }

  //   async findOne(id: number): Promise<Movie> {
  //     return await this.findOne(id);
  //   }

  //   async update(id: number, movie: Movie): Promise<Movie> {
  //     const updatedMovie = await this.findOne(id);
  //     updatedMovie.title = movie.title;
  //     updatedMovie.overview = movie.overview;
  //     updatedMovie.poster = movie.poster;
  //     updatedMovie.play_until = movie.play_until;
  //     return await this.save(updatedMovie);
  //   }

  //   async remove(id: number): Promise<Movie> {
  //     const movie = await this.findOne(id);
  //     return await this.remove(movie);
  //   }
}
